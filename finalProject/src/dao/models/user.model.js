const mongoose = require("mongoose");

const collection = "users";

const userSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	rol: { type: String, required: true, default: 'user' }
});

const userModel = mongoose.model(collection, userSchema);
module.exports = userModel;