import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
	houseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'House',
		required: true,
	},
	guestId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	totalPrice: { type: Number, required: true },
	isConfirmed: { type: Boolean, default: false },
	peopleAmount: { type: Number, required: true },
	status: { type: String, default: 'pending' },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
