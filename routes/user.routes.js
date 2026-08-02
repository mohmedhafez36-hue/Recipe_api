const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {add_user , get_all_users , get_user_by_id} = require("../controllers/user.controllers")


router.post("/" , add_user);
router.get("/" , get_all_users);
router.get("/:id" , get_user_by_id);

module.exports = router;