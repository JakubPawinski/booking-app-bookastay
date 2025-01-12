import jwt, { decode } from 'jsonwebtoken';

const userVerification = (req, res, next) => {
	// console.log('userVerification');
	// console.log(req.cookies);

	const token = req.cookies.token;
	// console.log(token);
	if (!token) {
		// console.log('No token');
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
		// console.log('decodedData: ', decodedData);

		//Add user date to the request
		req.user = decodedData;
		next();
	} catch (error) {
		// console.log('Unauthorized: ', error);

		return res.status(401).json({ message: 'Unauthorized' });
	}
};

const ownerVerification = (req, res, next) => {
	console.log('ownerVerification');

	const token = req.cookies.token;
	console.log(token);
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
		console.log(decodedData);

		if (decodedData.role !== 'owner') {
			return res.status(403).json({ message: 'Forbidden action' });
		}

		//Add user date to the request
		req.user = decodedData;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

export { userVerification, ownerVerification };
