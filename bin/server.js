const app = require("../app");
const mongoose = require("mongoose");
const createImagesFolder = require("../helpers/createImagesFolder");
require("dotenv").config();
const path = require("path");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const STORE_IMG = path.join(process.cwd(), "public/images");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

connection
  .then(() => {
    app.listen(PORT, async () => {
      await createImagesFolder(UPLOAD_DIR);
      await createImagesFolder(STORE_IMG);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
