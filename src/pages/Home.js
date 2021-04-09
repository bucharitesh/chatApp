import Sidebar from '../components/Sidebar/'
import styled from 'styled-components';
import Nav from '../components/Nav/Nav';
import ChatIntro from '../components/ChatIntro/';
import ChatWindow from '../components/ChatWindow/';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import firebase from 'firebase/app'

export default function Home() {
  const [user] = useAuthState(auth);

  var userStatusDatabaseRef = firebase.database().ref('/users/' + user.phoneNumber);

  var isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var userStatusFirestoreRef = firebase.firestore().doc('/users/' + user.phoneNumber);

  var isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  var isOnlineForFirestore = {
      state: 'online',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase.database().ref('.info/connected').on('value', function(snapshot) {
    if (snapshot.val() == false) {
        userStatusFirestoreRef.update(isOfflineForFirestore);
        return;
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        userStatusDatabaseRef.set(isOnlineForDatabase);

        // We'll also add Firestore set here for when we come online.
        userStatusFirestoreRef.update(isOnlineForFirestore);
    });
  });

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>ChatApp React</title>
      </Helmet>

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
              setActiveChat={setActiveChat}
            /> : <ChatIntro/>}
      </Container>
    </div>
  )
}


const Container = styled.div`
  flex-grow: 1;
  background-color: #f4f3f8;
  border-radius: 10px;
  padding: 15px;
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