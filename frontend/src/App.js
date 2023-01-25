import './App.css';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import PrivateRoute from './Utils/PrivateRoute';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import { AuthContext } from './Utils/AuthContext';

import { useState } from 'react';
import ChatRoom from './pages/ChatRoom';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} exact/>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/rooms" element={<RoomPage />} />
              <Route exact path="/chatRoom" element={<ChatRoom />} />
        </Route>
      </Routes>
  
    </>
  );
}

export default App;
