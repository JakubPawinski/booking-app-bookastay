import express from 'express';
import {
	getUsers,
	getUserById,
	getUserByEmail,
	updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/id/:id', getUserById);

router.get('/email/:email', getUserByEmail);

router.put('/:id', updateUser);

export default router;
