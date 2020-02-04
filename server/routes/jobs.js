const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const User = require("../models/User");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
	const {
		company,
		position,
		location,
		requirements,
		responsibilities,
		benefits,
		status,
		interviewTime,
		wage,
		remote,
		notes
	} = req.body;

	const job = new Job({
		company: company,
		position: position,
		location: location,
		requirements: requirements,
		responsibilities: responsibilities,
		benefits: benefits,
		status: status,
		interviewTime: interviewTime,
		wage: wage,
		remote: remote,
		notes: notes,
		creator: req.user
	});
	try {
		const savedJob = await job.save();
		res.send(job._id);
	} catch (err) {
		res.status(400).send(err);
	}
	User.findByIdAndUpdate(
		{ _id: req.user._id },
		{ $push: { jobs: job._id } },
		function(err, data) {
			if (data) {
				console.log(data);
			} else {
				console.log(err);
			}
		}
	);
});

module.exports = router;
