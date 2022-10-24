import { Router } from 'express';
import {
	login,
	register,
	logout,
	forgotPassword,
	resetPassword,
	verifyEmail,
} from '../controllers/AuthControllers';

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);
router.route('/verify-email').post(verifyEmail);
router.route('/logout').delete(logout);

export default router;
