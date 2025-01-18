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

export { getMessagesByReservationId };
