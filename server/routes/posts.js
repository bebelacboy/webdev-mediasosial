var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Post, User } = require("../models");
const verifyToken = require('../middleware/verify_token');

const v = new Validator();

router.get("/", verifyToken, async (req, res) => {
  const listPost = await Post.findAll();
  return res.json(listPost);
});


router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(404).json({message: 'Post not found'})
  }
  return res.json(post);
});

router.post("/", verifyToken, async (req, res) => {
  const schema = {
    user: "string",
    // postId: "number|optional",
    content: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    res.status(400).json(validate);
  }

  const user = await User.findByPk(req.body.user);

  if (!user) {
    return res.status(404).json({ message: "User not found"})
  }

  const post = await Post.create(req.body);
  res.json(post);
});

router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const schema = {
    content: "string|optional", // short-hand def
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  let post = await Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found"})
  }

  post = await post.update(req.body);
  res.json(post);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({message: 'Post not found'});
  }

  await post.destroy();
  res.json({message: `Post with id ${id} has been deleted`});
});

module.exports = router;