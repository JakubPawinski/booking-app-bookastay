import express from 'express';
import { getMessagesByReservationId, deleteMessage, updateMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:reservationId', getMessagesByReservationId);

router.delete('/:id', deleteMessage);

router.put('/:id', updateMessage);

export default router;
