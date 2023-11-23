import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginWithGoogle from '../login/Google/LoginWithGoogle';
import { LoginWithAD } from '../login/Azure/LoginWithAD';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [room,setRoom]=useState('')

  return (
    <form className="home__container" >
    <h2 className="home__header">Welcome to Open Chat</h2>
    <div className='welcomePage'>
      <LoginWithGoogle/>
      <LoginWithAD/>
      </div>
    </form>
  );
};

export default Home;