const Users = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

let getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json({ message: "Registered users", users });
};

let registerUser = async (req, res) => {
    let data = req.body;

    let existingUser = await Users.findOne({ email: data.email });

    if (existingUser) {
     return res.status(400).json({ message: "User already registerd" });
    }

    const hashedPassword = bcryptjs.hashSync(data.password, 10);

    let newUser = await Users.create({ ...data, password: hashedPassword });

    res.status(201).json({ message: "User Registered successfully", newUser });
 
};

let loginUser = async (req, res) => {
  let data = req.body;
  let existingUser = await Users.findOne({ email: data.email });

  if (!existingUser) {
    return res.status(400).json({ message: "User Not Found" });
  }

  let result = bcryptjs.compareSync(data.password, existingUser.password);

  if (!result) {
   return res.status(400).json({ message: "Invalid Credential" });
  }
  let token = jwt.sign({ userId: existingUser._id }, "thisisyourprivatekey");

  res.status(200).json({ existingUser, token });
};

let updateUser = async (req, res) => {
  let id = req.headers.id;
  let data = req.body;

  let updatedUser = await Users.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({ message: "user Updated", updatedUser });
};

let makeAdmin = async(req,res)=>{

  const userId = req.params.id;
  try {
    // Find the user by ID
    const user = await Users.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }
    // Check if the user is already an admin
    if (user.isAdmin) {
      return res.status(400).json({ message: 'User  is already an admin' });
    }
    // Update the user's admin status
    user.isAdmin = true;
    await user.save();
    return res.status(200).json({ message: 'User  promoted to admin', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

let deleteUser = (req, res) => {
  let id = req.query.id;

  let deletedUser = Users.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(400).json({ message: "No user Found" });
  }

  res.status(200).json({ message: "user deleted" });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  makeAdmin
};
