import styled from 'styled-components';
import { useState } from 'react';

function Profile({user}) {
    const [profileName, setProfileName] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)

    const updateUser = (e) => {
        e.preventDefault();
        user.updateProfile({
            displayName: profileName,
            photoURL: photoURL,
          }).then(function() {
            // Update successful.
            window.location.reload();
          }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    };

    return (
        <Container>
            <h3>Complete the Profile to Continue</h3>
            {/* <Image width="100px" height="100px" src={user.photoURL == null ? "/logo2.svg" : user.photoURL} alt=""/> */}
                <input 
                    value={profileName}
                    placeholder="Your Name *"
                    onChange={e => {setProfileName(e.target.value == "" ? null : e.target.value)}} 
                />
                <input 
                    value={photoURL}
                    placeholder="PhotoURL *"
                    onChange={e => {setPhotoURL(e.target.value == "" ? null : e.target.value)}} 
                />
                {profileName &&  photoURL ? 
                <button onClick={updateUser} className="submitbutton" /> : ""}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width: 500px;
    margin: 100px auto;
    font-weight: 600;

    h3 {
        font-size: 20px;
        font-weight: bold;
    }

    input {
        width: 100%;
        border: 1px #b1b1b1 solid;
        padding: 20px;
        border-radius: 3px;
        margin: 10px 0px;
        box-sizing: border-box;
    }

    .submitbutton {
        background: #4664ff;
    }

    .submitbutton:hover{
        background: #4653ff;
    }
`;

export default Profile;
