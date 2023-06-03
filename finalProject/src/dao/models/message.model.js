import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	user: {String},
	message: {String}
});

const messageModel = mongoose.model('Messages', messageSchema);

export default {messageModel}