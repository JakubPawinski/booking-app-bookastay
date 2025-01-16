import './Reservations.scss';
import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/config';
import Reservation from '../Reservation/Reservation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Reservations() {
	const [userId, setUserId] = useState(null);
	const [reservations, setReservations] = useState([]);

	useEffect(() => {
		const token = Cookies.get('token');
		const decodedToken = jwtDecode(token);
		// console.log(decodedToken.id);

		setUserId(decodedToken.id);
	}, []);
	useEffect(() => {
		const fetchReservations = async () => {
			try {
				// console.log(`${ENDPOINTS.RESERVATIONS}/user/${userId}`);

				if (!userId) {
					return;
				}
				const response = await axios.get(
					`${ENDPOINTS.RESERVATIONS}/user/${userId}`
				);
				// console.log(response.data);
				setReservations(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchReservations();
	}, [userId]);

	return (
		<div className='profile-page-reservations'>
			<div className='profile-page-header'>
				<h3>Your reservations</h3>
				<div className='section-describtion'>
					Here you can see all your reservations and manage them
				</div>
			</div>
			<ul className='profile-page-reservations-list'>
				{reservations
					.sort((res) => res.startDate)
					.map((reservation) => (
						<Reservation key={reservation._id} reservation={reservation} />
					))}
			</ul>
		</div>
	);
}
