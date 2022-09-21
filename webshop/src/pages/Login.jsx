import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { useTranslation } from 'react-i18next';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2BGKlt9Ie1hQ1qoz2dmmDtcN-0bPDY2o";
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const login = () => {


    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }

    fetch(firebaseUrl,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) // body+headers+http status code+time
      .then(body => {
        if (body.error) {
            // kuvame useState abil kasutjale sõnumi
          setMessage(t(body.error.message)); 
        } else {
            // toast, et õnnestus
          setMessage("");
          navigate("/admin");
          authCtx.updateLoggedIn(true);
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      });

  }

  return ( 
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div> );
}

export default Login;