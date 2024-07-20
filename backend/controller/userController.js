import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import User from "../model/userschema.js";  // Ensure the correct path to the user model



// Register new user

const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "(-)User already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(200).json({message: "(+)User created", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "(-)Server error" });
  }
};

// Login user
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: '(-)Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '(-)Invalid Credentials' });
    }
    const { _id, username, email: userEmail } = user;
    res.status(200).json({ msg: '(+)Login successful', user: { _id, username, email: userEmail } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('(-)Server error');
  }
};

export {registerController, loginController};
