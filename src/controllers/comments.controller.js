const db = require("../models/index");
const JoiValidator = require("../helpers/joiValidator");
const postComment = (req, res) => {
  console.log(req.params)
  const idError = JoiValidator.idSchema(req.params);
  const commentError = JoiValidator.commentScema(req.body);
  if (idError || commentError) {
    return res
      .status(400)
      .json({ result: "fail", message: idError || commentError });
  }
  db.Comment.create({
    content: req.body.content,
    userId: req.payload.id,
    postId: req.params.id,
  })
    .then((comment) => {
      return res.status(201).json({ commentId: comment.id });
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
