const AppError = require("../utils/AppError");
const User = require("../models/User");

const add_user = async (req, res, next) => {
    try{
        const user = await User.create(req.body);

        res.status(201).json({
            status: "success",
        data: { user }
    });
    }catch(err) {
        next(new AppError(err.message, 500));  
    }
};

const get_all_users = async (req, res, next) => {
    try{
        const users = await User.find();   

        res.status(200).json({
            status: "success",
            results: users.length,
            data: { users }
        });
    }catch(err) {
        next(new AppError(err.message, 500));
    }
};

const get_user_by_id = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: { user }
        });
    }catch(err) {
        next(new AppError(err.message, 500));
    }
};


module.exports = { add_user, get_all_users, get_user_by_id };