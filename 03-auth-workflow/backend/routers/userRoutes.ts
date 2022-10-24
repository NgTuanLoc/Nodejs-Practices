import express from 'express';

import {
	getAllUsers,
	getUserById,
	CreateUser,
	deleteUserById,
	updateUserById,
} from '../controllers/UserControllers';

const router = express.Router();

router.route('/').get(getAllUsers).post(CreateUser);

router
	.route('/:id')
	.get(getUserById)
	.delete(deleteUserById)
	.put(updateUserById);

export default router;
