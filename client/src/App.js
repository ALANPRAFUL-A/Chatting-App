
  import './App.css';
  import io from 'socket.io-client'
  import React, { useState } from 'react';
  import Chat from './Chat'


  const socket = io.connect("https://chatting-app-1-8cyo.onrender.com")
  function App() {

    const [ userName , setUserName] =  useState("")
    const [ room , setRoom ] =  useState("")
    const [ showChat , setShowChat ] = useState(false)

    const joinRoom = () => {
      if(userName !== "" && room !== ""){
        socket.emit("join_room" , room)
        setShowChat(true);
      }  
    }
    return (
      <div className="App">
        {!showChat ? (  
        <div className= "joinChatContainer">

        <h3>Join a Chat</h3>
        <input type='text' placeholder='Enter Your Name' onChange = {(event) => {setUserName(event.target.value)}}/>
        <input type='text' placeholder='Enter Room Id'  onChange = {(event) => {setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Join Room</button>
        </div>
        )
        :
        (
        <Chat socket = {socket} userName = {userName} room = {room}/>
        )}

        </div>
      
    );
  }

  export default App;
