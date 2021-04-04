import Head from 'next/head'
import Sidebar from '../components/Sidebar/'
import styled from 'styled-components';
import Nav from '../components/Nav/Nav';
import ChatInro from '../components/ChatInro/';
import ChatWindow from '../components/ChatWindow/';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import {useState } from 'react';

export default function Home() {

  const [user] = useAuthState(auth);

  const [activeChat, setActiveChat] =  useState(null);

  const [showNewChat, setShowNewChat] =  useState(false);

  const handleOpenChat = () => {
    setShowNewChat(true);
  };

  const handleCloseChat = () => {
    setShowNewChat(false);
  };

  return (
    <div className="__main">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav user={user}/>
      
      <Container>
          <Sidebar 
            user={user} 
            handleOpenChat={handleOpenChat}
            handleCloseChat={handleCloseChat}
            setActiveChat={setActiveChat}
          />
          {activeChat !== null ?
            <ChatWindow
              user={user}
              data={activeChat}
            /> : <ChatInro/>}
      </Container>
    </div>
  )
}


const Container = styled.div`
  flex-grow: 1;
  background-color: #f4f3f8;
  border-radius: 10px;
  padding: 15px 20px;
  display: flex;
  animation: 250ms cubic-bezier(0.1, 0.82, 0.25, 1) 0ms 1 normal none running windowAnim;
  
    @keyframes windowAnim{
        0%{
            opacity:0;transform:scale(1.3)
        }
        to{
            opacity:1;transform:scale(1)
        }
    }

`;