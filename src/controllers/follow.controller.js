const JoiValidator = require("../helpers/joiValidator");
const db = require("../models/index");
const { UniqueConstraintError } = require("sequelize");

const followUser = (req, res) => {
  const error = JoiValidator.idSchema(req.params);
  if (error) {
    return res.status(400).json({ message: error });
  }

  if (req.payload.id == req.params.id) {
    return res.status(409).json({ error: "Resource already exists" });
  }
  db.Follower.create({ followedBy: req.payload.id, userId: req.params.id })
    .then((data) => {
      return res
        .status(201)
        .json({ message: "follow success", data: data.dataValues });
    })
    .catch((err) => {
      if (err.parent.constraint === "self_follow_index") {
        return res.status(409).json({ error: "Resource already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    });
};
const unfollowUser = async (req, res) => {
  const error = JoiValidator.idSchema(req.params);
  if (error) {
    return res.status(400).json({ error: error });
  }
  try {
    await db.Follower.destroy({
      where: { followedBy: req.payload.id, userId: req.params.id },
    });
    return res.status(200).json({ message: "unfollow success" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  followUser,
  unfollowUser,
};
