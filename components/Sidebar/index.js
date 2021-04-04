import styled from 'styled-components';
import ChatListItems from './ChatListitems';
import NewChat from './NewChat';
import { useState } from 'react';
import { db } from '../../firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';

function Sidebar({user, handleOpenChat, handleCloseChat, setActiveChat}) {

    const [showModal, setShowModal] =  useState(false);

    const useUserRef = db.collection('users');
    const [userSnapshot] = useCollection(useUserRef);

    const userChatRef = db.collection('chats').where('users', 'array-contains', user.phoneNumber)
    const [chatsSnapshot] = useCollection(userChatRef);

    const handleOpen = () => {
        setShowModal(true);
    };
    
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container>
        
        <button className="btn" onClick={handleOpen}>
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>

        <NewChat
            chatlist={userSnapshot}
            chatsSnapshot={chatsSnapshot}
            open={showModal} 
            close={handleClose}
        />

        <ChatList_Header>
          <h2>Chats</h2>
          <BtnNoBg>
            <i className="fa fa-ellipsis-h"></i>
          </BtnNoBg>
        </ChatList_Header>

        {/* ChatSearch */}
        <div className="chatList__search">
          <Search_wrap>
            <input type="text" placeholder="Search Here" required />
            <button>
              <i className="fa fa-search"></i>
              s
            </button>
          </Search_wrap>
        </div>

        {/* ChatItems */}
        <Chatlist>
        {
            chatsSnapshot?.docs.map((chat) => (
                <ChatListItems
                    onClick={() => setActiveChat(chat.id)}
                    users={chat.data().users}
                    key={chat.id}
                    id={chat.id}
                />
            ))
        }
        </Chatlist>

        

        
        </Container>
    )
}

const Container = styled.div`
  border-right: 1px solid #ebe7fb;
  padding: 0 20px 0 0px;
  max-width: 250px;
`;

const ChatList_Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnNoBg = styled.div`
  background-color: transparent;
  border: none;
  box-shadow: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  color: #dad9dd;
  outline: none;
`;

const Search_wrap = styled.div`
    background-color: #e6e5ea;
    border-radius: 5px;

    input {
        background-color: transparent;
        border: none;
        padding: 15px 15px;
        outline: none;
        width: 80%;
        padding-right: 0;
    }
    
    button {
        height: 46px;
        border: none;
        background-color: transparent;
        outline: none;
        width: 20%;
        cursor: pointer;
        font-size: 20px;
    }
`;


const Chatlist = styled.div`
    margin-top: 30px;
    overflow: auto;
    max-height: calc(100vh - calc(100vh / 3));

    .chatlist__item {
        display: flex;
        border-bottom: 1px solid #ebe7fb;
        padding-bottom: 10px;
        margin-top: 10px;
        cursor: pointer;
        padding: 10px 10px 10px 20px;
        transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
        transform: scale(0);
        animation-name: showIn;
        animation-duration: 0.2s; /* or: Xms */
        animation-iteration-count: 1;
        animation-direction: normal; /* or: normal */
        animation-timing-function: cubic-bezier(
            0.88,
            0.19,
            0.37,
            1.11
        ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
        animation-fill-mode: both; /* or: backwards, both, none */
        animation-delay: 0.1s; /* or: Xms */
    }

    @keyframes showIn {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    .chatlist__item:first-child {
        margin-top: 0;
    }

    .chatlist__item .userMeta p {
        margin: 0;
        padding: 0;
        color: #000;
        font-weight: 600;
        font-size: 14px;
    }

    .chatlist__item .userMeta span {
        margin: 0;
        padding: 0;
        color: #ceccd3;
        font-weight: 400;
        font-size: 12px;
        display: block;
    }
        
    .chatlist__item:hover,
    .chatlist__item.active {
        background: #fff;
        border-radius: 10px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;

        margin-right: 20px;
        position: relative;
    }

    .avatar img {
        max-width: 100%;
        object-fit: cover;
    }

    .avatar-img {
        overflow: hidden;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
`;

export default Sidebar
