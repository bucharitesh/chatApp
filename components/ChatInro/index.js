import styled from 'styled-components';

function chatInro() {
    return (
        <Container>
            {/* <Logo height="350px" width="350px"/> */}
            <HeaderText>Welcome to Chai Pe Charcha</HeaderText>
            <SubText>We Believe in Security and Reliability</SubText>
            <Footer>
                <hr className="footerLine"/>
                <div className="footerText">
                    <i className="fa fa-mobile"></i>
                    Mobile Version Coming Soon.
                </div>
            </Footer>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    animation: 1000ms cubic-bezier(0.1, 0.82, 0.25, 1) 0ms 1 normal none running windowAnim;
    
    @keyframes windowAnim{
        0%{
            opacity:0;transform:scale(1.3)
        }
        to{
            opacity:1;transform:scale(1)
        }
    }
`;

const HeaderText = styled.p`
    font-size: 36px;
    font-weight: 300;
    margin-top: 38px;
    color: #262d31;
`;

const SubText = styled.p`
    margin-top: 12px;
    font-size: 14px;
    line-height: 0px;
    color: #a6a8aa;
`;

const Footer = styled.div`
    margin-top: 14px;

    hr.footerLine {
        color: rgba(130, 130, 130, 0.50);
        width: 100%;
    }

    .footerText {
        align-items: center;
        margin-top: 20px;
        font-size: 14px;
        line-height: 12px;
        color: #a6a8aa;
    }

    .footerText i {
        height: 40px;
        margin-right: 10px;
    }
`;

export default chatInro
