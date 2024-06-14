import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import avatar from './images/avatar.jpg';
import logo from './images/logo.png';

function App() {
  const [joke, setJoke] = useState(null);
  const [message, setMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/joke`, { withCredentials: true });
        if (response.data.message) {
          setMessage(response.data.message);
          setJoke(null);
        } else {
          setJoke(response.data);
        }
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const voteJoke = async (vote) => {
    if (!joke) return;
    try {
      await axios.post(`${apiUrl}/api/joke/${joke.id}/vote`, { vote }, { withCredentials: true });
      fetchJoke();
    } catch (error) {
      console.error('Error voting joke:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="user-profile">
          <span className="user-name">Cam</span>
          <img src={avatar} alt="User Avatar" className="user-avatar" />
        </div>
      </header>
      <div className='banner'>
        <h1>A joke a day keeps the doctor away</h1>
        <p>If you joke the wrong way, your teeth have to pay (serious)</p>
      </div>
      <main className="main-content">
        {joke ? (
          <div className="joke-container">
            <p className="joke-text">{joke.content}</p>
            <div className="joke-buttons">
              <button className="button funny" onClick={() => voteJoke('like')}>This is Funny! 😎</button>
              <button className="button not-funny" onClick={() => voteJoke('dislike')}>This is not funny 😒</button>
            </div>
          </div>
        ) : (
          <div>{ message }</div>
        )}
      </main>
      <footer className="footer">
        <p>This website is created as part of Holisitous program. The materials contained on this website are provided for general information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy of any particular statement and accepts no liability for any loss or damage which may arise from reliance on the information contained on this site.</p>
        <p>Copyright 2021 HHS</p>
      </footer>
    </div>
  );
}

export default App;