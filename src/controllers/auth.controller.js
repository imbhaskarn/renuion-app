const db = require("../models/index");
require("dotenv").config();
const JoiValidator = require("../helpers/joiValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = (req, res) => {
  //validate request body
  const error = JoiValidator.userSchema(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }
  // find user in database
  db.User.findOne({ where: { email: req.body.email } })
    .then(async (user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "wrong email or password!" });
      }
      const { id, name, email } = user.dataValues;
      //validate user password
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.dataValues.password
      );
      if (!isMatch)
        return res
          .status(400)
          .json({ result: "success", message: "wrong email or password!" });
      //generate jwt access token
      const accessToken = jwt.sign(
        { id, name, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ accessToken });
    })
    .catch((e) => {
      return res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = { authController };
