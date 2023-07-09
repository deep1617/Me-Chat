const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/genratetoken");
//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, pass, pic } = req.body;
    // console.log(req.body);
    // console.log("hello");
    console.log(name);
    console.log(email);
    console.log(pass);
    const password = pass;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("user exist");
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    //   isAdmin: user.isAdmin,
      pic: user.pic,
      // user : user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const authUser = asyncHandler(async (req,res)=>{
    const {email,pass}  = req.body;
    const password = pass;
    const user = await User.findOne({email});
    const flag = ((await user.matchPassword(password)))
    if (user && flag) {
      console.log("fasjf");
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        // pass: user.password,
        token: generateToken(user._id),
        pic: user.pic,
      });
    } else {
      console.log("user dont exist");
      res.status(400).send("User dont exist")
    }
});
const allUsers = asyncHandler(async (req,res)=>{
      const keyword = req.query.search
        ? {
            $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
          // console.log(req.user._id);
      const users = await User.find(keyword).find({
        _id: { $ne: req.user._id },
      });
      res.send(users);
});
module.exports = {registerUser,authUser,allUsers};
