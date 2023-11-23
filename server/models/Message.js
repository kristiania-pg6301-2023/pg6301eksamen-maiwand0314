import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel= mongoose.model("Message", MessageSchema);
export default MessageModel