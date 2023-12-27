import express from 'express';
import './db';
import noteRoutes from './routes/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/note', noteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
