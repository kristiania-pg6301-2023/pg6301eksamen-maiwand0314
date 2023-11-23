import MessageModel from "../models/Message.js";



export async function getAllMessages() {
  try {
   

    // Retrieve all messages
    const messages = await MessageModel.find();

    // Log or return the messages
    // console.log('All messages:', messages);
    // Alternatively, you can return the messages from the function if needed
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
  } 
}


