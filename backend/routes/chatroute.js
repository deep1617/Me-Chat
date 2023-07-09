const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {accesschat,fetchChats,createGroupChat, renameGroup, removeFromGroup, addToGroup}  = require("../constrollers/chatcontroller");
const router = express.Router();

router.post("/",protect,accesschat);
router.get("/", protect, fetchChats);
router.post("/group",protect,createGroupChat);
router.put("/rename",protect,renameGroup);
router.put("/groupremove",protect,removeFromGroup);
router.put("/addgroup",protect,addToGroup);
module.exports = router;