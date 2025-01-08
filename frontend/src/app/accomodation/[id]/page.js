'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading/Loading.jsx';

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
				</div>
				<div className='accomodation-page-reservation'>
					<form className='accomodation-page-reservation-form'>
						<input type='date' />
						<input type='date' />
						<label>Guests</label>
						<select>
							{new Array(accomodation.capacity).fill(0).map((el, index) => (
								<option key={index} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>
						<button type='submit'>Reserve</button>
					</form>
				</div>
			</div>
		</div>
	);
}
