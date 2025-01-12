import User from '../models/user.model.js';
import House from '../models/house.model.js';
import Reservation from '../models/reservation.model.js';
import { findUserByEmail, findUserById } from '../utils/user.util.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getUsers = async (req, res) => {
	console.log('get users');

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
		const user = await findUserById(id.trim());

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);

		res.status(404).json({ message: error.message });
	}
};

const getUserByEmail = async (req, res) => {
	console.log('get user by email');

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

const updateUser = async (req, res) => {
	// console.log('update user');

	const { id } = req.params;
	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (req.body.password && req.body.oldPassword) {
			const isOldPasswordCorrect = await bcrypt.compare(
				req.body.oldPassword,
				user.password
			);

			if (!isOldPasswordCorrect) {
				return res.status(400).json({ message: 'Incorrect password' });
			}
			const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
			user.password = hashedPassword;
			await user.save();

			res.clearCookie('token');

			return res.status(200).json({ message: 'Password updated successfully' });
		} else {
			const user = await User.findByIdAndUpdate(id, req.body);
			res.status(200).json({ message: 'User updated successfully' });
		}
		// console.log(user);

		// const token = jwt.sign(
		// 	{
		// 		firstName: user.firstName,
		// 		lastName: user.lastName,
		// 		email: user.email,
		// 		id: user._id,
		// 		role: user.role,
		// 	},
		// 	process.env.JWT_SECRET_KEY,
		// 	{ expiresIn: '24h' }
		// );

		// res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await House.deleteMany({ ownerId: id });
		await Reservation.deleteMany({ userId: id });
		await user.deleteOne();

		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export { getUsers, getUserByEmail, getUserById, updateUser, deleteUser };
