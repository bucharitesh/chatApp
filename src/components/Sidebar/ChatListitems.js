import Avatar from "../Avatar";
import getRecipient from '../../utils/getRecipient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

function ChatListItems({onClick, active, id, users, isOnline}) {

  const [user] = useAuthState(auth);

  const [reciptentSnapshot] = useCollection(
    db.collection("users").where("phone", "==", getRecipient(users, user))
  )

  const reciptent = reciptentSnapshot?.docs?.[0]?.data();

  return ( 
      <ChatListItem onClick={onClick}>
      {reciptent ? (
        <Avatar
          image={reciptent.photoURL}
          isOnline={isOnline}
        />
      ) : ""}
    
      <div className="userMeta">
        {reciptent ? (
          <p>{reciptent.name}</p>
        ) : ""}  
        {/* <span className="activeTime">{data.lastSeen}</span> */}
      </div>
    </ChatListItem>
  )
}

const ChatListItem = styled.div`
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
    

    @keyframes showIn {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    :first-child {
        margin-top: 0;
    }

    .userMeta p {
        margin: 0;
        margin-left: 10px;
        padding: 0;
        color: #000;
        font-weight: 600;
        font-size: 14px;
    }

    .userMeta span {
        margin: 0;
        padding: 0;
        color: #ceccd3;
        font-weight: 400;
        font-size: 12px;
        display: block;
    }
        
    :hover,
    .active {
        background: #fff;
        border-radius: 10px;
    }

`;

export default ChatListItems