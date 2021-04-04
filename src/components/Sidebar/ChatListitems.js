import Avatar from "../Avatar";
import getRecipient from '../../utils/getRecipient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';

function ChatListItems({onClick, active, id, users, isOnline}) {

  const [user] = useAuthState(auth);

  const [reciptentSnapshot] = useCollection(
    db.collection("users").where("phone", "==", getRecipient(users, user))
  )

  const reciptent = reciptentSnapshot?.docs?.[0]?.data();

  return ( 
      <div
      onClick={onClick}
      className={`chatlist__item ${
        active ? "active" : ""
      } `}
    >
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
    </div>
  )
}

export default ChatListItems