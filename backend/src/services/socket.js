import Message from '../models/message.model.js';

export const initializeSocket = (io) => {
	io.on('connection', (socket) => {
		console.log('New connection: ', socket.id);

		socket.on('joinRoom', async (reservationId) => {
			socket.join(reservationId);
			console.log(`${socket.id} joined room:`, reservationId);
		});
		socket.on('sendMessage', async (data) => {
			try {
				const { text, reservationId, sender } = data;

				if (!text || !reservationId || !sender) {
					throw new Error('Missing required message data');
				}
				const newMessage = {
					text: text,
					sender: sender,
					timestamp: new Date(),
					reservationId: reservationId,
				};
				console.log('New message:', newMessage);

				await Message.create(newMessage);

				io.to(reservationId).emit('receiveMessage', newMessage);
			} catch (error) {
				console.error('Error with sending message', error);
			}
		});
		socket.on('disconnect', () => {
			console.log('User disconnected', socket.id);
		});
	});
};
