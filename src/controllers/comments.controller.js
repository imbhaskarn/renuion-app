const db = require("../models/index");
const JoiValidator = require("../helpers/joiValidator");
const createPost = (req, res) => {
  const error = JoiValidator.postSchema(req.body);
  if (error) {
    return res.status(400).json({ result: "fail", message: error });
  }
  db.Post.create({ ...req.body, userId: req.payload.id })
    .then((post) => {
      return res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ result: "fail", message: "Internal server error" });
    });
};

module.exports = {
  postComment,
};
