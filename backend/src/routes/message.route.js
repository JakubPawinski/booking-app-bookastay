import express from 'express';
import { getMessagesByReservationId } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:reservationId', getMessagesByReservationId);

export default router;
