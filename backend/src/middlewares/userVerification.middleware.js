import jwt from 'jsonwebtoken';

const userVerification = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

		//Add user date to the request
		req.user = decodedData;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

const ownerVerification = (req, res, next) => {
	const token = req.cookies.token;
	console.log(token);
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
