import User from "../models/userModel.js";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (
      !name ||
      name.trim() == "" ||
      !email ||
      email.trim() == "" ||
      !password ||
      password.trim() == ""
    ) {
      return res
        .status(400)
        .json({ message: "No fields should be empty in the request body." });
    }
    const checkIfUserPresent = await User.findOne({ email: email });

    if (checkIfUserPresent) {
      return res.status(400).json({ message: "User already present" });
    }

    const newUser = await new User({ name, email, password });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "user created successfully.", data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "all users - ", data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser, fetchAllUsers };
