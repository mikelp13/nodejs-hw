const jwt = require("jsonwebtoken");
const User = require("../model/schemas/user");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../helpers/email");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { email, password, name, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }

  try {
    const verifyToken = uuidv4();

    await sendEmail(verifyToken, email, name);

    const newUser = new User({ email, subscription, name, verifyToken });

    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password) || !user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.updateOne({ _id: user._id }, { token }); // update token in database

    res.json({
      status: "success",
      code: 200,
      data: {
        email,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;

    await User.updateOne({ _id: id }, null);

    return res.status(204).json({
      status: "success",
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { id, email, subscription } = req.user;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verifyToken: verificationToken });

    if (user) {
      await user.updateOne({ verify: true, verifyToken: null });

      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          message: "Verification successful",
        },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  } catch (err) {
    next(err);
  }
};

const reverify = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required field email",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        code: 400,
        message: "Verification has already been passed",
      });
    }

    await sendEmail(user.verifyToken, email, name);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        message: "Verification successful",
      },
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  reg,
  login,
  logout,
  getCurrentUser,
  verify,
  reverify,
};
