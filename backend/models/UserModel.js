const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const users = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,unique :true},
  password: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png",
  }
});
users.methods.matchPassword = async function (enteredPassword) {
  console.log(this.password);
  return (await bcrypt.compare(enteredPassword, this.password));
};
users.pre('save',async function(next){
  if(!this.isModified){
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password,salt);
})

const User = new mongoose.model("User",users);
module.exports = User;