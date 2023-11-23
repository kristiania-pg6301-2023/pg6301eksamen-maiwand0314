import ChatroomModel from "../models/ChatRoom.js";

export async function createChatroomWithJoinedUsers(payload) {
  try {
    const userIdHere = payload.id;

    // Create a new chatroom with joined users
    const newChatroom = new ChatroomModel({
      title: payload.title,
      description: payload.description,
      createdBy: userIdHere,
      joinedUsers: [userIdHere],
    });

    // Save the chatroom
    const savedChatroom = await newChatroom.save();
    return savedChatroom
  } catch (error) {
    console.error("Error creating chatroom:", error);
  }
}

export async function getChatroomsByUserId(payload) {
  try {
    const userId = payload.id;

    const chatrooms = await ChatroomModel.find({ joinedUsers: userId });

    // Log the saved chatroom
    return chatrooms;
  } catch (error) {
    console.error("Error creating chatroom:", error);
  }
}
