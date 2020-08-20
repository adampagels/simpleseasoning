const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const { registerValidation, loginValidation } = require("../validation");

const secret = require("../config/config").tokenSecret;

// Login page
router.get("/login", (req, res) => res.send("Login"));

// Register page
router.get("/register", (req, res) => res.send("Register"));

// Add recipe to favorites list
router.post(
  "/:username/favorite-recipes/:RecipeID",
  verify,
  async (req, res) => {
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: {
          favoriteRecipes: req.params.RecipeID,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Delete recipe to favorites list
router.delete(
  "/:username/favorite-recipes/:RecipeID",
  verify,
  async (req, res) => {
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: {
          favoriteRecipes: req.params.RecipeID,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Register user
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const registeredUser = await User.findOne({ email: req.body.email });
  if (!registeredUser) return res.status(400).send("Email is wrong");

  const validPassword = await bcrypt.compare(
    req.body.password,
    registeredUser.password
  );
  if (!validPassword) return res.status(400).send("password is wrong");

  const token = jwt.sign({ _id: registeredUser._id }, secret);
  res.header("auth-token", token).send(token);
});

module.exports = router;
