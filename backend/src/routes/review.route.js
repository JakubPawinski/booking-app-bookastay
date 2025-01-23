import express from 'express';
import { getReviewsByHouseId } from '../controllers/review.controller.js';

const router = express.Router();

router.get('/:houseId', getReviewsByHouseId);

export default router;