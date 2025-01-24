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
	const [mqttClient, setMqttClient] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [accomodations, setAccomodations] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const user = jwtDecode(token);
			// console.log('user:', user);
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
					// console.log('Accomodations:', response.data);
				} catch (error) {
					console.error('Error fetching accomodations:', error);
				}
			};
			const fetchReservations = async () => {
				try {
					const response = await axios.get(
						`${ENDPOINTS.RESERVATIONS}/user/${user.id}`,
						{
							withCredentials: true,
						}
					);

					setReservations(response.data);
					// console.log('Reservations:', response.data);
				} catch (error) {
					console.error('Error fetching reservations:', error);
				}
			};
			fetchAccomodations();
			fetchReservations();
		}
	}, []);

	useEffect(() => {
		const client = mqtt.connect('ws://localhost:8000/mqtt');
		setMqttClient(client);

		client.on('connect', () => {
			console.log('Connected to MQTT broker');
			setIsConnected(true);
		});

		return () => {};
	}, []);

	useEffect(() => {
		if (!isConnected || !mqttClient) return;

		const newTopics = [];

		// Subscribe to accomodations
		accomodations.forEach((accomodation) => {
			const topic = `reservations/new/${accomodation._id}`;
			console.log('Subscribing to topic:', topic);
			mqttClient.subscribe(`${topic}`);
			newTopics.push(topic);
		});

		// Subscribe to reservations
		reservations.forEach((reservation) => {
			const topic = `reservations/user/${reservation._id}`;
			console.log('Subscribing to topic:', topic);
			mqttClient.subscribe(`${topic}`);
			newTopics.push(topic);
		});
		setTopics(newTopics);

		return () => {};
	}, [mqttClient, isConnected, accomodations, reservations]);

	useEffect(() => {
		if (!isConnected || !mqttClient) return;
		console.log('Topics updated:', topics);
		mqttClient.on('message', (topic, message) => {
			if (topics.includes(topic)) {
				console.log('Received message on topic:', topic);
				console.log('Message:', message.toString());
				const parsedMSG = JSON.parse(message.toString());
				setMessage(parsedMSG.data);
			}

			setTimeout(() => {
				setMessage(null);
			}, 5000);
		});
	}, [topics]);

	if (!message) return null;

	return (
		<div className={`notification ${message ? 'show' : 'hide'}`}>
			<div>{message}</div>
		</div>
	);
}
