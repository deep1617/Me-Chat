const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
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