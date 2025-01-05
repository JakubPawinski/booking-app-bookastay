import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { findUserByEmail } from '../utils/user.util.js';

const saltRounds = 10;

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid password' });
		} else {
			const token = jwt.sign(
				{ email: user.email, id: user._id, role: user.role },
				process.env.JWT_Secret_Key,
				{
					expiresIn: '24h',
				}
			);
			res.cookie('token', token, {
				maxAge: 24 * 60 * 60 * 1000,
			});

			return res.status(200).json({ message: 'User logged in successfully' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone, role } = req.body;

		if (!(await findUserByEmail(email))) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await User.create({
			firstName,
			lastName,
			email,
			hashedPassword,
			phone,
			role,
		});
		res.status(201).json({ message: 'Acount created', user: { ...user } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { login, register };
