const getSeason = (date) => {
	// console.log('getSeason');
	const currDate = new Date(date);

	const month = currDate.getMonth();
	if (month >= 5 && month <= 7) return 'high'; // june-july-august
	if ((month >= 3 && month <= 4) || month === 8) return 'medium'; // april-may-september
	return 'low'; // october-march
};

const getPrice = (prices, startDate, endDate) => {
	console.log(startDate, endDate);
	console.log(prices);
	const formattedEndDate = new Date(endDate);

	let totalPrice = 0;
	let currentDate = new Date(startDate);

	console.log(currentDate <= endDate);

	while (currentDate <= formattedEndDate) {
		// console.log('petla');

		const season = getSeason(currentDate);
		totalPrice += prices[season];
		currentDate.setDate(currentDate.getDate() + 1);
		console.log(currentDate);
	}

	return totalPrice;
};

export { getPrice };
