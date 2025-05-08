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
      res
        .status(400)
        .json({ message: "Name should not be empty in request body." });
    }
    const checkIfUSerPresent = await User.findOne({ email: email });

    if (checkIfUSerPresent) {
      return res.status(400).send("User already present");
    }

    const newUser = await new User({ name, email, password });
    newUser.save();
    return res
      .status(201)
      .json({ message: "user created successfully.", data: newUser });
  } catch (error) {
    res.send(500).json({ error: error.message });
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
