import React from 'react';

const ChatBody = ({messages,socket}) => {

  let selectedUser= JSON.parse(window.sessionStorage.getItem("user"))
  const handleLeaveChat = () => {
    window.sessionStorage.removeItem("user")
    socket.close()
    window.location="/"
  };
  console.log(messages)
  return (
    <>
      <header className="chat__mainHeader">
        <a href="/profile">{selectedUser.name}</a>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      
      <div className="message__container" >
        {messages.map((item,index) =>
        <div >
          {item.user === JSON.parse(window.sessionStorage.getItem('user')).name ? (
            <div className="message__chats" key={item.id} >
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{item.message}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={item.id} >
              <p>{item.user}</p>
              <div className="message__recipient">
                <p>{item.message}</p>
              </div>
            </div>
          )}
          </div>
        )}

      </div>
      
    
    </>
  );
};

export default ChatBody;