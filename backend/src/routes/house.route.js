import express from 'express';
import {
	getHouses,
	getHouseById,
	updateHouse,
	addHouse,
	deleteHouse,
	calculatePrice,
} from '../controllers/house.controller.js';

import { ownerVerification } from '../middlewares/userVerification.middleware.js';

const router = express.Router();

router.get('/', getHouses);

router.get('/:id', getHouseById);

router.put('/:id', ownerVerification, updateHouse);

router.post('/', ownerVerification, addHouse);

router.delete('/:id', ownerVerification, deleteHouse);

router.post('/price/:houseId', calculatePrice);

export default router;
