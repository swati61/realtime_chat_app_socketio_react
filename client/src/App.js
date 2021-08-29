import './App.css';
import io from 'socket.io-client';
import React, { useState } from 'react'; 
import Chats from './Chats';

const socket = io.connect("http://localhost:8000");

function App() {
  const [userName, setUserName] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);

  const joinChatRoom = () =>{
    userName && room && 
      socket.emit("join_room", room);
      setShowChat(true);
  }

  return (
    <div className="App">
      {!showChat ?
      <div className="joinChatContainer"><h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange = {(event) => setUserName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange = {(event) => setRoom(event.target.value)}
      />
      <button onClick={joinChatRoom}>Join Room</button>
      </div>
      : <Chats socket={socket} userName={userName} room={room}/>
       };
    </div>
  );
}

export default App;
