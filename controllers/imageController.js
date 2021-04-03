const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");
const jimp = require("jimp");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const STORE_IMG = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2000000,
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

const uploadImageMiddleware = async (req, res, next) => {
  console.log(`req.file`, req.file);

  if (req.file) {
    const { file } = req;
    const img = await jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_TOP
      ).writeAsync(file.path);
    await fs.rename(file.path, path.join(STORE_IMG, file.originalname));
  }
  res.json("/");
};

module.exports = {
  upload,
  uploadImageMiddleware,
};
