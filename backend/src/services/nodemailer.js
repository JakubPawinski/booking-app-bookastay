import nodemailer from 'nodemailer';
import mqtt from 'mqtt';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const sendEmail = async (reservation) => {
	// console.log('reservation    ', reservation);
	const guestId = reservation.guestId;
	// console.log('guestId:', guestId);

	const receiver = await axios
		.get(`http://localhost:4000/api/users/id/${reservation.guestId}`)
		.then((response) => {
			return {
				email: response.data.email,
				name: response.data.firstName,
				lastName: response.data.lastName,
			};
		})
		.catch((error) => {
			console.log('Error fetching user:', error);
		});
	const houseName = await axios
		.get(`http://localhost:4000/api/houses/${reservation.houseId}`)
		.then((response) => {
			return response.data.name;
		})
		.catch((error) => {
			console.log('Error fetching house:', error);
		});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com ',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});
	transporter.verify((error, success) => {
		if (error) {
			console.log('ERROR in SMTP configuration:', error);
		} else {
			console.log('SMTP is ready to take messages:', success);
		}
	});

	const messageSetup = {
		from: process.env.EMAIL_USER,
		to: receiver.email,
		subject: 'Booking Confirmation',
		text: `Dear ${`${receiver.name} ${receiver.lastName}`},\n\nThank you for your booking!\nHere are the details:\n\nHouse: ${houseName}\nStart Date: ${new Date(
			reservation.startDate
		).toDateString()}\nEnd Date: ${new Date(
			reservation.endDate
		).toDateString()}\nTotal Price: $${
			reservation.totalPrice
		}\nNumber of Guests: ${
			reservation.peopleAmount
		}\n\nYour booking status is currently: ${
			reservation.status
		}.\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nBooking Service`,
		html: `<p>Dear <strong>${`${receiver.name} ${receiver.lastName}`}</strong>,</p>
		           <p>Thank you for your booking! Here are the details:</p>
		           <ul>
		               <li><strong>House:</strong> ${houseName}</li>
		               <li><strong>Start Date:</strong> ${new Date(
											reservation.startDate
										).toDateString()}</li>
		               <li><strong>End Date:</strong> ${new Date(
											reservation.endDate
										).toDateString()}</li>
		               <li><strong>Total Price:</strong> $${reservation.totalPrice}</li>
		               <li><strong>Number of Guests:</strong> ${
											reservation.peopleAmount
										}</li>
		           </ul>
		           <p>Your booking status is currently: <strong>${
									reservation.status
								}</strong>.</p>
		           <p>If you have any questions, feel free to contact us.</p>
		           <p>Best regards,</p>
		           <p><strong>Booking Service</strong></p>`,
	};

	try {
		const response = await transporter.sendMail(messageSetup);
		console.log('Email sent:', response);
	} catch (error) {
		console.log('Error sending email:', error);
	}
};

export const initializeSMTPClient = () => {
	const client = mqtt.connect('ws://localhost:8000/mqtt');
	console.log('Initializing MQTT SMTP');
	client.on('connect', () => {
		console.log('Connected to MQTT broker');

		client.subscribe('reservations/confimation/');

		client.on('message', (topic, message) => {
			console.log('Received message on topic:', topic);
			console.log('Message:', message.toString());

			const reservation = JSON.parse(message.toString());
			sendEmail(reservation.data);
		});
	});
};
