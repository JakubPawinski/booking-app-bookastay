import User from '../models/user.model.js';
import { findUserByEmail } from '../services/user.service.js';

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'User logged in successfully' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
const register = async (req, res) => {
	const { firstName, lastName, email, password, phone, role } = req.body;
	try {
		if (await findUserByEmail(email)) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			phone,
			role,
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { login, register };
