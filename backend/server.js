const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatroutes = require("./routes/chatroute");
const messageroutes = require("./routes/messageroutes")
const {registerUser } = require("./constrollers/usercontroller");
const generateToken = require("./config/genratetoken");
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded( { extended: true} ));
console.log(process.env.PORT);
app.get("/", (req, res) => {            //this is our base application
  res.send("API is running is sfad asdf");
});
app.use("/api/user",userRoutes);
app.use("/api/chat",chatroutes);
app.use("/api/message",messageroutes);
// app.post("/api/user",registerUser);
console.log(process.env.PORT);
const PORT = process.env.PORT;
app.listen(PORT, console.log(`hello world ${PORT}`)); //creating server
