import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required in the request body." });
    }

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "No fields should be empty in the request body." });
    }
    const checkIfUserPresent = await User.findOne({ email: email });

    if (checkIfUserPresent) {
      return res.status(400).json({ message: "User already present" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;
    return res
      .status(201)
      .json({ message: "user created successfully.", data: userResponse });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    return res.status(200).json({ message: "all users - ", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { createUser, fetchAllUsers };
