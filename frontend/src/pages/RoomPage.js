import React, { useEffect, useState } from 'react'
  import jwt_decode from 'jwt-decode'
import axios from 'axios'
import ReactScrollableFeed from 'react-scrollable-feed'
import { useNavigate, Link } from 'react-router-dom'

const RoomPage = () => {

  const navigate = useNavigate()

  const [chatSocket, setChatSocket] = useState({url: "ws://localhost:3000/ws/Simson's%20Room/"})

  const [getRooms, setGetRooms] = useState([])
  const [getChat, setGetChat] = useState([])

  const [activeRoom, setActiveRoom] = useState([])

    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authTokens")))
    const user = jwt_decode(authToken.access)

  const [callApi, setCallAPI] = useState(true)

  const [createRoom, setCreateRoom] = useState({
    room_name:'',
    host:user.username
  })



  const getData = async () => {
    let response = await axios.get(`http://127.0.0.1:8000/api/members_rooms/view/${user.username}/`)

    if (activeRoom.room !== undefined){
      let response = await axios(`http://127.0.0.1:8000/api/room/getChats/${activeRoom.room}/`)
      setGetChat(response.data)
    }
    
    setGetRooms(response.data)
  }


  useEffect(()=> {
    
    getData() 
    
  },[callApi])


  
  
  function handleChange(e){
    
    setCreateRoom(initValue => {
      return {
        ...initValue,
        room_name:e.target.value
      }
    })
    
    console.log(createRoom)
  }
  
  
  
  function handleSubmit(e){
    
    e.preventDefault()
    console.log(getRooms)
      
      
      const sendData = async () => {
        
        let new_data = await axios.post('http://127.0.0.1:8000/api/rooms/create/', createRoom)
        document.getElementById("room_name").value = ''
        
        let response = await axios.post('http://127.0.0.1:8000/api/members/add/', {
          room: new_data.data.id,
          member: user.username,
          status: "host"
        }).then(()=> setCallAPI(prev =>! prev))

        setCreateRoom({
          room_name:'',
          user:user.username
        })
        
      }

      sendData()
    }

    const handleDelete= async(room) => {
      await axios.delete(`http://127.0.0.1:8000/api/rooms/delete/${room.room}/`)
    }

    const getInfo = async (room) => {
      
      let response = await axios(`http://127.0.0.1:8000/api/rooms/view_code/${room.room}/`)
      console.log(response.data)
    
    }
    const enterChatRoom = (room) => {

      console.log(room.room_name)
      setCallAPI(prev => !prev)
      navigate("/chatRoom", {state:{id:1,room:room}})
    }
   
      



    
    let allRoomElems = getRooms.map(room => {
      
      if(room.status === "host"){
        return <div key={room.id}>
          {room.room_name}
          <button type='button' onClick={() =>{ getInfo(room) }}>Get Info</button>
          <button type='button' onClick={() =>{ enterChatRoom(room) }}>Enter Chat-room</button>
          {/* <div>Host</div> */}
      </div>
      }else{
        return <div key={room.id}>
          {room.room_name}
          <button type='button' onClick={() =>{ getInfo(room) }}>Get Info</button>
          <button type='button' onClick={() =>{ enterChatRoom(room) }}>Enter Chat-room</button>
      </div>
      }
      
    })

    let allChatElems = getChat.map(chat => {
      
      return <div key={chat.id}>{chat.chat_text}</div>
    })
      


    const handleJoin = async () => {
      let code = document.getElementById("join_code").value
      let response = await axios.get(`http://127.0.0.1:8000/api/member/join_room/${code}/`)
      
      let add_member = await axios.post('http://127.0.0.1:8000/api/members/add/', {
        room: response.data[0].id,
        member: user.username,
        status: "member"
      }).then(() => setCallAPI(prev => !prev))
      
    }

    

    const sendChat = async () => {
      console.log(chatSocket)

      let chat_text_now = document.getElementById("chat_text").value
  
      let response = await axios.post(`http://127.0.0.1:8000/api/room/postChats/${activeRoom.room}/`, {
        user:user.username,
        chat_text: chat_text_now,
        room: activeRoom.room
      })

    }
    
  return (
    <>
      <div className='rooms-main-container'>

        <div className='left-side'>
          <h2> Create Rooms {user.username}</h2>
          <form>
              <input onChange={handleChange} id="room_name" name='room_name'></input><br/>
              <button type='button' onClick={handleSubmit}>Add</button>
          </form>
          <br/>

          <h2> Join Rooms {user.username}</h2>
          <form>
              <input id="join_code" name='room_name' placeholder='Enter Code'></input><br/>
              <button onClick={handleJoin} type='button'>Join</button>
          </form>
          <br/>

          <h2>All Rooms</h2>
          <div>
            {allRoomElems}
          </div>
        </div>
        
        
          
      </div>
    </>
  )
}

export default RoomPage