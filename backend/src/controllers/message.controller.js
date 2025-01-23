import Message from '../models/message.model.js';

const getMessagesByReservationId = async (req, res) => {
	try {
		const { reservationId } = req.params;
		const messages = await Message.find({ reservationId: reservationId });

		res.status(200).json(messages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const message = await Message.findByIdAndDelete(id);

		if (!message) {
			return res.status(404).json({ message: 'Message not found' });
		}
		res.status(200).json({ message: 'Message deleted' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const message = await Message.findByIdAndUpdate(id, req.body);

		if (!message) {
			return res.status(404).json({ message: 'Message not found' });
		}
		const updatedMessage = await Message.findById(id);
		res.status(200).json(updatedMessage);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export { getMessagesByReservationId, deleteMessage, updateMessage };
