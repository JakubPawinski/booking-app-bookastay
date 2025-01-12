'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading/Loading.jsx';
import Calendar from '@/app/components/Calendar/Calendar';

export default function AccomodationPage({ params }) {
	const [accomodation, setAccomodation] = useState(null);

	useEffect(() => {
		try {
			const fetchAccomodation = async () => {
				const response = await axios.get(
					`http://localhost:4000/api/houses/${params.id}`
				);
				console.log(response.data.location.city);

				setAccomodation(response.data);
			};
			fetchAccomodation();
		} catch (error) {
			console.error(error);
		}
	}, []);

	if (!accomodation) return <Loading />;

	accomodation.capacity = 6;

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
					<Calendar />
				</div>
				<div className='accomodation-page-reservation'>
					<h3>
						<p>{}450zł</p>
						<p>night</p>
					</h3>
					<form className='accomodation-page-reservation-form'>
						<div>
							<input type='date' id='startDate' name='startDate' />
							<input type='date' id='endDate' name='endDate' />
							<label>Guests</label>
							<select id='peopleAmount' name='peopleAmount'>
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
