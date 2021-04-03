const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const upload = require("../../helpers/fileUploadMiddleware")
const { updateAvatar } = require("../../controllers/imageController");

router.patch("/avatars", guard, upload.single("avatar"), updateAvatar);

module.exports = router;
