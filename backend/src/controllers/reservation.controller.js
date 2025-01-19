import Reservation from '../models/reservation.model.js';
import { reservationNotification } from '../services/mqtt.js';

const getReservations = async (req, res) => {
	try {
		const reservations = await Reservation.find({});
		res.status(200).json(reservations);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getReservationById = async (req, res) => {
	try {
		const { id } = req.params;
		const reservation = await Reservation.findById(id);
		res.status(200).json(reservation);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getReservationsByHouseId = async (req, res) => {
	try {
		const { houseId } = req.params;
		const reservations = await Reservation.find({ houseId });
		res.status(200).json(reservations);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getReservationsByGuestId = async (req, res) => {
	// console.log('getReservationsByGuestId');

	try {
		const { guestId } = req.params;
		// console.log('guestId:', guestId);
		const reservations = await Reservation.find({ guestId });
		res.status(200).json(reservations);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateReservation = async (req, res) => {
	try {
		const { id } = req.params;
		const reservation = await Reservation.findByIdAndUpdate(id, req.body);
		if (!reservation) {
			return res.status(404).json({ message: 'Reservation not found' });
		}

		const updatedReservation = await Reservation.findById(id);
		res.status(200).json(updatedReservation);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const addReservation = async (req, res) => {
	try {
		const reservation = await Reservation.create(req.body);
		reservationNotification(reservation.houseId, reservation);
		res.status(201).json(reservation);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteReservation = async (req, res) => {
	try {
		const { id } = req.params;
		const reservation = await Reservation.findByIdAndDelete(id);
		if (!reservation) {
			return res.status(404).json({ message: 'Reservation not found' });
		}
		res.status(200).json({ message: 'Reservation deleted successfully' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export {
	getReservations,
	getReservationById,
	addReservation,
	updateReservation,
	deleteReservation,
	getReservationsByHouseId,
	getReservationsByGuestId as getReservationsByUserId,
};
