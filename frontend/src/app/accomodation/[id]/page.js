'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading/Loading.jsx';
import Calendar from '@/app/components/Calendar/Calendar';

export default function AccomodationPage({ params }) {
	const [accomodation, setAccomodation] = useState(null);
	const [selectedDates, setSelectedDates] = useState({
		startDate: null,
		endDate: null,
	});
	const [guests, setGuests] = useState();

	useEffect(() => {
		try {
			const fetchAccomodation = async () => {
				const response = await axios.get(
					`http://localhost:4000/api/houses/${params.id}`
				);
				// console.log(response.data);

				setAccomodation(response.data);
			};
			fetchAccomodation();
		} catch (error) {
			console.error(error);
		}
	}, []);

	const formatDate = (date) => {
		if (!date) return null;

		const localDate = new Date(date);
		const year = localDate.getFullYear();
		const month = String(localDate.getMonth() + 1).padStart(2, '0');
		const day = String(localDate.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	};

	if (!accomodation) return <Loading />;

	accomodation.capacity = 6;

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(e);

		console.log('Submit reservation');
	};

	return (
		<div className='accomodation-page'>
			<h1>{accomodation.name}</h1>
			<div className='accomodation-page-images'>
				<div className='accomodation-page-main-image image'></div>
				<div className='accomodation-page-image image'></div>
				<div className='accomodation-page-image image'></div>
				<div className='accomodation-page-image image'></div>
				<div className='accomodation-page-image image'></div>
			</div>
			<div className='accomodation-page-details'>
				<div className='accomodation-page-description'>
					<h2 className='accomodation-page-describtion-name'>
						{accomodation.name}
					</h2>
					<div className='accomodation-page-description-capacity'>
						{accomodation.capacity} guests
					</div>
					<div className='accomodation-page-description-location'>
						{accomodation.location.city}, {accomodation.location.country}
					</div>
					<div className='accomodation-page-describtion-content'>
						{accomodation.description}
					</div>
					<Calendar
						houseId={accomodation._id}
						onChange={setSelectedDates}
						value={selectedDates}
					/>
				</div>
				<div className='accomodation-page-reservation'>
					<h3>
						<p>{}450zł</p>
						<p>night</p>
					</h3>
					<form
						className='accomodation-page-reservation-form'
						onSubmit={handleSubmit}
					>
						<div>
							<input
								type='date'
								id='startDate'
								name='startDate'
								value={formatDate(selectedDates.startDate) || ''}
								readOnly
								disabled
								required
							/>
							<input
								type='date'
								id='endDate'
								name='endDate'
								value={formatDate(selectedDates.endDate) || ''}
								readOnly
								disabled
								required
							/>
							<label>Guests</label>
							<select
								id='peopleAmount'
								name='peopleAmount'
								value={guests}
								onChange={(e) => setGuests(e.target.value)}
							>
								{new Array(accomodation.capacity).fill(0).map((el, index) => (
									<option key={index} value={index + 1}>
										{index + 1}
									</option>
								))}
							</select>
						</div>
						<button type='submit'>Reserve</button>
					</form>
					<div className='accomodation-page-reservation-price'>
						<p>Total</p>
						<p>4500zł</p>
					</div>
				</div>
			</div>
		</div>
	);
}
