import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import Loading from './components/Loading';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './pages/Home';

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.phoneNumber).set({
        name: user.displayName,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        phone: user.phoneNumber
      },
      { merge: true}
      );
    } 
  }, [user])

  if(loading) return <Loading/>; 

  if (!user) return <Login/>;

  if (user && !user.photoURL && !user.name) return <Profile user={user}/>;

  return <Home/>;
}

export default App;
