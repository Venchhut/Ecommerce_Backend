import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authentication.js";

// ! register for user
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate input
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the user already exists
    const userExisting = await User.findOne({ where: { email: email } });
    if (userExisting) {
      return res.status(400).json({ message: "Your email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Return the created user
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Failed to register user" });
  }
};

// ! get all users
const allUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    const count = await User.count();
    return res.status(200).json({ count, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ! login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserExiting = await User.findOne({ where: { email } });
    if (!findUserExiting) {
      return res.status(400).json({ message: "Wrong Email" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      findUserExiting.password
    );
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = generateToken(findUserExiting);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// ! user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

// ! logout
// const logout = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ! Modifier user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phoneNumber, avatar } = req.body;

    // Validate input
    if (!id || (!name && !email && !password && !phoneNumber)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Find the user by ID
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's details
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (avatar) user.avatar = avatar;

    // Save the updated user
    await user.save();

    // Return the updated user
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};
// ! delete each user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json("user was deleted successfully");
  } catch (error) {
    console.error("Error delete user:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
export { createUser, allUsers, loginUser, updateUser, getUserById, deleteUser };
