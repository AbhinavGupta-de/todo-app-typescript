import { RequestHandler } from 'express';
import Note, { NoteType } from '../db/models/note';

interface IncomingBody {
	title: string;
	description?: string;
}

export const getAllNotes: RequestHandler = async (req, res) => {
	try {
		const notes = await Note.find();
		res.json({
			notes: notes.map((note) => {
				return {
					id: note._id,
					title: note.title,
					description: note.description,
				};
			}),
		});
	} catch (error) {
		console.error('Error fetching notes:', error);
		res.status(500).send('Internal Server Error');
	}
};

export const getNoteById: RequestHandler = async (req, res) => {
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
};

export const createPost: RequestHandler = async (req, res) => {
	if (!req.body.title) {
		return res.status(400).send('Title is required');
	}
	await Note.create<NoteType>({
		title: (req.body as IncomingBody).title,
		description: (req.body as IncomingBody).description,
	});

	res.send('Post request received');
};

export const updatePost: RequestHandler = async (req, res) => {
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
};

export const deletePost: RequestHandler = async (req, res) => {
	const noteId = req.params.noteId;

	const note = await Note.findByIdAndDelete(noteId);

	if (!note) {
		return res.status(404).send('Note not found');
	}

	res.send('Note deleted');
};
