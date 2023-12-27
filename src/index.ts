import express from 'express';
import './db';
import Note from './db/models/note';
import { NoteType } from './db/models/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	try {
		const notes = await Note.find();
		res.json(notes);
	} catch (error) {
		console.error('Error fetching notes:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.get('/:noteId', async (req, res) => {
	try {
		const note = await Note.findById(req.params.noteId);

		if (!note) {
			return res.status(404).send('Note not found');
		}

		res.json(note);
	} catch (error) {
		console.error('Error fetching note by ID:', error);
		res.status(500).send('Internal Server Error');
	}
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

app.delete('/delete/:noteId', async (req, res) => {
	const noteId = req.params.noteId;

	const note = await Note.findByIdAndDelete(noteId);

	if (!note) {
		return res.status(404).send('Note not found');
	}

	res.send('Note deleted');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
