const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImageMiddleware,
} = require("../../controllers/imageController");

router.post("/", upload.single("picture"), uploadImageMiddleware);

module.exports = router;
