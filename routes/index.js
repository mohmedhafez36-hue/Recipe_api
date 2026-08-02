const router = require("express").Router();
const recipeRoutes = require("./recipe.routes");
const userRoutes = require("./user.routes");

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;