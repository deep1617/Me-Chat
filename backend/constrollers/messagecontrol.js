const asyncHandler = require("express-async-handler");
const Message = require("../models/messagemodel");
const User = require('../models/UserModel');
const Chat = require('../models/chatmodel');
const sendmessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
      var message = await Message.create(newMessage);
      
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    console.log(message);
    message = await message.populate('chat.users');
    console.log(message.chat.users);
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const allmessages = asyncHandler( async (req,res)=>{
    try{
        const message = await Message.find({chat: req.params.chatId}).populate("sender","name pic,email").populate("chat");
        res.json(message);
    }
    catch(error){
      res.status(400)
      throw new Error("All  messages not found");
    }
})
module.exports = {sendmessages,allmessages}
