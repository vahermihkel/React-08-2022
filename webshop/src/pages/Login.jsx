import { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    // fetch("backend-url", {
    //   email: emailRef.current.value, 
    //   password: passwordRef.current.value, 
    //}).then(res => res.json()).then(json => {    if (json.successful === true)    })
    if (passwordRef.current.value === "123") {
      authCtx.updateLoggedIn(true);
      navigate("/admin");
    }
  }

  return ( 
    <div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div> );
}

export default Login;