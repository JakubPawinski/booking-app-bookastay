import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import { findUserByEmail } from '../utils/user.util.js';

dotenv.config();

const saltRounds = 10;

const login = async (req, res) => {
	const { email, password } = req.body;
	// console.log('login endpoint');

	try {
		const user = await findUserByEmail(email);
		// console.log(user);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		// console.log(isPasswordCorrect);

		// console.log(process.env.JWT_SECRET_KEY);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid password' });
		} else {
			const token = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: '24h',
				}
			);
			// console.log('token' + token);

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
	// console.log('register endpoint');

	try {
		const { firstName, lastName, email, password, phone, role } = req.body;
		// console.log(await findUserByEmail(email));

		if (await findUserByEmail(email)) {
			// console.log('User already exists');
			return res.status(400).json({ message: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phone,
			role,
		});
		res.status(201).json({ message: 'Acount created', user: { ...user } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { login, register };
