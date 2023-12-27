import mongoose from 'mongoose';

mongoose
	.connect('mongodb://127.0.0.1:27017/noteapp')
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.error("Couldn't connect to database");
		console.error(err);
	});
