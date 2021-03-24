const jwt = require("jsonwebtoken");
const User = require("../model/schemas/user");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { email, password, subscription } = req.body;

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
    const newUser = new User({ email, subscription });
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
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    })
  }

  const payload = { id: user._id }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

  await Users.updateToken(id, token) // update token in database

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      token,
    },
  })
};


const logout = async (req, res, next) => {
  await Users.updateToken(id, null)
};

module.exports = {
  reg,
  login,
  logout,
};
