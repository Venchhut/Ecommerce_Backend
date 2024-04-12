import User from "../models/User.js";

// !get all user
const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    const count = await User.count();
    res.status(200).json({ count, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get contacts" });
  }
};

// !create user

export default getAllUser;
