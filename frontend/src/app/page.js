'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Accomodation from './components/_MainPage/Accomodation/Accomodation';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/Loading/Loading.jsx';

export default function HomePage() {
	const [accomodations, setAccomodations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			const fetchAccomodations = async () => {
				const response = await axios.get('http://localhost:4000/api/houses');
				// console.log(response);

				setAccomodations(response.data);
				setIsLoading(false);
			};

			fetchAccomodations();
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handleSearch = (data) => {
		setAccomodations(data);
	};
	return (
		<div className='home-page'>
			<div className='home-page-content'>
				{isLoading ? (
					<Loading />
				) : (
					<div>
						<SearchBar onSearch={handleSearch} />
						<ul>
							{accomodations.map((accomodation) => (
								<Accomodation
									key={accomodation._id}
									accomodation={accomodation}
								/>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
