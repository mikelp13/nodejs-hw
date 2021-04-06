const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");
const User = require("../model/schemas/user");
const { STORE_IMG } = require("../helpers/imgUploadPath");


const createAvatar = async (id, pathFile) => {
  const avatarName = `${id}.jpg`;
  const img = await jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_TOP)
    .writeAsync(pathFile);

  await fs.rename(pathFile, path.join(STORE_IMG, avatarName));

  const avatar = `http://localhost:3000/avatars/${avatarName}`;
  return avatar;
};

const updateAvatar = async (req, res, next) => {
  const id = req.user.id;
  const pathFile = req.file.path;

  try {
    const url = await createAvatar(id, pathFile);

    await User.updateOne({ _id: id }, { avatarURL: url }); // update avatar in database

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL: url,
      },
    });
  } catch (err) {
    await fs.unlink(pathFile);
    return next(err);
  }
};

module.exports = {
  updateAvatar,
};
