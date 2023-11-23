import React, { useEffect, useState } from 'react';

const ChatBar = ({socket}) => {
  const [users,setUsers]=useState([])
  const [rooms,setRooms]=useState([])
  const [formDetails,setFormDetails]=useState({
    title:'',
    description:''
  })
  const [modal,setModal]=useState(false)
  let selectedUser=JSON.parse(window.sessionStorage.getItem("user"))

  const handleChange=(e)=>{
    setFormDetails({
      ...formDetails,
      [e.target.name]:e.target.value
    })
  }

  const handleAdd=async(e)=>{
    const res = await fetch("/addChatRoom", {
      method: "POST",
      body: JSON.stringify({...formDetails,id:selectedUser.id}),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to POST access token");
    }
    let chatRoomResp=await res.json()
    console.log(chatRoomResp)
  }

  async function getChatRoom(){
    const res = await fetch("/getChatRooms", {
      method: "POST",
      body: JSON.stringify({id:selectedUser.id}),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to POST access token");
    }
    let chatRoomResp=await res.json()
    setRooms(chatRoomResp.chatRooms)
  }
useEffect(()=>{
  getChatRoom()
})
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      
      {modal && (
      <div id="myModal" class="modal">

  <div class="modal-content">
    <button className='close' onClick={()=>setModal(false)}>
    <span >&times;</span>
    </button>
    <div className='chatRoomForm' >
    <div className='label'>
    <label style={{width:"120px"}} htmlFor="title">title</label>
      <input
        type="text"
        minLength={6}
        name="title"
        className="username__input"
        onChange={handleChange}
      />
      </div>
      <div className='label'>
      <label style={{width:"120px"}} htmlFor="description">Description</label>
       <input
        type="text"
        minLength={4}
        name="description"
        className="username__input"
        onChange={handleChange}
      />
      </div>
      <button className="home__cta" onClick={handleAdd}>Add Chatroom</button>
  </div>
</div>
</div>
      )}
       {selectedUser.isEntra && (
      <div>

        <h4 className="chat__header">Chat Rooms</h4>
       
          <div>
            <button style={{width:"50%",background:"blue",border:"2px solid blue",color:'white',padding:"2px 4px",marginBottom:"8px",cursor:"pointer"}} onClick={(e)=>setModal(true)}>Add a chat room</button>
            </div>
      
        <div className="chat__users">
        {rooms.length>0 && rooms.map((room) => (
            <p key={room._id}>{room.title}</p>
          ))}
        </div>
      </div>
       )}
    </div>
  );
};

export default ChatBar;
