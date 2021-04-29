import styled from "styled-components";
import CountriesList from "./Countries";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import NumericInput from "./NumericInput";

function Login() {
  const [mod, setMod] = useState("sendcode");
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState(null);
  const [verificationcode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const signIn = () => {
    var appverifier = window.recaptchaverifier,
      phoneNumber = dialCode + phone;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appverifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        setVerificationCode(null);
        setMod("verifycode");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!window.recaptchaverifier) {
      window.recaptchaverifier = new firebase.auth.RecaptchaVerifier(
        "__phonesigner__",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            signIn();
          },
        }
      );
      window.recaptchaverifier.render().then((wid) => {
        window.widgetID = wid;
      });
    }
  });

  const verify = () => {
    confirmationResult
      .confirm(verificationcode)
      .then((result) => {
        console.log("You are signed in...");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyCodeView = () => {
    return (
      <>
        <h3>Verify Phone Number</h3>
        <p>Verification Code sent to {dialCode + phone}</p>

        <input
          value={verificationcode}
          className="phone"
          onChange={(e) => {
            setVerificationCode(e.target.value === "" ? null : e.target.value);
          }}
          placeholder="xxxxxx"
        />

        <ContinueButton onClick={verify}>Verify</ContinueButton>
      </>
    );
  };

  const sendCodeView = () => {
    return (
      <>
        <h3>Login</h3>
        <select
          defaultValue={dialCode}
          onChange={(e) => {
            setDialCode(e.target.value === "" ? null : e.target.value);
          }}
          className="phone"
        >
          {CountriesList.map((e) => {
            return (
              <option className="select" value={e.dial_code}>
                {e.name} ({e.dial_code})
              </option>
            );
          })}
        </select>

        <NumericInput
          defaultValue={phone}
          className="phone"
          onChange={(e) => {
            setPhone(e.target.value === "" ? null : e.target.value);
          }}
          placeholder="000 000 0000"
        />

        <div className="__phonesigner__" id="__phonesigner__" />

        <ContinueButton onClick={signIn}>Continue</ContinueButton>
      </>
    );
  };

  return (
    <Container>
      {mod == "sendcode" ? sendCodeView() : verifyCodeView()}
    </Container>
  );
}

const Container = styled.div`
  width: 301px;
  margin: 100px auto;
  font-weight: 500;

  .phone {
    width: 100%;
    border: 1px #b1b1b1 solid;
    padding: 20px;
    border-radius: 3px;
    margin: 10px 0px;
    box-sizing: border-box;
    font-weight: bold;
  }
`;

const ContinueButton = styled.button`
  width: 100%;
  border: 1px #4664ff solid;
  padding: 20px;
  border-radius: 3px;
  margin: 10px 0px;
  box-sizing: border-box;
  background: #4664ff;
  color: #fff;
  font-weight: bold;

  :hover {
    background: #4653ff;
  }
`;

export default Login;
