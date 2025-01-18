import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
	reservationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reservation',
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Message', messageSchema);
