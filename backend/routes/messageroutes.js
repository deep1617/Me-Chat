const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const {sendmessages,allmessages} = require('../constrollers/messagecontrol.js');
const router = express.Router();
router.post('/',protect,sendmessages);
router.route("/:chatId").get(protect, allmessages);
module.exports = router;