const JoiValidator = require("../helpers/joiValidator");
const db = require("../models/index");

const likePost = (req, res) => {
  const error = JoiValidator.idSchema(req.params);
  if (error) {
    return res.status(400).json({ message: error });
  }
  db.Like.create({ userId: req.payload.id, postId: req.params.id })
    .then((data) => {
      return res.status(201).json({ message: "like success" });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(201).json({ message: "like success" });
      }
      return res
        .status(500)
        .json({ message: "Internal server error" });
    });
};
const unlikePost = async (req, res) => {
  const error = JoiValidator.idSchema(req.params);
  if (error) {
    return res.status(400).json({ message: error });
  }
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    });
    if (post) {
      const likes = post.dataValues.like < 1 ? 0 : post.dataValues.likes - 1;
      post.update({ likes });
      await db.Like.destroy({
        where: { userId: req.payload.id, postId: req.params.id },
      });
      return res.status(200).json({ message: "unlike success" });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
