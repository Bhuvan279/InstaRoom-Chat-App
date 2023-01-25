import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        
        let response = await axios.post('http://127.0.0.1:8000/api/token/', {
             'username': e.target.username.value, 'password': e.target.password.value })

        let data = await response.data
        localStorage.setItem('authTokens', JSON.stringify(data))

        navigate("/rooms")
        // navigate("/home")
    }


    return (
        <div className='main-bg'>
            <div className='main-register-box'>
                <div className='main-register-title'>
                    Login
                </div>
                <form onSubmit={handleSubmit} className='main-input-container'>
                    <input id="username" name="username" className='register-input' type="text" placeholder="Enter your username" />

                    <input id="password-box" name="password" className='register-input' type="password" placeholder="Enter your password" />

                    
                    <button type="submit" className='register-btn'>Submit</button>
                    
                </form>
            </div>
        </div>
    )
}

export default LoginPage