import './Calendar.scss';
import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '@/config';

export default function Calendar({ reservationID }) {
	const [selectedDateFirst, setSelectedDateFirst] = useState(new Date());

	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const getReservations = () => {
		try {
			const reservations = axios.get(
				`${ENDPOINTS.RESERVATIONS}${reservationID}`
			);
			console.log(reservations);
		} catch (error) {
			console.error(error);
		}
	};

	const months = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December',
	};

	const renderDays = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
			<td key={`empty-${i}`} className='empty-day'></td>
		));

		const monthDays = Array.from({ length: daysInMonth }, (_, i) => (
			<td
				key={`day-${i + 1}`}
				className={`calendar-day ${
					selectedDateFirst.getDate() === i + 1 ? 'selected' : ''
				}`}
				onClick={() => setSelectedDateFirst(new Date(year, month, i + 1))}
			>
				{i + 1}
			</td>
		));
		const allDays = [...emptyDays, ...monthDays];

		// Dzielenie na tygodnie
		const weeks = Array.from(
			{ length: Math.ceil(allDays.length / 7) },
			(_, i) => <tr key={`week-${i}`}>{allDays.slice(i * 7, (i + 1) * 7)}</tr>
		);
		return (
			<table>
				<tbody>{weeks}</tbody>
			</table>
		);
	};

	const changeMonth = (value) => {
		const newDate = new Date(selectedMonth);
		newDate.setMonth(newDate.getMonth() + value);
		setSelectedMonth(newDate);
	};

	const renderCalendar = (date) => (
		<div className='calendar-month'>
			<div className='calendar-header'>
				<h3 className='calendar-month-name'>
					<p>{months[date.getMonth()]}</p>
					<p>{date.getFullYear()}</p>
				</h3>
				<table className='calendar-days-names'>
					<tr>
						<td>Sun</td>
						<td>Mon</td>
						<td>Tue</td>
						<td>Wed</td>
						<td>Thu</td>
						<td>Fri</td>
						<td>Sat</td>
					</tr>
				</table>
			</div>
			<div className='calendar-days'>{renderDays(date)}</div>
		</div>
	);

	return (
		<div className='calendar-container'>
			<button className='nav-button prev' onClick={() => changeMonth(-1)}>
				{'<'}
			</button>
			<div className='calendars-wrapper'>{renderCalendar(selectedMonth)}</div>
			{/* <div className='calendars-wrapper'>{renderCalendar(selectedMonth)}</div> */}
			<button className='nav-button next' onClick={() => changeMonth(1)}>
				{'>'}
			</button>
		</div>
	);
}
