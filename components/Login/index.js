import Head from 'next/head';
import styled from 'styled-components';
import { auth } from "../../firebaseConfig";
import countriesList from "./countries";
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import NumericInput from './NumericInput';

function Login(props) {

    const [view, setView] = useState("numview");
    const [loading, setLoading] = useState(false);
    const [mod, setMod] = useState("sendcode");
    const [dialCode, setDialCode] = useState("+91");
    const [phone, setPhone] = useState(null);
    const [verificationcode, setVerificationCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    
    useEffect(()=>{
        if(!window.recaptchaverifier){
            window.recaptchaverifier = new firebase.auth.RecaptchaVerifier("__phonesigner__");
            window.recaptchaverifier.render().then(wid => {
                window.widgetID = wid;
            });
        }
    });

    const signIn= () => {
        var appverifier = window.recaptchaverifier,
            phoneNumber = dialCode + phone;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appverifier)
            .then(confirmation => {
                setConfirmationResult(confirmation);
                setVerificationCode(null);
                setMod("verifycode");
            })
            .catch(err => {
                console.log(err);
        });
    }

    const verify =() => {
        confirmationResult.confirm(verificationcode)
        .then(result => {
            console.log(("You are signed in..."));
        })
        .catch(err => {
            console.log(err);
        });
    }

    const verifyCodeView = () => {
        return(
            <>
            <h3>Verify Phone Number</h3>
            <p>Verification Code sent to {dialCode + phone}</p>

            <input
                value={verificationcode}
                className="phone" 
                onChange={e => {setVerificationCode(e.target.value == "" ? null : e.target.value)}} 
                placeholder="xxxxxx"
            />

            <button className="continueButton" onClick={verify}>
                Verify
            </button>
            </>
        )
    }

    const sendCodeView = () => {
        return(
            <>
            <h3>Login</h3>
            <select
                defaultValue={dialCode}
                onChange={e => {setDialCode(e.target.value == "" ? null : e.target.value)}}
                className="phone"
            >
                {
                    countriesList.map(e => {
                        return (
                            <option className="select" value={e.dial_code}>{e.name} ({e.dial_code})</option>
                        )
                    })
                }
            </select>

            <NumericInput
                defaultValue={phone}
                className="phone" 
                onChange={e => {setPhone(e.target.value == "" ? null : e.target.value)}} 
                placeholder="000 000 0000"
            />

            <div className="__phonesigner__" id="__phonesigner__" />

            <button className="continueButton" onClick={signIn}>
                Continue
            </button>
            </>
        )
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            {mod == "sendcode" ? sendCodeView() : verifyCodeView()}
        </Container>
    )
}

const Container = styled.div`
    width: 301px;
    margin: 100px auto;
    font-weight: 500;

    .phone{
    width: 100%;
    border: 1px #b1b1b1 solid;
    padding: 20px;
    border-radius: 3px;
    margin: 10px 0px;
    box-sizing: border-box;
    font-weight: bold;
}
    .continueButton{
        width: 100%;
        border: 1px #4664ff solid;
        padding: 20px;
        border-radius: 3px;
        margin: 10px 0px;
        box-sizing: border-box;
        background: #4664ff;
        color: #fff;
        font-weight: bold;
    }

    .continueButton:hover{
        background: #4653ff;
    }
`;

export default Login