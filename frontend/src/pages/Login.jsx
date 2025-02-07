import "../css/components/Form.css";
import {useState} from "react";
import axios from "axios";
import {AuthContext} from "../auth/Auth.jsx";
import {useContext} from "react";

export default function Login() {
  const [msg, setMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user} = useContext(AuthContext);

  if(user){
    window.location.href=("/profile");
  }


  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        setMsg(response.data.msg);
        console.log(response.data);
        setTimeout(() => {
          if (response.status === 202) {
            window.location.replace("/profile");
          }
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {msg ? (
        <div>
          <p>{msg}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
