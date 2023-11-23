import mongoose from "mongoose";

const UserSchema= new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        picturePath:{
            type:String,
            default:
                "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png",
        
        },


},{ timestamps:true }
);


const User = mongoose.model("User",UserSchema);

export default User;