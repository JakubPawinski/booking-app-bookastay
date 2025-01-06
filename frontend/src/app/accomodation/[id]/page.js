'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AccomodationPage({ params }) {
	const [accomodation, setAccomodation] = useState({});

	useEffect(() => {
		try {
			const fetchAccomodation = async () => {
				const response = await axios.get(
					`http://localhost:4000/api/houses/${params.id}`
				);
				setAccomodation(response.data);
			};
			fetchAccomodation();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<div className='accomodation-page'>
			<div className='accomodation-page-content'>
				<h1>{accomodation.name}</h1>
				<p>Accomodation details</p>
			</div>
		</div>
	);
}
