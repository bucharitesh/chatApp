import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "../Avatar";
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebaseConfig';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#fff',
      padding: theme.spacing(2, 4, 3),
      maxHeight: '600px',
      minWidth: '400px',
      overflow: 'auto'
    },
  }));

function NewChat({open, close, chatlist, chatsSnapshot}) {

    const [user] = useAuthState(auth);

    const chatAlreadyExists = (reciptent) =>
      !!chatsSnapshot?.docs.find(
        (chat) => 
          chat.data().users.find((user) => user == reciptent )?.length > 0
    );

    const classes = useStyles();
    return (
        <Modal
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
                USER LIST
            </h2>


            {chatlist?.docs.map((chat) => (      
                  chat.id !== user.phoneNumber && !chatAlreadyExists(chat.id) ? (
                    
                  chat.data().name && chat.data().photoURL &&
                    <ChatListItem key={chat.id} onClick={ (e) => {
                      e.preventDefault();
                      db.collection('chats').add({
                        users: [user.phoneNumber, chat.id]
                      }).then((docRef) => {
                        db.collection('messages').doc(docRef.id).set({});
                    });
                      close()
                    }    
                    }>
                    <Avatar image={chat.data().photoURL}/>
                    <div className="userMeta">
                      <p>{chat.data().name}</p>
                    </div>
                  </ChatListItem>
                  ) : "" 
            ))}
          </div>
        </Fade>
      </Modal>
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
        margin-left: 15px;
        padding: 0;
        color: #000;
        font-weight: 600;
        font-size: 14px;
    }
        
    :hover,
    .active {
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


export default NewChat
