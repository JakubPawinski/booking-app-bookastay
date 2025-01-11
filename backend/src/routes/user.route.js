import express from 'express';
import {
	getUsers,
	getUserById,
	getUserByEmail,
	updateUser,
} from '../controllers/user.controller.js';
import { userVerification } from '../middlewares/userVerification.middleware.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/id/:id', getUserById);

router.get('/email/:email', getUserByEmail);

router.put('/:id', userVerification, updateUser);

export default router;
