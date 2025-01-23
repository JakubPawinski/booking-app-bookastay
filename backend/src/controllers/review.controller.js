import Review from '../models/review.model.js';

const getReviewsByHouseId = async (req, res) => {
	const { houseId } = req.params;
	try {
		const reviews = await Review.find({ houseId });
		res.status(200).json(reviews);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { getReviewsByHouseId };
