import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import jwt_decode from 'jwt-decode'
import axios from 'axios';

const ChatRoom = () => {

    const location = useLocation();
    
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authTokens")))
    const user = jwt_decode(authToken.access)

    const [ chatMessages, setChatMessages] = useState([])

    const [message, setMessage] = useState({
        message:''
    })

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${location.state.room.room_name}/`);
    
    const getData = async () => {
        let response = await axios.get('http://127.0.0.1:8000/room/getChat/')
        console.log(response.data)
        setChatMessages(response.data)
    }

   

    useEffect(()=> {

        client.onopen = () => {
            console.log("Websocket is connected")
        }
        client.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data)
            console.log(data.message)
            setChatMessages(init => {
                return [...init, data]
            })
        }

        getData()


    },[])
        

    const handleMessage = (e) => {
        setMessage(init=> {
            return {
                ...init,
                message:e.target.value
            }
        })
        console.log(message)
    }

    const sendChat =  async () => {
        
        client.send(JSON.stringify({
            'message':message.message,
            'room':location.state.room.room_name,
            'username':user.username
        }))
        
        let new_chat = await axios.post('http://127.0.0.1:8000/room/postChat/', {
            user: user.username,
            message: message.message,
            room: location.state.room.room
        })
        
        console.log(new_chat)
    }

  
    const displayMessages = chatMessages.map(chat => {
        return <div>{chat.message}</div>
    })

    
    
    return (
        <>
        <div>{location.state.room.room_name}</div>
        <input id="send-message" onChange={handleMessage}></input>
        <button id="chat-message-submit" onClick={sendChat}>Send</button>
        <div id="chat-messages">{displayMessages}</div>
        </>
            
    )
}
    
export default ChatRoom
            


   


    
    
    

    

       