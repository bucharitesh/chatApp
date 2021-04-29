import styled from "styled-components";
import Avatar from "../Avatar";
import firebase from "firebase/app";

import { ReactComponent as Logo } from "../../assets/Logo.svg";

function Nav({ user }) {
  const Signout = () => {
    // firebase.auth().signOut()
  };

  return (
    <Navbar>
      <Logo width="50px" height="50px" />
      <div className="nav__blocks"></div>
      <div className="nav__blocks">
        <Avatar image={user.photoURL} onClick={Signout} />
      </div>
    </Navbar>
  );
}

const Navbar = styled.div`
  max-width: 70px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 20px;
  padding-top: 0px;
  align-items: center;

  img {
    display: block;
    cursor: pointer;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

export default Nav;
