import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';

export default function ManageReservation({ reservation }) {
	const [status, setStatus] = useState(reservation.status);
	const [isConfirmed, setIsConfirmed] = useState(reservation.isConfirmed);
	const [isChangingStatus, setIsChangingStatus] = useState(false);
	const formatDate = (date) => {
		const newDate = new Date(date);
		return newDate.toDateString();
	};

	const handleStatusChange = async (newStatus) => {
		setIsChangingStatus(!isChangingStatus);
	};
	return (
		<li>
			<div>
				<p>Dates:</p>
				<p>
					{formatDate(reservation.startDate)}-${formatDate(reservation.endDate)}
				</p>
			</div>
			<div>
				<p>Guests:</p>
				<p>{reservation.peopleAmount}</p>
			</div>
			<div>
				<p>Status:</p>
				<p>{status}</p>

				{isChangingStatus && (
					<Formik>
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
									Pending
								</label>

								<label className='radio-label'>
									<Field
										type='radio'
										name='status'
										value='confirmed'
										className='radio-input'
									/>
									<span className='radio-circle'></span>
									Confirmed
								</label>

								<label className='radio-label'>
									<Field
										type='radio'
										name='status'
										value='cancelled'
										className='radio-input'
									/>
									<span className='radio-circle'></span>
									Cancelled
								</label>
							</div>
						</Form>
					</Formik>
				)}
				<button className='status-selector' onClick={handleStatusChange}>
					Change status
				</button>
			</div>
		</li>
	);
}
