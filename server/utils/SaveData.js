import User from '../models/User.js';
import MessageModel from '../models/Message.js';

export async function saveUserAndMessage(messages) {
  try {
    console.log("messages",messages)

    const savePromises = messages.map((message) => {
        return MessageModel.create({sender:message.user,text:message.message});
      });
      Promise.all(savePromises)
      .then((savedMessages) => {
        console.log('Messages added successfully:', savedMessages);
      })
      .catch((error) => {
        console.error('Error adding messages:', error);
      })
  } catch (error) {
    console.error('Error:', error);
  }
}


