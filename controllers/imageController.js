const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const STORE_IMG = path.join(process.cwd(), "public/images");

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

const uploadImageHandler = async (req, res, next) => {
  console.log(`req.file`, req.file);

  if (req.file) {
    const { file } = req;
    await fs.rename(file.path, path.join(STORE_IMG, file.originalname));
  }
  res.json("/");
};



module.exports = {
  upload,
  uploadImageHandler,
};
