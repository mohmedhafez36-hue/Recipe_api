const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

const limiter = require("../middlewares/cache");

const {get_all_recipes,add_recipe ,get_one_recipe, update_recipe , delete_recipe , update_rate} = require("../controllers/recipe.controllers")


router.get("/" , limiter, get_all_recipes);

router.get("/:id" , limiter, get_one_recipe);

router.post("/" , limiter, add_recipe);

router.patch("/:id" , limiter,  update_recipe);

router.delete("/:id" , limiter, delete_recipe);

router.patch("/:id/rate" , limiter, update_rate);



module.exports = router;