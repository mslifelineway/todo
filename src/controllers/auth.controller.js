const UserModel = require("../entities/user.entity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const payload = req.body;

  try {
    const data = new UserModel(payload);
    data.password = await bcrypt.hash(payload.password, 10);
    const doc = await data.save();
    res.status(201).json({
      message: "User created successfully",
      data: doc,
    });
  } catch (error) {
    console.log("error while creating user", error.message);
  }
};
exports.login = async (req, res) => {
  const payload = req.body;
  const { email, password } = payload || {};

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      res.status(200).json({
        message: "User couldn't be found.",
        data: doc,
      });
    if (await bcrypt.compare(password, user.password)) {
      createTokenAndLogin(JSON.parse(JSON.stringify(user)), res);
    } else {
      res.status(400).json({
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    console.log("error while login user", error.message);
  }
};

const createTokenAndLogin = (user, res) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.expiresIn,
  });
  res.status(200).json({
    token,
  });
};
