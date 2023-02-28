var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require("../models");
var jwt = require('jsonwebtoken');


router.post("/login", async (req, res) => {
  const user = await User.findByPk(req.body.username);
  if (!user) {
    return res.status(404).json({message: "Wrong username!"});
  }
  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) {
    return res.status(400).json({message: "Wrong password!"})
  }
  const { username } = user;
  const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s"
  });
  const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d"
  });
  await user.update({refreshToken: refreshToken});
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 10000
  })
  res.json({accessToken})
});

router.get("/token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const users = await User.findAll({
    where: {
      refreshToken:refreshToken
    }
  });
  const user = users[0];
  console.log(user);
  if (!user) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const { username } = user;
    const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s'
    });
    res.json({ accessToken });
  });

  router.delete("/logout", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const users = await User.findAll({
      where: {
        refreshToken: refreshToken
      }
    });
    const user = users[0]
    if (!user) return res.sendStatus(204);
    const { username } = user;
    await user.update({refreshToken: null});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  })
});

module.exports = router;