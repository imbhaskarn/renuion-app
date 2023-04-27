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
      return res.status(500).json({ message: "Internal server error" });
    });
};
const getPost = async (req, res) => {
  const validationError = JoiValidator.idSchema(req.params);
  if (validationError) {
    return res.status(400).json(validationError);
  }
  try {
    const { id } = req.params;
    const post = await db.Post.findOne({
      where: { id, userId: req.payload.id },
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: `post not found with id: ${id}.` });
    }

    const comments = await post.countComments();
    return res.status(200).json({ ...post.dataValues, comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      where: { userId: req.payload.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Comment,
          as: "Comments",
        },
      ],
    });
    if (!posts) {
      return res.status(404).json({ message: `No posts found.` });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
          .json({ message: `post not found with id: ${id}.` });
      }
      return res.status(200).json(post);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = {
  createPost,
  getPost,
  allPosts,
  deletePost,
};
