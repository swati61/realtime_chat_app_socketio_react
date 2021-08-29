import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chats(props) {
  const [currentMsg, setCurrentMessage] = useState("");
  const [msgList, setMsgList] = useState([]);
  
  const sendMessage = async () => {
    if(currentMsg){
      const messageData = {
        room: props.room,
        author: props.userName,
        message: currentMsg,
        time: 
          new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await props.socket.emit("send_message", messageData);
      setMsgList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  }

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMsgList((list) => [...list, data]);
    })
  },[props.socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {msgList.map((messageContent) => {
            return (
              <div
                className="message"
                id={props.userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMsg}
          placeholder="Hey..."
          value={currentMsg}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
     </div>
  );
}

export default Chats;
