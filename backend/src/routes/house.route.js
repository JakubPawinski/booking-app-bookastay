import express from 'express';
import {
	getHouses,
	getHouseById,
	updateHouse,
	addHouse,
	deleteHouse,
	calculatePrice,
	getHousesByOwnerId,
	getHousesBySearch,
} from '../controllers/house.controller.js';

import { ownerVerification } from '../middlewares/userVerification.middleware.js';

const router = express.Router();

router.get('/', getHouses);

router.get('/:id', getHouseById);

router.put('/:id', ownerVerification, updateHouse);

router.post('/', ownerVerification, addHouse);

router.delete('/:id', ownerVerification, deleteHouse);

router.post('/price/:houseId', calculatePrice);

router.get('/owner/:ownerId', ownerVerification, getHousesByOwnerId);

router.post('/search', getHousesBySearch);

export default router;
