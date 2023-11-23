import React, { useState,useEffect } from 'react';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');
  


  // const handleTyping=()=>{
  //   socket.emit('typing',`${localStorage.getItem('userName')} is typing ...`)
  // }
  function handleSubmit(e) {
    console.log("socket",socket)
    e.preventDefault();
    let user=window.sessionStorage.getItem("user")
    // console.log("user",JSON.parse(user))
    let parsedUser=JSON.parse(user)
    socket.send(JSON.stringify({
      user:parsedUser.name,
      message:message
    }));
    setMessage("");
  }

  
 

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;