import './Reviews.scss';
import Review from '../Review/Review';
import ReviewForm from '../ReviewForm/ReviewForm';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { ENDPOINTS } from '@/config';

export default function Reviews({ accomodation, userId }) {
	const [socket, setSocket] = useState(null);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const newSocket = io('http://localhost:4000', {
			withCredentials: true,
		});
		setSocket(newSocket);

		if (accomodation) {
			newSocket.emit('joinHouseRoom', accomodation._id);
		}
	}, []);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get(
					`${ENDPOINTS.REVIEWS}/${accomodation._id}`
				);
				setReviews(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchReviews();
		return () => {};
	}, []);

	useEffect(() => {
		console.log('socket:', socket);
		if (!socket) return;

		socket.on('receiveReview', (rev) => {
			setReviews((prev) => [...prev, rev]);
		});

		return () => socket.off('receiveReview');
	}, [socket]);

	const sendReview = (review) => {
		if (!socket || !userId) {
			alert('You need to be logged in to leave a review');
			return;
		}

		const newReview = {
			...review,
			userId: userId,
		};

		socket.emit('sendReview', newReview);
		// setReviews((prev) => [...prev, newReview]);
	};
	return (
		<div className='reviews-component'>
			<h2>Reviews</h2>
			<div className='reviews-component-reviews'>
				{reviews.map((review, index) => (
					<Review key={review._id || index} review={review} />
				))}
			</div>
			<ReviewForm houseId={accomodation._id} handleSubmit={sendReview} />
		</div>
	);
}
