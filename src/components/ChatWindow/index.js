import { db } from '../../firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Avatar from '../Avatar';
import TimeAgo from 'timeago-react';
import getRecipient from '../../utils/getRecipient';
import { useState, useRef } from 'react';
import ChatItem from './ChatItem';
import { Helmet } from "react-helmet";

import firebase from 'firebase/app';
import { FiSend, FiPlus, FiMic, FiSmile} from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { ReactMic } from 'react-mic';

function ChatWindow({data, user, setActiveChat}) {

    const Chatref = db.collection("chats").doc(data);
    const [chatSnapshot] = useCollection(Chatref);

    const reciptent = getRecipient(chatSnapshot?.data().users, user);

    const UserRef = db.collection("users").doc(reciptent);
    const [userSnapshot] = useCollection(UserRef);

    const StatusRef = db.collection("status").doc(reciptent);
    const [statusSnapshot] = useCollection(StatusRef);

    const Messagesref = db.collection("messages").doc(data);
    const [messagesSnapshot] = useCollection(Messagesref);

    const body = useRef();

    const endOfMessageRef = useRef(null);
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    const [text, setText] = useState('');

    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13) {
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if(text !== "") {
            Messagesref.update({
                messages: firebase.firestore.FieldValue.arrayUnion(
                    {
                         author: user.phoneNumber,
                         message: text,
                         messageType: "text",
                         messageTime: firebase.firestore.Timestamp.now()
                    })
                }).then(() => {
                    Chatref.update({
                        lastMessage: text
                    })
                });
            setText('');
        }
        scrollToBottom();
    }

    const [record, setRecord] = useState(false);

    var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
          cb(xhr.response);
        });
        xhr.send();
    };


    function startRecording(e) {
        e.preventDefault();
        setRecord(true);
    }
    
    function stopRecording(e) {
        e.preventDefault();
        setRecord(false);
    }

    function onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);    
    }

    var onStop = (recordedBlob) => {
        getFileBlob(recordedBlob.blobURL, blob =>{
        firebase.storage().ref(`${data}/${~~(Date.now() / 1000)}`).put(blob)
        .then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
                    Messagesref.update({
                        messages: firebase.firestore.FieldValue.arrayUnion(
                            {
                                 author: user.phoneNumber,
                                 messageType: "audio",
                                 audioURL: downloadURL,
                                 messageTime: firebase.firestore.Timestamp.now()
                            })
                    }).then(() => {
                        Chatref.update({
                            lastMessage: 'audio'
                        })
                    })
            });
        })
    })
    scrollToBottom(); 
}

    const deleteChat = (e) => {
        e.preventDefault();

        db.collection("chats").doc(data).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        db.collection("messages").doc(data).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        console.log("deleted successfully");
        setActiveChat(null);
        window.location.reload();
    } 

    const sendImage = (e) => {
        e.preventDefault();
        const ref = firebase.storage().ref();
        const file = e.target.files[0];
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(`chats/${data}/${~~(Date.now() / 1000)}`).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                Messagesref.update({
                    messages: firebase.firestore.FieldValue.arrayUnion(
                        {
                             author: user.phoneNumber,
                             messageType: "image",
                             imageURL: url,
                             messageTime: firebase.firestore.Timestamp.now()
                        })
                }).then(() => {
                    Chatref.update({
                        lastMessage: 'image'
                    }) 
                });   
            })
            .catch(console.error);
        scrollToBottom();
    }

    return (
            <Container>
            <Helmet>
                <title>Chat with {userSnapshot?.data().name ? userSnapshot?.data().name : ""}</title>
            </Helmet>

            {/* Chat Header */}
            
            <ChatHeader>
                <div className="blocks">
                    <div className="current-chatting-user">
                    <Avatar
                        isOnline="active"
                        image={userSnapshot?.data().photoURL}
                    />
                    <UserStatus>
                        <h4>{userSnapshot?.data().name}</h4>
                        <p>
                        { 
                        statusSnapshot?.data().state === "online" ? "online" : (
                                <TimeAgo datetime= {statusSnapshot?.data().last_changed} live={false} />
                            )
                        }
                        </p>
                    </UserStatus>
                    </div>
                </div>

                <div className="blocks">
                    <Settings>
                    <button className="btn-nobg" onClick={(e) => deleteChat(e)}>
                        <AiOutlineDelete size="20px" />
                    </button>
                    </Settings>
                </div>
            </ChatHeader>

            {/* Chat Body */}
            <ChatBody ref={body}>
                    {messagesSnapshot?.data().messages == null ? "" : (messagesSnapshot?.data().messages.map((item, key) => {
                    return (
                        <ChatItem
                        key={key}
                        user={user}
                        data={item}
                        />
                    );
                    }))
                    }
                    <div ref={endOfMessageRef}/>
            </ChatBody>

            {/* Chat Footer */}
            <ChatFooter>
                <div className="sendNewMessage">
                    <button>
                        <input type="file" accept="image/*" name="image-upload" id="imageUpload" onChange={(e) => sendImage(e)}  />                    
                        <FiPlus size="20px"/>
                    </button>
                    

                    <button className="emoji">
                        <FiSmile size="20px" />
                    </button>
                    <input
                    type="text"
                    placeholder="Type a message here"
                    onChange={e => setText(e.target.value)}
                    value={text}
                    onKeyUp={handleInputKeyUp}
                    />

                    {text !== "" ?
                        (
                            <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSendMessage}>
                                <FiSend size="20px"/>
                            </button>
                       ) : <>
                        <SoundWave
                                record={record}
                                onStop={onStop}
                                onData={onData}
                                visualSetting="frequencyBars"
                                strokeColor="#4462ff"
                                backgroundColor="transparent"
                                echoCancellation="true"
                                channelCount="2"
                            /> 
                            {
                                record ? (
                                    <button className="btnMic" style={{backgroundColor: '#4462ff', color :'#fff'}} onClick={stopRecording}>
                                        <FiMic size="20px" />
                                    </button>
                                    
                                ) : ( 
                                    
                                    <button className="btnMic" style={{color:'#4462ff'}} onClick={startRecording}>
                                        <FiMic size="20px" />
                                    </button>
                                )
                            }
                        </>
                    }
                    
                </div>
            </ChatFooter>
            
        </Container>
    )
}

export default ChatWindow

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 0px 0px 20px;
    width: 100%;
`;

const ChatHeader = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #ebe7fb;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .current-chatting-user {
        display: flex;
        align-items: center;
    }
`;  

const UserStatus = styled.div`
    display: flex;
    flex-direction: column;
    h4 {
        margin: 0px 0px 0px 8px;
        font-weight: 600;
    }

    p {
        margin: 0px 0px 0px 8px;
        font-size: 10px;
        font-weight: 600;
        color: grey;
    }
`;

const Settings = styled.div`
    .btn-nobg {
        color: #000;
        border: none;
        background-color: none;
    }
`;

const ChatBody = styled.div`
    margin-top: 5px;
    height: 70vh;
    width: 100%;
    overflow-x: hidden;
`;

const ChatFooter = styled.div`
    padding-top: 5px;
    position: relative;
    bottom: 0;

    .sendNewMessage {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-radius: 8px;
    }

  .sendNewMessage button {
    width: 36px;
    height: 36px;
    background-color: #ecefff;
    border: none;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    color: #4665ff;
    padding: 0;
    border-radius: 5px;
    line-height: 36px;
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    display: flex;
    /* height: 100%; */
    justify-content: center;
    align-items: center;
    position: relative;

    input {
        opacity: 0;
        position: absolute;
        width: 36px;
        height: 36px;
        z-index: 1000;
        cursor: pointer;
    }

  }
  .sendNewMessage button:hover {
    transform: scale(1.2);
  }
  .sendNewMessage button i {
    display: block;
  }
  .sendNewMessage input {
    flex-grow: 1;
    padding: 0 15px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  #sendMsgBtn {
    background-color: #3b5bfe;
    color: #fff;
  }
  
  .emoji {
    margin-left: 8px;
  }
`;

const SoundWave = styled(ReactMic)`
    position: absolute;
    z-index: 999;
    width: 30px;
    height: 20px;
    right: 50px;
    bottom: 10px;
`;