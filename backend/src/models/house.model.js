import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
	ownerID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	location: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		country: { type: String, required: true },
	},
	pricePerNight: {
		low: { type: Number },
		medium: { type: Number },
		high: { type: Number },
	},
	availability: [
		{
			startDate: { type: Date, required: true },
			endDate: { type: Date, required: true },
			isAvailable: { type: Boolean, default: true },
		},
	],
});

//images
//reviews

const House = mongoose.model('House', houseSchema);
export default House;
