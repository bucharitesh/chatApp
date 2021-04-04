import { db } from '../../firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Avatar from '../Avatar';
import TimeAgo from 'timeago-react';
import getRecipient from '../../utils/getRecipient';
import { useState, useRef, useEffect } from 'react';
import ChatItem from './ChatItem';

import firebase from 'firebase/app';
import { FiSend, FiPlus, FiMic, FiSettings, FiSmile} from "react-icons/fi";


function ChatWindow({data, user}) {

    const Chatref = db.collection("chats").doc(data);
    const [chatSnapshot] = useCollection(Chatref);

    const reciptent = getRecipient(chatSnapshot?.data().users, user);

    const UserRef = db.collection("users").doc(reciptent);
    const [userSnapshot] = useCollection(UserRef);

    const Messagesref = db.collection("messages").doc(data);
    const [messagesSnapshot] = useCollection(Messagesref);


    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    let [chatList, setChatList] = useState([]);


    const handleVoiceMessage = () => {
        if(recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }
            recognition.start();
        }
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13) {
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if(text !== '') {
            Messagesref.update({
                messages: firebase.firestore.FieldValue.arrayUnion(
                    {
                         author: user.phoneNumber,
                         message: text,
                         messageType: "text",
                         messageTime: firebase.firestore.Timestamp.now()
                    })
                });
            setText('');
        }
    }



    return (
            <Container>
             {/* <Head>
                <title>Chat with {userSnapshot?.data().name}</title>
            </Head> */}

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
                        <p>Last active : {' '}
                        {
                            userSnapshot?.data().lastSeen.toDate() ? (
                                <TimeAgo datetime= {userSnapshot?.data().lastSeen.toDate()} live={false} />
                            ) : "Unavailable"
                        }
                        </p>
                    </UserStatus>
                    
                    </div>
                </div>

                <div className="blocks">
                    <Settings>
                    <button className="btn-nobg">
                        <FiSettings size="20px" />
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
                    }))}
            </ChatBody>


            {/* Chat Footer */}
            <ChatFooter>
                <div className="sendNewMessage">
                    <button className="addFiles">
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
                        ) : (
                            <button className="btnMic" style={{backgroundColor: listening ? '#4462ff' : '', color: listening ? '#fff' : '#4462ff'}} onClick={handleVoiceMessage}>
                                <FiMic size="20px" />
                            </button>
                        )
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

        img {
            max-height: 50px;
            height: 40px;
        }
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
    overflow: auto;
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