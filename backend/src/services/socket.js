import Message from '../models/message.model.js';
import Review from '../models/review.model.js';

export const initializeSocket = (io) => {
	io.on('connection', (socket) => {
		console.log('New connection: ', socket.id);

		// Chat
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

		//Reviews
		socket.on('joinHouseRoom', async (houseId) => {
			socket.join(houseId);
			console.log(`${socket.id} joined house room:`, houseId);
		});
		socket.on('sendReview', async (data) => {
			try {
				const { comment, rating, houseId, userId } = data;

				if (!comment || !houseId || !userId || !rating) {
					throw new Error('Missing required review data');
				}
				const newReview = {
					comment: comment,
					rating: rating,
					userId: userId,
					houseId: houseId,
				};
				console.log('New review:', newReview);

				await Review.create(newReview);

				io.to(houseId).emit('receiveReview', newReview);
			} catch (error) {
				console.error('Error with sending review', error);
			}
		});
		socket.on('disconnect', () => {
			console.log('User disconnected', socket.id);
		});

	
	});
};
