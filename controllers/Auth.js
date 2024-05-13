import { json } from "sequelize";
import User from "../models/User.js";
// ! register for user
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      res.status(400);
      throw new Error("We need to complete all fields!");
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get contacts" });
  }
};

// ! get all user
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const count = await User.count();
    res.status(200).json({ count, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // ! login user
  // const loginUser = async (req, res) => {
  //   try {
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

  // ! logout
  // const logout = async (req, res) => {
  //   try {
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };
};
export { createUser, allUsers };
