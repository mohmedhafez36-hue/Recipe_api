const mongoose = require("mongoose");
const { Schema } = mongoose;

const Recipe = new Schema({
    title: {type:String ,required:true },
    description: {type:String , required:true},
    ingredients: {
        type:[String],
        required:true,
        validate: [v => v.length > 0, 'Recipe must have at least one ingredient']
    },
    instructions: {type:[String] , required:true},
    category: {
        type:String,
        lowercase:true,
        enum:{
            values:["breakfast","lunch","dinner","snack","appetizer"],
            message:'{VALUE} is not a valid category',    
        },
        required:true
    },
    tags: {
    type: [String],
    default: [], 
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true 
    },
    ratings: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        value: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        _id: false
    }
],

    averageRating: {
    type: Number,
    default: 0
    },

    ratingsCount: {
    type: Number,
    default: 0
    }
},
    {timestamps:true}
);
module.exports = mongoose.model("Recipe" , Recipe)