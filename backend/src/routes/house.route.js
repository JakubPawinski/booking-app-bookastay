import express from 'express';
import {
	getHouses,
	getHouseById,
	updateHouse,
	addHouse,
	deleteHouse,
} from '../controllers/house.controller.js';

const router = express.Router();

router.get('/', getHouses);

router.get('/:id', getHouseById);

router.put('/:id', updateHouse);

router.post('/', addHouse);

router.delete('/:id', deleteHouse);

export default router;
