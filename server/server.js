import express from "express";
import cookieParser from "cookie-parser";
import { loginRouter } from "./loginRouter.js";
import dotenv from "dotenv";
import * as path from "path";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import { saveUserAndMessage } from "./utils/SaveData.js";
import { getAllMessages } from "./Controller/getMessages.js";
import { createChatroomWithJoinedUsers, getChatroomsByUserId } from "./Controller/ChatroomController.js";

  const openid_configuration = "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration";
const client_id = "8288b90c-531e-45dd-a2cf-49b96791bd3a";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser("xxx"));


mongoose
  .connect("mongodb+srv://sarmad:pakistan90@cluster0.xnjey.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res)=>console.log("succesfully connected")).catch((error)=>console.log("unable to connect to db"))

app.use("/api", loginRouter);
app.get("/api/config", (req, res) => {
  const user = req.user;
  res.send({ user, openid_configuration, client_id });
});
app.get("/allMessages",async(req,res)=>{
  let messages=await getAllMessages()
  res.status(200).json({messages})
})
app.post("/addChatRoom",async(req,res)=>{
  let addChatRoom=await createChatroomWithJoinedUsers(req.body)
  console.log("add",addChatRoom)
  res.status(201).json({addChatRoom})
})
app.post("/getChatRooms",async(req,res)=>{
  let chatRooms=await getChatroomsByUserId(req.body)
  res.status(201).json({chatRooms})
})
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});


const sockets = [];
let messages=[]

const server = app.listen(process.env.PORT || 3000, () => {});
const webSocketServer = new WebSocketServer({server:server  });

webSocketServer.on("connection",function newConnection(connection){
  console.log("Connected")
  connection.on('close',()=>{
    console.log("closed connection")
    saveUserAndMessage(messages)
    messages=[]
  })
  connection.on("message",function handleMessage(msg){
    let parsedMessage=JSON.parse(msg.toString())
    messages.push(parsedMessage)
    for(const s of sockets){
      s.send(msg.toString())
    }
  })
  sockets.push(connection)
})

