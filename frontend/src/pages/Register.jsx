import "../css/components/Form.css"
import { useState } from "react"
import axios from "axios"

export default function Register() {
  const [msg, setMsg] = useState("");

  const [email, setEmail] = useState("") //Gjør email til variabel, string så appen ikke krasjer
  const [password, setPassword] = useState("") 
  const [confirmPassword, setConfirmPassword] = useState("") 

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, { email, password, confirmPassword }, { withCredentials: true })
      .then((response) => {
        setMsg(response.data.msg);
        setTimeout(() => {
          if(response.status === 201){
            window.location.replace("/profile")
          }
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="login">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" name="" id="" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="confirm password" name="" id="" onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}