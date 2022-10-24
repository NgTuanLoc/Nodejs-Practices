import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

import User from '../models/User';
import { BadRequestError } from '../errors';
import { sendVerificationEmail } from '../utils';

const login = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'login successful',
	});
};

const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// Check email is existed
	const isEmailExisted = await User.findOne({ email: email });
	if (isEmailExisted) throw new BadRequestError('Email is already be used');

	// First registered user will be an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';
	const verificationToken = crypto.randomBytes(50).toString('hex');

	// New User Data
	const newUser = await User.create({
		name,
		email,
		password,
		role,
		verificationToken,
	});

	// Send verification email
	const origin = 'http://localhost:3000';
	await sendVerificationEmail({
		name: newUser.name,
		email: newUser.email,
		verificationToken: newUser.verificationToken as string,
		origin,
	});

	return res.status(StatusCodes.OK).send({
		msg: 'register successful',
		data: newUser,
	});
};

const logout = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'logout successful',
	});
};

const forgotPassword = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'Forgot Password Request',
	});
};
const resetPassword = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'Reset Password Request',
	});
};
const verifyEmail = async (req: Request, res: Response) => {
	const { verificationToken, email } = req.body;

	const user = await User.findOne({ email });
	// Checking user existed
	if (!user) throw new BadRequestError(`${email} email address do not exist`);

	// Checking verification token
	console.log('user ', user.verificationToken);
	console.log(verificationToken);

	if (verificationToken !== user.verificationToken)
		throw new BadRequestError('Invalid Credentials');

	// Verification success => update user data
	user.isVerified = true;
	user.verifiedDate = new Date();
	user.verificationToken = '';
	await user.save();

	return res.status(StatusCodes.OK).send({
		msg: 'Verify Email Successful',
	});
};

export { login, register, logout, forgotPassword, resetPassword, verifyEmail };
