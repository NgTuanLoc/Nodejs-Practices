import express from 'express';

import {
	getAllTasks,
	getTaskById,
	CreateTask,
	deleteTaskById,
	updateTaskById,
} from '../controllers/TaskControllers';

const router = express.Router();

router.route('/').get(getAllTasks).post(CreateTask);

router
	.route('/:id')
	.get(getTaskById)
	.delete(deleteTaskById)
	.put(updateTaskById);

export default router;
