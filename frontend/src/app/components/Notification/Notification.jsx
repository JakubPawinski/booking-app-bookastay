'use client';
import './Notification.scss';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { ENDPOINTS } from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Notification() {
	const [message, setMessage] = useState(null);
	const [userId, setUserId] = useState(null);
	const [accomodations, setAccomodations] = useState([]);
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const user = jwtDecode(token);
			console.log('user:', user);
			setUserId(user.id);

			const fetchAccomodations = async () => {
				try {
					const response = await axios.get(
						`${ENDPOINTS.HOUSES}/owner/${user.id}`,
						{
							withCredentials: true,
						}
					);

					setAccomodations(response.data);
					console.log('Accomodations:', response.data);
				} catch (error) {
					console.error('Error fetching accomodations:', error);
				}
			};
			fetchAccomodations();
		}
	}, []);

	useEffect(() => {
		const client = mqtt.connect('ws://localhost:8000/mqtt');

		client.on('connect', () => {
			console.log('Connected to MQTT broker');
			accomodations.forEach((accomodation) => {
				const topic = `reservations/${accomodation._id}`;
				console.log('Subscribing to:', topic);
				client.subscribe(`reservations/${accomodation._id}`);
				setTopics((prev) => [...prev, topic]);
			});
		});

		client.on('message', (topic, message) => {
			// console.log('Received message not if on topic:', topic);
			// console.log('Message not if:', message.toString());

			if (topics.includes(topic)) {
				// console.log('Received message on topic:', topic);
				// console.log('Message:', message.toString());
				const parsedMSG = JSON.parse(message.toString());
				// console.log('Message:', parsedMSG);
				setMessage(parsedMSG.data);
			}

			setTimeout(() => {
				setMessage(null);
			}, 5000);
		});
		return () => {};
	}, [accomodations]);

	if (!message) return null;

	return (
		<div className={`notification ${message ? 'show' : 'hide'}`}>
			<div>{message}</div>
		</div>
	);
}
