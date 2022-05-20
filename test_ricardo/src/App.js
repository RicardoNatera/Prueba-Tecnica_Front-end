import './App.css';
import Container from './Components/Container';
import UserInfo from './Components/UserInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';

function App() {
  const [user,setUser] = useState(null);
  const [userData,setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect( () => {
    const handle= async ()=>{
      try {
        const response = await fetch('https://api.github.com/users/'+user.login, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        setUserData({...result});

    } catch (err) {
        setErr(err.message);
    } finally {
        setIsLoading(false);
    }
    }
    if(user)
      handle();
    
  },[user]);

  return (
    <div className="Container">
      <div className="App">
      <Container setUser={setUser} />
      {isLoading && <h2>Loading...</h2>}
      <br />
      {err && <h2>{err}</h2>}
      {userData && <UserInfo userData={userData}/>}
      </div>
    </div>
  );
}

export default App;
