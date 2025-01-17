import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '@/config';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AccomodationManager from '../AccomodationManager/AccomodationManager';
import './ManageAccomodation.scss';

export default function ManageAccomodation() {
	const [accomodations, setAccomodations] = useState([]);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const token = Cookies.get('token');
		const decodedToken = jwtDecode(token);
		// console.log(decodedToken.id);

		setUserId(decodedToken.id);
	}, []);

	useEffect(() => {
		const fetchAccomodations = async () => {
			try {
				if (!userId) {
					return;
				}
				const response = await axios.get(
					`${ENDPOINTS.HOUSES}/owner/${userId}`,
					{
						withCredentials: true,
					}
				);
				// console.log(response.data);
				setAccomodations(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAccomodations();
	}, [userId]);

	useEffect(() => {
		addEventListener('accomodation-deleted', (event) => {
			const { accomodationId } = event.detail;
			setAccomodations((prevAccomodations) =>
				prevAccomodations.filter(
					(accomodation) => accomodation._id !== accomodationId
				)
			);
		});
		return () => {
			removeEventListener('accomodation-deleted', () => {});
		};
	}, []);
	return (
		<div className='profile-page-manage-accomodation profile-page-component'>
			<div className='profile-page-manage-accomodation-header'>
				<h3>Manage your accomodations</h3>
				<div className='section-describtion'>
					Here you can see all your accomodations and manage them
				</div>
			</div>
			<ul className='profile-page-manage-accomodation-list'>
				{accomodations.map((accomodation) => (
					<AccomodationManager
						key={accomodation._id}
						accomodation={accomodation}
					/>
				))}
			</ul>
		</div>
	);
}
