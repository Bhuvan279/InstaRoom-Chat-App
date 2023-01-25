import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {

  const navigate = useNavigate()

  const [checkUsername, setCheckUsername] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)
  
  const [userInfo, setUserInfo] = useState({
    'username':'',
    'email':'',
    'password':''
  })

  function handleChange(e){
    setUserInfo(initValue=>{
      return{
        ...initValue,
        [e.target.name]:e.target.value
      }
    })

    console.log(userInfo)
  }

  function handleSubmit(e){
    e.preventDefault()
    let password = document.getElementById("password-box").value
    let confirm_password = document.getElementById("confirm-password-box").value

    if(password === confirm_password){
      setCheckPassword(false)
      console.log("Same")
      const sendData = async() => {
        let data_post = await axios.post('http://127.0.0.1:8000/api/create/', userInfo)
        console.log(data_post)
        if(data_post.data === "Username is already taken"){
          setCheckUsername(true)
        }
        else{
          setCheckUsername(false)
        }
      }
      sendData()
      navigate("/login")
      
    }
    else{
      setCheckPassword(true)
      console.log("Diff")
    }
  }
  return (
    <div className='main-bg'>
        <div className='main-register-box'>
            <div className='main-register-title'>
                Register Here
            </div>
            <form onSubmit={handleSubmit} className='main-input-container'>
                <input id="username" onChange={handleChange} name="username" className='register-input' type="text" placeholder="Enter your username"/>
                {checkUsername ? <div className='register-check-box'>Username is taken</div> : null}
                <input id="email" onChange={handleChange} name="email" className='register-input' type="email" placeholder="Enter your email"/>
                <input id="password-box" onChange={handleChange} name="password" className='register-input' type="password" placeholder="Enter your password"/>
                <input id="confirm-password-box" name="confirm-password" className='register-input' type="password" placeholder="Confirm password"/>
                {checkPassword ? <div className='register-check-box'>Incorrect Password</div> : null}
                <button type="submit" className='register-btn'>Submit</button>
               
            </form>
            <div className='register-login-div'>
              Already have an Account? 
              <Link to="/login">Login Here</Link>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage

// await axios.post('http://127.0.0.1:8000/api/task-create/', activeList)