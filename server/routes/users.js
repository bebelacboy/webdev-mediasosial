var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
const { Post, User } = require("../models");
const verifyToken = require('../middleware/verify_token');


const v = new Validator();

router.get("/", async (req, res) => {
  const listUser = await User.findAll({
    attributes: ["username", "bio", "createdAt", "updatedAt"]
  });
  return res.json(listUser);
});

router.get("/:username", verifyToken, async (req, res) => {
  const username = req.params.username;
  const user = await User.findByPk(username, {
    attributes: ["username", "bio", "createdAt", "updatedAt"]
  });
  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }
  return res.json(user);
});

router.post("/", async (req, res) => {
  const schema = {
    username: "string",
    password: "string",
    confPassword: "string",
  };
  
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  const {username, password, confPassword} = req.body;

  let user = await User.findByPk(username);
  if (user) {
    return res.status(400).json({ message: "User already exist"})
  }
  if (password !== confPassword) {
    return res.status(400).json({ message : "Password and Confirm Password didn't match"});
  }
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    username,
    password: hashPass,
  });
  res.json(newUser);
});

router.put("/:username", verifyToken, async (req, res) => {
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

router.delete("/:username", verifyToken, async (req, res) => {
  const username = req.params.username;
  const user = await User.findByPk(username);

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  await user.destroy();
  res.json({message: `${username} account has been destroyed`});
});


module.exports = router;