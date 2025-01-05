import House from '../models/house.model.js';

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
	try {
		const { id } = req.params;

		const house = await House.findByIdAndUpdate(id, req.body);
		if (!house) {
			return res.status(404).json({ message: 'House not found' });
		}

		const updatedHouse = House.findById(id);
		res.status(200).json(updatedHouse);
	} catch (error) {
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
export { getHouses, getHouseById, updateHouse, addHouse, deleteHouse };
