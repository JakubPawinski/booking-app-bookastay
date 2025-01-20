import './Calendar.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '@/config';
import { get } from 'lodash';

export default function Calendar({ houseId, onChange }) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [reservations, setReservations] = useState([]);
	const currentDate = new Date();

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const reservations = await axios.get(
					`${ENDPOINTS.RESERVATIONS}/house/${houseId}`
				);
				setReservations(reservations.data);
				// console.log(reservations.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchReservations();
	}, []);

	const isDateReserved = (date) => {
		return reservations.some((reservation) => {
			const start = new Date(reservation.startDate);
			const end = new Date(reservation.endDate);
			return date >= start && date <= end && reservation.status !== 'cancelled';
		});
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

	useEffect(() => {
		// console.log('startDate:', startDate);
		// console.log('endDate:', endDate);
		onChange({ startDate: startDate, endDate: endDate });
	}, [startDate, endDate]);

	const handleDateClick = (date) => {
		// console.log('handleDateClick:', date);

		if (date.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) return;
		if (isDateReserved(date)) return;
		if (!startDate) {
			setStartDate(date);
			setEndDate(null);
		} else if (startDate && !endDate) {
			// console.log('start:', startDate);

			if (date >= startDate && !isRangeReserved(startDate, date)) {
				setEndDate(date);
			} else if (date < startDate && !isRangeReserved(date, startDate)) {
				setEndDate(startDate);
				setStartDate(date);
			} else {
				setStartDate(date);
				setEndDate(null);
			}
		} else {
			setStartDate(date);
			setEndDate(null);
		}
	};
	const isRangeReserved = (start, end) => {
		if (!start || !end) return false;

		const currentDate = new Date(start);
		while (currentDate <= end) {
			if (isDateReserved(currentDate)) {
				return true;
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return false;
	};

	const renderDays = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		// const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
			<td key={`empty-${i}`} className='empty-day'></td>
		));

		const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
			const selectedDate = new Date(year, month, i + 1);
			const isStart =
				startDate &&
				selectedDate.getDate() === startDate.getDate() &&
				selectedDate.getMonth() === startDate.getMonth() &&
				selectedDate.getFullYear() === startDate.getFullYear();

			const isEnd =
				endDate &&
				selectedDate.getDate() === endDate.getDate() &&
				selectedDate.getMonth() === endDate.getMonth() &&
				selectedDate.getFullYear() === endDate.getFullYear();

			const isInRange =
				startDate &&
				endDate &&
				selectedDate > startDate &&
				selectedDate < endDate;

			return (
				<td
					key={`day-${i + 1}`}
					className={`calendar-day 
						${isStart && !endDate ? 'selected-date' : ''}
						${isStart && endDate ? 'selected-date start-date' : ''} 
						${isEnd ? 'selected-date end-date' : ''} 
						${isInRange ? 'in-range-date' : ''}
						${
							selectedDate.setHours(0, 0, 0, 0) <
							currentDate.setHours(0, 0, 0, 0)
								? 'disabled-date'
								: ''
						}
						${isDateReserved(selectedDate) ? 'reserved-date' : ''}`}
					onClick={() => handleDateClick(selectedDate)}
				>
					{i + 1}
				</td>
			);
		});
		const allDays = [...emptyDays, ...monthDays];

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
					<thead>
						<tr>
							<td>Sun</td>
							<td>Mon</td>
							<td>Tue</td>
							<td>Wed</td>
							<td>Thu</td>
							<td>Fri</td>
							<td>Sat</td>
						</tr>
					</thead>
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
			<div className='calendars-wrapper'>
				{renderCalendar(
					new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)
				)}
			</div>
			<button className='nav-button next' onClick={() => changeMonth(1)}>
				{'>'}
			</button>
		</div>
	);
}
