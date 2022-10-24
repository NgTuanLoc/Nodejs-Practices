import express from 'express';

import {
	getAllUsers,
	getUserById,
	CreateUser,
	deleteUserById,
	updateUserById,
	showCurrentUser,
} from '../controllers/UserControllers';
import {
	authenticateMiddleware,
	authorizeMiddleware,
} from '../middlewares/authentication';

const router = express.Router();

router.route('/').get(getAllUsers).post(CreateUser);

router.route('/showMe').get(authenticateMiddleware, showCurrentUser);

router
	.route('/:id')
	.get(getUserById)
	.delete(deleteUserById)
	.put(updateUserById);

export default router;
