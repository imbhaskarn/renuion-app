const db = require("../models/index");

const getUser = (req, res) => {
  db.User.findOne({ where: { ...req.payload.id } })
    .then((user) => {
      const { id, name, email, createdAt } = user.dataValues;
      return res.status(200).json({ id, name, email, createdAt });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ result: "fail", message: "Internal server error" });
    });
};

module.exports = {
  getUser,
};
