import styled from 'styled-components';
import { useState } from 'react';

import { FaPencilAlt } from "react-icons/fa";
import firebase from 'firebase/app';

function Profile({user}) {
    const [profileName, setProfileName] = useState(null)
    const [profileImage, setProfileImage] = useState('https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png')

    const imageHandler = async (e) => {
        const ref = firebase.storage().ref();
        const file = e.target.files[0];
        const name = user.phoneNumber;
        const metadata = {
            contentType: file.type
        };

        const task = ref.child(`UserData/${name}`).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                setProfileImage(url);
            })
            .catch(console.error);
    }



    const updateUser = (e) => {
        e.preventDefault();
        user.updateProfile({
            displayName: profileName,
            photoURL: profileImage,
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
                <Input 
                    value={profileName}
                    placeholder="Your Name *"
                    onChange={e => {setProfileName(e.target.value == "" ? null : e.target.value)}} 
                />
                {/* <input 
                    value={photoURL}
                    placeholder="PhotoURL *"
                    onChange={e => {setPhotoURL(e.target.value == "" ? null : e.target.value)}} 
                /> */}
                <PictureUpload>
                    <div className="avatar-edit">
                        <input type="file" accept="image/*" name="image-upload" id="imageUpload" onChange={(e) => imageHandler(e)}  />
                        <label for="imageUpload">
                            <FaPencilAlt/>
                        </label>
                    </div>
                    <div className="avatar-preview container2">
                        <img src={profileImage} alt="" id="img"/>
                    </div>
                </PictureUpload>

                {profileName &&  profileImage ? 
                <button onClick={updateUser} className="submitbutton" /> : ""}
        </Container>
    )
}

const Input = styled.input`
    width: 100%;
    border: 1px #b1b1b1 solid;
    padding: 20px;
    border-radius: 3px;
    margin: 10px 0px;
    box-sizing: border-box;
`

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

    .submitbutton {
        background: #4664ff;
    }

    .submitbutton:hover{
        background: #4653ff;
    }

`;

const PictureUpload = styled.div`
    position: relative;
    max-width: 205px;
    margin: 50px auto;

    .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 1;
        top: 10px;
    }

    .avatar-edit input {
        display: none;
    }

    .avatar-edit input + label {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-bottom: 0;
        border-radius: 100%;
        background: #FFFFFF;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all 0.2s ease-in-out;
        display: flex;
        justify-content:center;
        align-items: center;
    }

    .avatar-edit input + label:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }

    .avatar-edit input + label:after {
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    }

    .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #3b5bfe;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }

    .avatar-preview > img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

export default Profile;
