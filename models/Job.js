const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String
		},
		position: {
			type: String,
			required: true
		},
		location: {
			type: String
		},
		requirements: {
			type: String
		},
		responsibilities: {
			type: String
		},
		benefits: {
			type: String
		},
		status: {
			type: String
		},
		wage: {
			type: Number
		},
		remote: {
			type: String
		},
		notes: {
			type: String
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
