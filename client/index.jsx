import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./application.css";
import { ProfilePage } from "./components/profile/profilePage";
import { CallbackGoogle} from "./components/login/Google/CallbackGoogle";
import Home from "./components/home/Home";
import { LoginCallbackAD } from "./components/login/Azure/LoginCallbackAD";
import ChatPage from "./components/Chat/ChatPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Application() {
  const [user, setUser] = useState();
  

  async function fetchUser() {
    const res = await fetch("/api/login");
    if (res.status === 401) {
      setUser(undefined);
    } else {
      const user = await res.json();
      setUser(user);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <main>
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/chat"} element={<ChatPage />} />
          <Route path={"/login/google"} element={<CallbackGoogle/>}/>
          <Route path={"/login/azure"} element={<LoginCallbackAD />} />
          <Route path={"/profile"} element={ <ProfilePage  />} />
          <Route path={"*"} element={<h2>Not Found</h2>} />
        </Routes>
      </main>
  );
}

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
