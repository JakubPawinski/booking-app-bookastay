import User from '../models/user.model.js';
import { findUserByEmail, findUserById } from '../utils/user.util.js';

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await findUserById(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getUserByEmail = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { getUsers, getUserByEmail, getUserById };
