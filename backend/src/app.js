import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Reservation app API');
});

mongoose
	.connect(
		"mongodb+srv://admin:nkC1lUJLZc7eHYa6@database.vmj7q.mongodb.net/DataBaseretryWrites=true&w=majority&appName=DataBase"
	)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(3000, () => {
			console.log(`Server app is running on port ${port}`);
		});
	})
	.catch((err) => console.log('Connection failed! \n' + err));
