import User from "../models/userModel.js";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
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
