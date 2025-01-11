import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import houseRoutes from './routes/house.route.js';
import reservationRoutes from './routes/reservation.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
	res.send('Reservation app API');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/reservations', reservationRoutes);

mongoose
	.connect(
		'mongodb+srv://admin:nkC1lUJLZc7eHYa6@database.vmj7q.mongodb.net/DataBaseretryWrites=true&w=majorit'
	)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(port, () => {
			console.log(`Server app is running on port ${port}`);
		});
	})
	.catch((err) => console.log('Connection failed! \n' + err));
