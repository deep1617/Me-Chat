const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatroutes = require("./routes/chatroute");
const {registerUser } = require("./constrollers/usercontroller");
const generateToken = require("./config/genratetoken");
dotenv.config();
// let cors = require("cors");
const app = express();
connectDB();
app.use(express.json());
// console.log(process.env.PORT);
app.get("/", (req, res) => {            //this is our base application
  res.send("API is running is sfad asdf");
});
app.use("/api/user",userRoutes);
app.use("/api/chat",chatroutes);
// app.post("/api/user",registerUser);
const PORT = process.env.PORT || 5000;
// app.use(cors());
app.listen(PORT, console.log(`hello world ${PORT}`)); //creating server
