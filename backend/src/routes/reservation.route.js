import express from 'express';
import {
	getReservations,
    getReservationById,
	addReservation,
    updateReservation,
    deleteReservation,
    getReservationsByHouseId
} from '../controllers/reservation.controller.js';

const router = express.Router();

router.get('/', getReservations);

router.get('/:id', getReservationById);

router.put('/:id', updateReservation);

router.post('/', addReservation);

router.delete('/:id', deleteReservation);

router.get('/house/:houseId', getReservationsByHouseId);

export default router;
