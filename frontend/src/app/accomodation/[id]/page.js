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
				<div className='accomodation-page-reservation'></div>
				<div className='accomodation-page-description'>
					<p>{accomodation.name}</p>
					<p>
						{accomodation.location.city}, {accomodation.location.country}
					</p>
					<p>{accomodation.description}</p>
				</div>
			</div>
		</div>
	);
}
