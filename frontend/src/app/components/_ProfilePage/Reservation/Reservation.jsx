import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/config';
import axios from 'axios';
import Link from 'next/link';
import Chat from '@/app/components/Chat/Chat';

export default function Reservation({ reservation }) {
	const [accomodation, setAccomodation] = useState(null);
	const [showMore, setShowMore] = useState(false);
	const [isChatActive, setIsChatActive] = useState(false);

	const formatDate = (date) => {
		const newDate = new Date(date);
		return newDate.toDateString();
	};

	useEffect(() => {
		const fetchAccomodation = async () => {
			try {
				const response = await axios.get(
					`${ENDPOINTS.HOUSES}/${reservation.houseId}`
				);
				setAccomodation(response.data);
			} catch (error) {
				// console.log(error);
			}
		};
		fetchAccomodation();
	}, []);

	const handleClick = () => {
		setShowMore(!showMore);
		// console.log(reservation);
	};
	const handleCancel = () => {
		console.log('cancel reservation');
		const cancelReservation = async () => {
			try {
				const response = await axios.put(
					`${ENDPOINTS.RESERVATIONS}/${reservation._id}`,
					{
						status: 'cancelled',
					}
				);
				console.log(response.data);
				alert('Reservation cancelled');
			} catch (error) {
				console.log(error);
			}
		};
		cancelReservation();
	};

	return (
		<li className='reservation-page-reservation'>
			<div className='reservation-page-reservation-name'>
				<Link href={`/accomodation/${reservation.houseId}`}>
					{accomodation?.name}
				</Link>
			</div>
			<div className='reservation-page-reservation-info-content'>
				{!showMore ? (
					<div className='reservation-page-reservation-info-default'>
						<div className='reservation-page-reservation-info-dates'>
							{formatDate(reservation.startDate)} -{' '}
							{formatDate(reservation.endDate)}
						</div>
						<button onClick={handleClick}>Show more</button>
					</div>
				) : (
					<div className='reservation-page-reservation-info-expanded'>
						<div className='reservation-page-reservation-info-dates info'>
							<p>Your stay:</p>
							<p>
								{formatDate(reservation.startDate)} -{' '}
								{formatDate(reservation.endDate)}
							</p>
						</div>
						<div className='reservation-page-reservation-price info'>
							<p>Price:</p>
							<p>{reservation.totalPrice} pln</p>
						</div>
						<div className='reservation-page-reservation-addres info'>
							<p>Address:</p>
							<p>{`${accomodation.location.address}, ${accomodation.location.city}, ${accomodation.location.country}`}</p>
						</div>
						<div className='reservation-page-reservation-guests-amount info'>
							<p>Guests:</p>
							<p>{reservation.peopleAmount}</p>
						</div>
						<div className='reservation-page-reservation-status info'>
							<p>Status:</p>
							{reservation.status === 'pending' ? (
								<p
									className={
										reservation.isConfirmed ? 'confirmed' : 'unconfirmed'
									}
								>
									{reservation.isConfirmed ? 'Confirmed' : 'Unconfirmed'}
								</p>
							) : (
								<p className='status'>{reservation.status}</p>
							)}
						</div>

						<button onClick={handleClick} className='click-button'>
							Show less
						</button>
						{reservation.status !== 'cancelled' && (
							<button onClick={handleCancel} className='cancel-button'>
								{' '}
								Cancel reservation
							</button>
						)}

						<button
							className='chat-button '
							onClick={() => setIsChatActive(true)}
						>
							Chat with host
						</button>
						{isChatActive && (
							<Chat
								onClose={() => setIsChatActive(false)}
								reservationId={reservation._id}
							/>
						)}
					</div>
				)}
			</div>
		</li>
	);
}
