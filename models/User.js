const mongoose = require("mongoose");
const { Schema } = mongoose

const User = new Schema({
    name: {type:String ,required:true },
    age: {type:Number , required:true}
},
    {timestamps:true}
);
module.exports = mongoose.model("User" , User)