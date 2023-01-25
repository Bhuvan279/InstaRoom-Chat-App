import React, { useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { AuthContext } from '../Utils/AuthContext'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import ReactScrollableFeed from 'react-scrollable-feed'

const HomePage = () => {

  let all_chats_length = 0
  let [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authTokens")))
  let user = jwt_decode(authToken.access)
  let [loading, setLoading] = useState(true) 
  let [chat, setChat] = useState({
    id:200,
    user: '',
    chat_text: '',
    created_at: '',
    updated_at: ''
  })

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${authToken.access}`
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
   
  let [allChats, setAllChats]  = useState([])
  let [getChats, setGetChats] = useState([])

  useEffect(()=> {

    if(loading){
      refreshToken()
    }

    let time = 1000 * 60 * 4
    let interval = setInterval(() => {
      refreshToken()
    },time)
    return ()=> clearInterval(interval)
    
  },[authToken,loading])

  const getChat = async () => {
    let response = await axios.get('http://127.0.0.1:8000/api/chatroom/1/read/')
    setAllChats(response.data)
    // setGetChats(uuid())
    
  }

  useEffect(()=>{

    getChat()
   
  }, [])

  
  let refreshToken = async () => {
    
    try{

      let response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        'refresh':authToken.refresh
      })
      localStorage.setItem("authTokens",JSON.stringify(response.data))
      setAuthToken(JSON.parse(localStorage.getItem("authTokens")))
      console.log(response.data)

      if(loading){
        setLoading(false)
      }
    }catch(e){
      console.error(e)
    }
  }

  function handleChange(e){
    setChat(initValue => {
      return {
        ...initValue,
        user:user.username,
        chat_text:e.target.value
      }
    })
    console.log(chat)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("it is send")
    let response = await axios.post('http://127.0.0.1:8000/api/chatroom/1/add/', chat)
    
    setChat('')
    console.log(chat)
    document.getElementById("chat_text").value = ''
  }

  
  let allChatElems = allChats.map(chat => {
    
    return (
      <div key = {chat.id} className={chat.user === user.username ? "chat-holder-user" : "chat-holder"}>
      <div key={chat.id} className={chat.user === user.username ? "chat-text-user" : "chat-text"}>
        {chat.chat_text}
        </div>
        </div>
      ) 
    })
  
  

  return (
    <div className='main-chatpage'>
      <div className='main-chatbox'>
        <div className='chatbox-title'>{user.username}'s Chats</div>
        <div className='chat-area'>
          <ReactScrollableFeed>
          {allChatElems}
          </ReactScrollableFeed>
        </div>
        <form method='POST' className='chat-type-box'>
          <input className='chat-input-box' onChange={handleChange} id="chat_text" name='chat_text' type='text' placeholder='Enter chat here'></input>
          <button className='chat-submit-btn' onClick={handleSubmit} type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default HomePage