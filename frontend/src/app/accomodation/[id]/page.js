'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading/Loading.jsx';
import Calendar from '@/app/components/_AccomodationPage/Calendar/Calendar';
import Reviews from '@/app/components/_AccomodationPage/Reviews/Reviews';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { ENDPOINTS } from '@/config';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
// import { Socket } from 'socket.io';

export default function AccomodationPage({ params }) {
	const router = useRouter();
	const [refreshKey, setRefreshKey] = useState(0);
	const [userId, setUserId] = useState(null);
	const [accomodation, setAccomodation] = useState(null);
	const [selectedDates, setSelectedDates] = useState({
		startDate: null,
		endDate: null,
	});
	const [guests, setGuests] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);
	const [lowSeasonPrice, setLowSeasonPrice] = useState(0);

	//UseEffect for getting token
	useEffect(() => {
		const token = Cookies.get('token');

		if (token) {
			const decodedToken = jwtDecode(token);
			setUserId(decodedToken.id);
			// console.log(decodedToken);
		}
		// console.log(token);
	}, []);

	//UseEffect for fetching low season price
	useEffect(() => {
		const fetchLowSeasonPrice = async () => {
			try {
				const response = await axios.get(`${ENDPOINTS.HOUSES}/${params.id}`);
				// console.log(response.data);

				setLowSeasonPrice(response.data.pricePerNight.low);
			} catch (error) {
				console.error(error);
			}
		};
		fetchLowSeasonPrice();
	}, []);

	//UseEffect for fetching total price
	useEffect(() => {
		const fetchPrice = async () => {
			if (!selectedDates.startDate || !selectedDates.endDate) {
				// console.log('No dates selected');
				return;
			}
			try {
				// console.log(selectedDates);

				// console.log('URL:', `${ENDPOINTS.HOUSES}/price/${params.id}`);
				const response = await axios.post(
					`${ENDPOINTS.HOUSES}/price/${params.id}`,
					{
						startDate: selectedDates.startDate,
						endDate: selectedDates.endDate,
					},
					{ withCredentials: true }
				);
				setTotalPrice(response.data.price);
				// console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPrice();
	}, [selectedDates]);

	// UseEffect for fetching accomodation
	useEffect(() => {
		console.log('UseEffect for fetching accomodation');

		try {
			const fetchAccomodation = async () => {
				const response = await axios.get(
					`http://localhost:4000/api/houses/${params.id}`
				);
				console.log(response.data);

				setAccomodation(response.data);
			};
			fetchAccomodation();
		} catch (error) {
			console.error(error);
		}
	}, []);

	// Socket for updating reservations
	const socket = io('http://localhost:4000');
	useEffect(() => {
		if (!accomodation) return;
		socket.on('connect', () => {
			console.log('Connected to server');

			socket.emit('joinHouseRoom', accomodation._id);
		});

		socket.on('error', (error) => {
			console.error('Socket error:', error);
		});

		return () => {
			socket.disconnect();
		};
	}, [accomodation]);

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
		if (!userId) {
			alert('You need to be logged in to make a reservation');
			router.push('/auth');
			return;
		}
		if (!selectedDates.startDate || !selectedDates.endDate) {
			alert('Select dates');
			return;
		}
		e.preventDefault();

		const reservationData = {
			houseId: accomodation._id,
			guestId: userId,
			startDate: selectedDates.startDate,
			endDate: selectedDates.endDate,
			totalPrice: totalPrice,
			isConfirmed: false,
			peopleAmount: guests,
		};

		try {
			const response = await axios
				.post(`${ENDPOINTS.RESERVATIONS}`, reservationData)
				.then((res) => {
					console.log(res);
				});
			setRefreshKey(refreshKey + 1);
			setSelectedDates({ startDate: null, endDate: null });

			socket.emit('sendNewReservation', {
				houseId: accomodation._id,
				startDate: reservationData.startDate,
				endDate: reservationData.endDate,
			});
		} catch (error) {
			console.error(error);
		}

		// console.log(reservationData);

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
					<div className='accomodation-page-description-header'>
						<h2 className='accomodation-page-describtion-name'>
							{accomodation.name}
						</h2>
						<div className='accomodation-page-description-capacity'>
							{accomodation.capacity} guests
						</div>
						<div className='accomodation-page-description-location'>
							{accomodation.location.city}, {accomodation.location.country}
						</div>
					</div>
					<div className='accomodation-page-describtion-content'>
						{accomodation.description}
					</div>
					<div className='accomodation-page-description-describtion'>
						<Calendar
							key={refreshKey}
							houseId={accomodation._id}
							onChange={setSelectedDates}
							value={selectedDates}
							availability={accomodation.availability}
						/>
					</div>
				</div>
				<div className='accomodation-page-reservation'>
					<h3>
						<p>{lowSeasonPrice} zł</p>
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
						<p>{totalPrice}zł</p>
					</div>
				</div>
			</div>
			<Reviews accomodation={accomodation} userId={userId} />
		</div>
	);
}
