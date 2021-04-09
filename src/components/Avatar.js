import styled from 'styled-components';
 
function Avatar({onClick, image}) {
  return (
    <AvatarContainer onClick={onClick}>
        <div className="avatar-img">
          <img src={image} alt="#" />
        </div>
    </AvatarContainer>
  )
}

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

    img {
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


export default Avatar
