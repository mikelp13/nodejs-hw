const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/userConrtoller");


router.post("/auth/register", ctrlUser.reg);
router.post("/auth/login", ctrlUser.login);
router.post("/auth/logout", ctrlUser.logout);

module.exports = router;