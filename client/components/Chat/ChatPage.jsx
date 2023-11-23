import React, { useEffect, useRef, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = () => {
  const [messages,setMessages]=useState([])
  const lastMessageRef=useRef(null)
  const [typing,setTyping]=useState([])
  const webSocket = new WebSocket("ws://localhost:3000")



async function getMessage(){
  const res = await fetch("/allMessages", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to POST access token");
  }
  let userData=await res.json()
  console.log("user",userData)
  let allMessages=userData.messages.map((msg)=>{
    return{
      user:msg.sender,
      message:msg.text
    }
  })
  setMessages(allMessages)
}

useEffect(() => {
  getMessage() 
  webSocket.onmessage = (event) => {
    console.log({ event });
    setMessages((current) => [...current, JSON.parse(event.data)]);
  };
}, []);

  return (
    <div className="chat">
      <ChatBar socket={webSocket} />
      <div className="chat__main">
        <ChatBody socket={webSocket} messages={messages}  />
        <ChatFooter socket={webSocket} />
      </div>
    </div>
  );
};

export default ChatPage;