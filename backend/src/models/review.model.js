import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	houseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'House',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
