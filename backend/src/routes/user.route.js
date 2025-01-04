import express from 'express';
import {
	getUsers,
	getUserById,
	getUserByEmail,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.get('/:email', getUserByEmail);

export default router;
