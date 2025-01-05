import express from 'express';
import {
	getReservations,
    getReservationById,
	addReservation,
    updateReservation,
    deleteReservation
} from '../controllers/reservation.controller.js';

const router = express.Router();

router.get('/', getReservations);

router.get('/:id', getReservationById);

router.put('/:id', updateReservation);

router.post('/', addReservation);

router.delete('/:id', deleteReservation);

export default router;
