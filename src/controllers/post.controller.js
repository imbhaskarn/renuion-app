const db = require("../models/index");
const JoiValidator = require("../helpers/joiValidator");
const createPost = (req, res) => {
  const error = JoiValidator.postSchema(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  db.Post.create({ ...req.body, userId: req.payload.id })
    .then((post) => {
      return res.status(201).json(post);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Internal server error" });
    });
};
const getPost = (req, res) => {
  const validationError = JoiValidator.idSchema(req.params);
  if (validationError) {
    return res.status(400).json(validationError);
  }
  const id = req.params;
  db.Post.findOne({ where: { ...id, userId: req.payload.id }, include: [{
    model: db.Comment,
    as: 'Comments'
  }] })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ message: `post not found with id: ${id}.` });
      }
      return res.status(200).json(post);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Internal server error" });
    });
};

const allPosts = (req, res) => {
  db.Post.findAll({
    where: { userId: req.payload.id },
    include: [
      {
        model: db.Comment,
        as: "Comments",
      },
    ],
  })
    .then((posts) => {
      if (!posts) {
        return res
          .status(404)
          .json({message: `No posts found.` });
      }
      return res.status(200).json(posts);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Internal server error" });
    });
};
const deletePost = (req, res) => {
  const validationError = JoiValidator.idSchema(req.params);
  if (validationError) {
    return res.status(400).json(validationError);
  }
  const id = req.params;
  db.Post.destroy({ where: { ...id, userId: req.payload.id } })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({  message: `post not found with id: ${id}.` });
      }
      return res.status(200).json(post);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({  message: "Internal server error" });
    });
};

module.exports = {
  createPost,
  getPost,
  allPosts,
  deletePost,
};
