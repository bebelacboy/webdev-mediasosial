var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Post, User } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
  const listUser = await User.findAll();
  return res.json(listUser);
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findByPk(username);
  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }
  return res.json(user);
});

router.post("/", async (req, res) => {
  const schema = {
    username: "string",
    password: "string",
    bio: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const post = await User.create(req.body);
  res.json(post);
});

router.put("/:username", async (req, res) => {
  const username = req.params.username;
  const schema = {
    password: "string|optional",
    bio: "string|optional",// short-hand def
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  let user = await User.findByPk(username);
  if (!user) {
    return res.status(404).json({ message: "User not found"})
  }

  user = await user.update(req.body);
  res.json(user);
});

router.delete("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findByPk(username);

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  await user.destroy();
  res.json({message: `${username} account has been destroyed`});
});

module.exports = router;