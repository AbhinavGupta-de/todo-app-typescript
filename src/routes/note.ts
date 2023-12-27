import { Router } from 'express';
import {
	createPost,
	deletePost,
	getAllNotes,
	getNoteById,
	updatePost,
} from '../controllers/node';

const router = Router();

router.get('/', getAllNotes);
router.get('/:noteId', getNoteById);
router.post('/create', createPost);
router.patch('/update/:noteId', updatePost);
router.delete('/delete/:noteId', deletePost);

export default router;
