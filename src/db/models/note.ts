import { Schema, model } from 'mongoose';

export interface NoteType {
	title: string;
	description?: string;
}

const noteSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
});

export default model<NoteType>('Note', noteSchema);
