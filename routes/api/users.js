const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/userController");
const guard = require("../../helpers/guard");


router.post("/auth/register", ctrlUser.reg);
router.post("/auth/login", ctrlUser.login);
router.post("/auth/logout", guard, ctrlUser.logout);

module.exports = router;