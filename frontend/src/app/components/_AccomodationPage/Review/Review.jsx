import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '@/config';
import './Review.scss';

export default function Review({ review }) {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`${ENDPOINTS.USERS}/id/${review.userId}`
				);
				setUser(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUser();
	}, []);

	return (
		<div className='reviews-component-review'>
			<div>
				<p>
					<span>{user.firstName}</span>
					<span>{user.lastName}</span>
				</p>
				<p>{review.rating}/5</p>
			</div>
			<p>{review.comment}</p>
		</div>
	);
}
