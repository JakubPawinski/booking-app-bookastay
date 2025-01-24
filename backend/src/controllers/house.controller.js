import House from '../models/house.model.js';

import { getPrice } from '../utils/house.util.js';

const getHouses = async (req, res) => {
	// Add filters to the query
	try {
		const houses = await House.find({});
		res.status(200).json(houses);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getHouseById = async (req, res) => {
	try {
		const { id } = req.params;
		const house = await House.findById(id);

		if (!house) {
			return res.status(404).json({ message: 'House not found' });
		}

		res.status(200).json(house);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateHouse = async (req, res) => {
	// console.log('update house');

	try {
		const { id } = req.params;
		// console.log(id);

		const house = await House.findByIdAndUpdate(id, req.body);
		// console.log(house);

		if (!house) {
			return res.status(404).json({ message: 'House not found' });
		}

		const updatedHouse = await House.findById(id);
		// console.log(updatedHouse);

		res.status(200).json(updatedHouse);
	} catch (error) {
		// console.log('error');

		res.status(404).json({ message: error.message });
	}
};

const addHouse = async (req, res) => {
	try {
		const house = await House.create(req.body);
		res.status(201).json(house);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteHouse = async (req, res) => {
	try {
		const { id } = req.params;
		const house = await House.findByIdAndDelete(id);

		if (!house) {
			return res.status(404).json({ message: 'House not found' });
		}

		res.status(200).json({ message: 'House deleted successfully' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const calculatePrice = async (req, res) => {
	const { houseId } = req.params;

	const { startDate, endDate } = req.body;

	// console.log('Calculating price'););

	try {
		const house = await House.findById(houseId);

		if (!house) {
			return res.status(404).json({ message: 'House not found' });
		}
		const price = getPrice(house.pricePerNight, startDate, endDate);

		return res.status(200).json({ price: price });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getHousesByOwnerId = async (req, res) => {
	const { ownerId } = req.params;

	try {
		const houses = await House.find({ ownerID: ownerId });

		res.status(200).json(houses);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getHousesBySearch = async (req, res) => {
	console.log('Search houses');
	const { name } = req.body;
	try {
		const houses = await House.find({
			name: { $regex: name, $options: 'i' },
		});
		res.status(200).json(houses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export {
	getHouses,
	getHouseById,
	updateHouse,
	addHouse,
	deleteHouse,
	calculatePrice,
	getHousesByOwnerId,
	getHousesBySearch,
};
