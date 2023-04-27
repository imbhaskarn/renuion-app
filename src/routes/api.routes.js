const express = require("express");
const { authController } = require("../controllers/auth.controller");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createPost,
  getPost,
  allPosts,
  deletePost,
} = require("../controllers/post.controller");
const { postComment } = require("../controllers/comments.controller");
const { getUser } = require("../controllers/user.controller");
const { likePost, unlikePost } = require("../controllers/like.controller");
const { followUser, unfollowUser } = require("../controllers/follow.controller");
//return authenticated user profile
router.get("/user", verifyToken, getUser);

// authenticate a valid user
router.post("/authenticate", authController);

//delete a post
router.post("/posts", verifyToken, createPost);

//get a post by id
router.get("/posts/:id", verifyToken, getPost);

//get all posts
router.get("/all_posts", verifyToken, allPosts);

//Like unLike a post by id
router.post("/like/:id", verifyToken, likePost);
router.post("/unlike/:id", verifyToken, unlikePost);

//delete a post by id
router.delete("/posts/:id", verifyToken, deletePost);

//comment on a post by post id
router.post("/comment/:id", verifyToken, postComment);

//follow unfollow a user
router.post("/follow/:id", verifyToken, followUser);
router.post("/unfollow/:id", verifyToken, unfollowUser);

module.exports = router;
