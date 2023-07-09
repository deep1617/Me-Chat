const express = require("express");
// const router = require('')
const {
  registerUser,
  authUser,
  allUsers
} = require("../constrollers/usercontroller");
const {  protect } = require("../middleware/authmiddleware");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/",protect,allUsers);

module.exports = router;
