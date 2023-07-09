const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const JWT_SECRET =
  "8753436e24e838b1263ac6666dea9f6bccdbf9509b62a824ebeba86c3be7c4393ff30d55c3592aa2447801073ba1097fdcbd662fdbc05a3f81fe73688d55335f";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.body);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };