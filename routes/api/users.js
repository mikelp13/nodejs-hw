const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/userController");
const guard = require("../../helpers/guard");
const { validateUser } = require("../../helpers/validation");

router.post("/auth/register", validateUser, ctrlUser.reg);
router.post("/auth/login", validateUser, ctrlUser.login);
router.post("/auth/logout", guard, ctrlUser.logout);
router.get("/current", guard, ctrlUser.getCurrentUser);
router.get("/verify/:verificationToken", ctrlUser.verify);
router.post("/verify", ctrlUser.reverify);

module.exports = router;