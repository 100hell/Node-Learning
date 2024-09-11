import User from "../models/userModal.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const Newuser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await Newuser.save();
    if (Newuser) {
      res.status(200).json({
        _id: Newuser._id,
        name: Newuser.name,
        email: Newuser.email,
        username: Newuser.username,
        bio: Newuser.bio,
        profilePic: Newuser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in signUp user: ", error.message);
  }
};
