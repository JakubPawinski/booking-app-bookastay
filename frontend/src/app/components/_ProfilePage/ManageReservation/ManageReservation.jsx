import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import './ManageReservation.scss';
import { ENDPOINTS } from '@/config';
import axios from 'axios';
import { values } from 'lodash';

const StatusSchema = Yup.object().shape({
	status: Yup.string()
		.required('Status is required')
		.oneOf(['pending', 'confirmed', 'cancelled']),
});

export default function ManageReservation({ reservation, onChat }) {
	const [status, setStatus] = useState(reservation.status);
	const [isConfirmed, setIsConfirmed] = useState(reservation.isConfirmed);
	const [isChangingStatus, setIsChangingStatus] = useState(false);

	const formatDate = (date) => {
		const newDate = new Date(date);
		return newDate.toDateString();
	};

	const handleStatusChange = async () => {
		setIsChangingStatus(!isChangingStatus);
	};
	const handleSubmit = async (value) => {
		// console.log('value', value);

		const data =
			value.status === 'pending'
				? { status: 'pending', isConfirmed: false }
				: { status: value.status, isConfirmed: true };
		console.log('data', data);

		try {
			const response = await axios.put(
				`${ENDPOINTS.RESERVATIONS}/${reservation._id}`,
				data,
				{
					withCredentials: true,
				}
			);
			console.log(response.data);

			setStatus(value.status);
			setIsChangingStatus(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		console.log('delete');

		try {
			const response = await axios.delete(
				`${ENDPOINTS.RESERVATIONS}/${reservation._id}`,
				{
					withCredentials: true,
				}
			);
			dispatchEvent(
				new CustomEvent('reservation-deleted', {
					detail: {
						reservationId: reservation._id,
					},
				})
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<li className='manage-reservation'>
			<div className='dates-section'>
				<p className='section-label'>Dates:</p>
				<p className='date-range'>
					{formatDate(reservation.startDate)}-{formatDate(reservation.endDate)}
				</p>
			</div>

			<div className='guests-section'>
				<p className='section-label'>Guests:</p>
				<p className='guest-amount'>{reservation.peopleAmount}</p>
			</div>

			<div className='status-section'>
				<p className='section-label'>Status:</p>
				<p className={`current-status ${status}`}>{status}</p>

				{isChangingStatus && (
					<Formik
						className='status-form'
						initialValues={{ status: status }}
						validationSchema={StatusSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, handleSubmit }) => (
							<Form>
								<div className='status-options'>
									<label className='radio-label'>
										<Field
											type='radio'
											name='status'
											value='pending'
											className='radio-input'
										/>
										<span className='radio-circle'></span>
										<span className='radio-text'>Pending</span>
									</label>

									<label className='radio-label'>
										<Field
											type='radio'
											name='status'
											value='confirmed'
											className='radio-input'
										/>
										<span className='radio-circle'></span>
										<span className='radio-text'>Confirmed</span>
									</label>

									<label className='radio-label'>
										<Field
											type='radio'
											name='status'
											value='cancelled'
											className='radio-input'
										/>
										<span className='radio-circle'></span>
										<span className='radio-text'>Cancelled</span>
									</label>
								</div>
								<ErrorMessage
									name='status'
									component='div'
									className='error-message'
								/>

								<div className='form-buttons'>
									<button
										type='submit'
										className='status-selector-btn'
										disabled={isSubmitting}
									>
										Save
									</button>
									<button
										type='button'
										className='status-selector-btn cancel'
										onClick={handleStatusChange}
									>
										Cancel
									</button>
								</div>
							</Form>
						)}
					</Formik>
				)}
				{!isChangingStatus && (
					<button
						className='status-selector-btn'
						onClick={() => {
							handleStatusChange();
						}}
					>
						Change status
					</button>
				)}
				{status === 'cancelled' && (
					<button
						className='status-selector-btn delete-btn'
						onClick={handleDelete}
					>
						Delete
					</button>
				)}

				<button className='chat-button status-selector-btn' onClick={onChat}>
					Chat with guest
				</button>
			</div>
		</li>
	);
}
