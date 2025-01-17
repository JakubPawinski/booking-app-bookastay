import Link from 'next/link';
import { useState, useEffect } from 'react';
import './AccomodationManager.scss';
import AccommodationForm from '../AccomodationForm/AccomodationForm';
import axios from 'axios';
import { ENDPOINTS } from '@/config';
import ManageReservation from '../ManageReservation/ManageReservation';

export default function AccomodationManager({ accomodation }) {
	const [accomodationData, setAccomodationData] = useState(accomodation);
	const [isManaging, setIsManaging] = useState(false);
	const [reservations, setReservations] = useState([]);

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const response = await axios.get(
					`${ENDPOINTS.RESERVATIONS}/house/${accomodation._id}`,
					{
						withCredentials: true,
					}
				);
				console.log(response.data);

				setReservations(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchReservations();
	}, []);

	// console.log(accomodation);

	const handleSubmit = async (values) => {
		try {
			const response = await axios.put(
				`${ENDPOINTS.HOUSES}/${accomodation._id}`,
				values,
				{
					withCredentials: true,
				}
			);
			setAccomodationData({ ...accomodationData, name: values.name });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		addEventListener('reservation-deleted', (event) => {
			console.log('reservation-deleted', event.reservationId);

			const { reservationId } = event.detail;
			setReservations((prevReservations) =>
				prevReservations.filter(
					(reservaation) => reservaation._id !== reservationId
				)
			);
		});
		return () => {
			removeEventListener('reservation-deleted', () => {});
		};
	}, []);

	return (
		<li className='profile-page-manage-accomodation-item'>
			<div className='profile-page-accomodation-name'>
				<Link href={`/accomodation/${accomodation._id}`}>
					{accomodationData.name}
				</Link>
			</div>
			<div className='profile-page-manage-accomodation-content'>
				{isManaging ? (
					<div className='profile-page-manage-accomodation'>
						<section className='profile-page-manage-accomodation-reservations'>
							<div className='profile-page-manage-accomodation-header'>
								<h4>Manage your reservations</h4>
								<div className='section-describtion'>
									Here you can see all your reservations and manage them
								</div>
							</div>

							<div className='profile-page-manage-accomodation-reservations-list'>
								<ul>
									{reservations
										.sort(
											(a, b) => new Date(a.startDate) - new Date(b.startDate)
										)
										.map((res) => (
											<ManageReservation reservation={res} key={res._id} />
										))}
								</ul>
							</div>
						</section>

						<section className='profile-page-manage-accomodation-update-form'>
							<div className='profile-page-manage-accomodation-header'>
								<h4>Update your accomodation</h4>
								<div className='section-describtion'>
									Here you can update your accomodation details
								</div>
							</div>
							<AccommodationForm
								initialValues={accomodation}
								onSubmit={handleSubmit}
							/>
						</section>
					</div>
				) : (
					<div className='profile-page-manage-accomodation-description'>
						Manage your accommodation details and view reservations
					</div>
				)}
				<button
					onClick={() => setIsManaging(!isManaging)}
					className='manage-button'
				>
					{isManaging ? 'Hide details' : 'Show details'}
				</button>
			</div>
		</li>
	);
}
