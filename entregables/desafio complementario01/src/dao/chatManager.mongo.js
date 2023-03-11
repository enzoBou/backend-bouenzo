const messageModel = require('./models/message.model');

class Message {
	addMessage = async (user, message) => {
		await messageModel.create({ user, message });
	};
	getMessages = async () => {
		const messages = await messageModel.find({}).lean();
		return messages;
	};
}

module.exports = Message;