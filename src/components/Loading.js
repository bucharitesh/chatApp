import { ReactComponent as Logo } from '../assets/Logo.svg';
import styled from 'styled-components';

function Loading() {
    return <SplashLogo height="300px" width="300px"/>
}

const SplashLogo = styled(Logo)`
    animation: scale 1500ms ease-in-out;

    @keyframes scale {
        0% {
            transform: scale(0);
            transform-origin: 50% 50%;
        }
        50% {
            transform: scale(1);
            transform-origin: 50% 50%;
        }
        100% {
            opacity: 1;
        }
    }
`;

export default Loading
