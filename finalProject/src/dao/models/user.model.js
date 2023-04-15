const mongoose = require("mongoose");

const collection = "users";

const roleType = {
	USER: "USER",
	ADMIN: "ADMIN",
	PUBLIC: "PUBLIC",
};

const userSchema = mongoose.Schema({
	first_name: { String },
	last_name: { String },
	email: { String },
	age: { Number },
	password: { String },
	role: { type: String, enum: Object.values(roleType) },
	cart: {type:[{ref: 'Cart'}]}
});

const userModel = mongoose.model(collection, userSchema);
module.exports = userModel;