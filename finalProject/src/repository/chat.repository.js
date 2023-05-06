import messageModel from '../dao/models/message.model.js'

export default class MessageServiceDao {
	addMessage = async (user, message) => {
		await messageModel.create({ user, message });
	};
	getMessages = async () => {
		const messages = await messageModel.find({}).lean();
		return messages;
	};
};