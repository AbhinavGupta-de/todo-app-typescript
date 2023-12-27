import express from 'express';
import './db';
import Note from './db/models/note';
import { NoteType } from './db/models/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

interface IncomingBody {
	title: string;
	description?: string;
}

app.post('/create', async (req, res) => {
	if (!req.body.title) {
		return res.status(400).send('Title is required');
	}
	await Note.create<NoteType>({
		title: (req.body as IncomingBody).title,
		description: (req.body as IncomingBody).description,
	});

	res.send('Post request received');
});

app.patch('/update/:noteId', async (req, res) => {
	const noteId = req.params.noteId;

	const { title, description } = req.body as IncomingBody;

	const note = await Note.findByIdAndUpdate(
		noteId,
		{ title, description },
		{ new: true }
	);

	if (!note) {
		return res.status(404).send('Note not found');
	}

	await note.save();

	res.send('Note updated');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
