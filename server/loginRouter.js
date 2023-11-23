import express from "express";
import { fetchUserInfo } from "./utils/UserInfo.js";
import { fetchJson } from "./utils/fetchJSON.js";
import { saveUser } from "./Controller/UserController.js";

  const openid_configuration = "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration";

  const OPENID_DISCOVERY_URL =
  "https://accounts.google.com/.well-known/openid-configuration";


export const loginRouter = express.Router();

loginRouter.get("/login", async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).json({message:'User not found'})
  }
});
loginRouter.post('/login/AD',async(req, res)=>{
  const { access_token } = req.body;
  const user = await fetchUserInfo(openid_configuration, access_token);
  console.log("user",user)

 let savedUser=await saveUser(user.givenname,user.picture)
 console.log("SavedUser",savedUser)

  // res.cookie("access_token", access_token);
  return res.status(200).json({user:savedUser})
})
loginRouter.post("", (req, res) => {
  const { username, password } = req.body;
  res.cookie("username", username, { signed: true });
  res.sendStatus(204);
});

loginRouter.post("/login/accessToken", async(req, res) => {
  const { access_token } = req.body;
  let user;
  if (access_token) {
    const discoveryDocument = await fetchJson(OPENID_DISCOVERY_URL);
    const { userinfo_endpoint } = discoveryDocument;
     user = await fetchJson(userinfo_endpoint, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    const { given_name, family_name } = user;
    const username = `${given_name} ${family_name}`;
    req.user = { ...user, username };
    console.log("user",user)
  } else if (username) {
    req.user = { username: username };
  }
  res.cookie("access_token", access_token, { signed: true });
  let savedUser=await saveUser(user.name,user.picture)
  return res.status(200).json({user:savedUser})
});

loginRouter.delete("", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("access_token");
  res.sendStatus(204);
});
