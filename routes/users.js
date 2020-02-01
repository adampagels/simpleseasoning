const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation");

// Login Page
router.get("/login", (req, res) => res.send("Login"));

// Register Page
router.get("/register", (req, res) => res.send("Register"));

// Register User
router.post("/register", async (req, res) => {
	const { username, password, email } = req.body;

	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if user is already registered
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send("Email already exists");

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		username: username,
		email: email,
		password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
