const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImageHandler,
} = require("../../controllers/imageController");

router.post("/", upload.single("picture"), uploadImageHandler);

module.exports = router;
