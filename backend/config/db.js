const mongoose = require('mongoose');
const mon =
  "mongodb+srv://iit2021085:dgarg1617@cluster0.jpe0eni.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(mon, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("connected succesfully");
        
    }
    catch(err){
      console.log("Connetion faild");
        process.exit();
    }

}
module.exports = connectDB;