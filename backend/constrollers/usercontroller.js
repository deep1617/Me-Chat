const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/genratetoken");
const registerUser = asyncHandler(async (req, res,next) => {
  
  // return res.sendStatus(200).send('ok');
  console.log(req.body);
  const { name, email, pass } = req.body;
    console.log(req.file);
    const password = pass;
    const pic = req.file?.filename;
    console.log(pic);
  if (!name || !email || !password  || !pic) {
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
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
  next();
});
const authUser = asyncHandler(async (req,res)=>{
    const {email,pass}  = req.body;
    const password = pass;
    const user = await User.findOne({email});
    const flag = ((await user.matchPassword(password)))
    if (user && flag) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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
