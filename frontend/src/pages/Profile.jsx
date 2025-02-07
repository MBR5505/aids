import { AuthContext } from '../auth/Auth.jsx';
import '../index.css';
import { useContext } from 'react';

export default function Profile  ()  {
  const {user} = useContext(AuthContext);

  if(!user.email){
    window.location.href=("/login");
  }
  return (
    <div>
        <h1>Profile</h1>
        <p>"mail@mail.com"</p>
    </div>
  )
}
