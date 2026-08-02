const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

async function connectDB() {
    try{
        await mongoose.connect(uri)
        console.log("MongoDB connected:", uri  )
    }catch(err){
        console.log("MongoDB connection error:", err.message)
        process.exit(1);
    }
}
module.exports = connectDB;
