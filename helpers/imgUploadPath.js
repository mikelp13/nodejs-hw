const path = require("path");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const STORE_IMG = path.join(process.cwd(), "public", "avatars");

module.exports = {
  UPLOAD_DIR,
  STORE_IMG,
};
