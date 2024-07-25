const express = require("express");
// const router = require('')
const multer  = require('multer')
const upload = require('../middleware/multer.middleware.js');
const {
  registerUser,
  authUser,
  allUsers
} = require("../constrollers/usercontroller");
const {  protect } = require("../middleware/authmiddleware");

const router = express.Router();
router.post("/",upload.single('pic'),registerUser);
router.post("/login", authUser);
router.get("/",protect,allUsers);

module.exports = router;
