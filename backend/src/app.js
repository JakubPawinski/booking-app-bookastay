import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import houseRoutes from './routes/house.route.js';
import reservationRoutes from './routes/reservation.route.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
		app.listen(3000, () => {
			console.log(`Server app is running on port ${port}`);
		});
	})
	.catch((err) => console.log('Connection failed! \n' + err));
