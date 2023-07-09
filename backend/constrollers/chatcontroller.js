const asyncHandler = require("express-async-handler");
const Chat = require('../models/chatmodel');
const User = require('../models/UserModel');

//access chat between two user
const accesschat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "Please enter the user ID properly" });
    return;
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate({
        path: "latestMessage.sender",
        select: "name pic email",
      });

    if (isChat.length > 0) {
      res.json(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//fectch chats between two users
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name pic email",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//create a group chat
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).json({
      message: "More than 2 users are required to form a group chat",
    });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).json({ message: "Chat not found" });
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//remove a member from the group
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404).json({ message: "Chat not found" });
    } else {
      res.json(removed);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404).json({ message: "Chat not found" });
    } else {
      res.json(added);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = {
  accesschat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};