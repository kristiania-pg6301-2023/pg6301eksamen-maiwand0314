import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();

  async function handleLogOut(e) {
    e.preventDefault();
    await fetch("/api/login", { method: "DELETE" });
    await reload();
    navigate("/");
  }

  return (
    <>
      <h2>User profile</h2>
      <form onSubmit={handleLogOut}>
        <button>Log out</button>
      </form>
    
    </>
  );
}
