
import User from "../models/User.js"; // Make sure to provide the correct path to your User model file

export async function saveUser(name, picturePath) {
  try {

      // Check if a user with the given name already exists
      const existingUser = await User.findOne({ Name: name });
      if (existingUser) {
        console.log(`User with name '${name}' already exists. Skipping creation.`);
        return existingUser;
      }
    // Create a new user
    const newUser = new User({
      Name: name,
      picturePath: picturePath || "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png",
    });

    // Save the user
    const savedUser = await newUser.save();

    // Log the saved user
    console.log('User created:', savedUser);
    return savedUser
  } catch (error) {
    console.error('Error creating user:', error);
  } 
}