const AppError = require("../utils/AppError");
const Recipe = require("../models/Recipe");
const { Types  } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;



const get_all_recipes = async (req, res, next) => {
    try {
        const serchQuery = req.query.search || "";

        const page = req.query.p || 0
        const limit = 3;
        const recipes = await Recipe
        .find({
            $or: [
                { title: { $regex: serchQuery, $options: "i" } },
                { description: { $regex: serchQuery, $options: "i" } }
            ]
        })
        .sort({createdAt : 1})
        .skip(page * limit)
        .limit(limit).populate("author").populate("ratings.user");

        res.status(200).json({
            status: "success",
            results: recipes.length,
            data: { recipes }
    })
    }catch(err) {
        next(new AppError(err.message, 500));
    }
};

const get_one_recipe = async (req,res,next) => {
    try{
        const id = req.params.id


        if(!await Recipe.exists({_id : id})){
            return next(new AppError("Recipe not found", 404));
    }
        const recipe = await Recipe.findOne({_id : id}).populate("author").populate("ratings.user");

        res.status(200).json({
            status: "success",
            results: recipe ? 1 : 0,
            data: recipe
    })        
    }catch(err) {
        next(new AppError(err.message, 500));
    }

    
};

const add_recipe = async (req, res, next) => {
    try{
        const recipe = await Recipe.create(req.body);

        res.status(201).json({  
        status: "success",
        data: { recipe }
    });
    }catch(err) {
        next(new AppError(err.message, 500));
    }

};

const update_recipe = async (req, res, next) => {
    try{
        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            return next(new AppError("Invalid ID", 400));
        }

        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if(!recipe){
            return next(new AppError("Recipe not found", 404));
        }

        res.status(200).json({
            status: "success",
            data: { recipe }
        });
    }catch(err) {
        next(new AppError(err.message, 500));
    }
};

const delete_recipe = async (req, res, next) => {
    try{
        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            return next(new AppError("Invalid ID", 400));
        }

        const recipe = await Recipe.findByIdAndDelete(id);

        if(!recipe){
            return next(new AppError("Recipe not found", 404));
        }

        res.status(200).json({
            status: "success",
            data: { recipe }
        });
    }catch(err) {
        next(new AppError(err.message, 500));
    }
};


const update_rate = async (req, res, next) => {
    try{
        const { userId, value } = req.body;
        const recipeId = req.params.id;
        if(!ObjectId.isValid(recipeId) || !ObjectId.isValid(userId)){
            return next(new AppError("Invalid ID", 400));
        }
        const recipe = await Recipe.findById(recipeId);
        if(!recipe){
            return next(new AppError("Recipe not found", 404));
        }

        const index = recipe.ratings.findIndex(
            rating => rating.user.toString() === userId 
        );
        if(index === -1 ){
            recipe.ratings.push({
                user: userId,
                value:value,
        });
        }else{
            recipe.ratings[index].value = value;
        }
        recipe.ratingsCount = recipe.ratings.length;
        const total = recipe.ratings.reduce((acc , rating) => acc + rating.value , 0);
        recipe.averageRating = total / recipe.ratingsCount;
        await recipe.save();
        res.status(200).json({
            status: "success",
            data: { recipe }
        });
    }catch(err){
        next(new AppError(err.message, 500))
    }
};
module.exports = { get_all_recipes, add_recipe , get_one_recipe, update_recipe, delete_recipe, update_rate }