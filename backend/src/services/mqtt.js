import mqtt from 'mqtt';

const client = mqtt.connect('ws://localhost:8000/mqtt');
export const initializeMqtt = () => {
	console.log('Initializing MQTT');
	client.on('connect', () => {
		console.log('MQTT Connected');
	});

	client.on('message', (topic, message) => {
		console.log('Received message on topic:', topic);
		console.log('Message:', message.toString());
	});

	client.on('error', (err) => {
		console.error('MQTT Error:', err);
	});
};

export const reservationNotification = (houseId, reservation) => {
	const topic = `reservations/${houseId}`;
	const message = {
		type: 'new_reservation',
		data: `New reservation!`,
	};
	console.log('Publishing to topic:', topic);
	console.log('Message:', message);
	client.publish(topic, JSON.stringify(message));
};
