import styled from 'styled-components';
import Avatar from '../Avatar';

function Nav({user}) {
  console.log(user);

  return (
    <Navbar>   
        {/* <img src="" width="70px" height="70px"/> */}
        <div className="nav__blocks"></div>
        <div className="nav__blocks">
          <Avatar image={user.photoURL}/>
        </div>   
    </Navbar>
  )
}

const Navbar = styled.div`
  max-width: 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 20px;
  padding-top: 0px;
  align-items: center;

  img {
    display: block;
    cursor: pointer;
    width: 40px;
  }
`;

export default Nav
