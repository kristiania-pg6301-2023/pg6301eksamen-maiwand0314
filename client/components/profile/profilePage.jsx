import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  let selectedUser=JSON.parse(window.sessionStorage.getItem("user"))
 

  return (
    <div className="cardUpper">
      <div class="card">
  <img src={selectedUser.picture} alt="Avatar" style={{width:"100%",height:"100%"}}/>
  <div class="container">
    <h4><b>{ selectedUser.name}</b></h4>
  </div>
  <a href="/chat">Back to chat</a>
</div>
    
    </div>
  );
}
