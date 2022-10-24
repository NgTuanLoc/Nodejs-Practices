import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

import User from '../models/User';
import Token from '../models/Token';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import { attachCookiesToResponse, sendVerificationEmail } from '../utils';
import { createUserToken } from '../utils/createUserToken';

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// Check email and password are not empty
	if (!email || !password)
		throw new BadRequestError('Please Provided email or password');

	const user = await User.findOne({ email });

	// Check user exists
	if (!user) throw new BadRequestError('Email does not exists');

	// Check password
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new BadRequestError('Password is incorrect!');

	// Check email verified
	if (!user.isVerified)
		throw new UnAuthenticatedError('Please verify your email');

	// Login is valid
	// Create User Token
	const userTokenPayload = createUserToken(user);

	// existingRefreshToken
	let refreshToken = '';
	const existingRefreshToken = await Token.findOne({ user: user.id });

	if (existingRefreshToken) {
		if (!existingRefreshToken.isValid)
			throw new BadRequestError('Refresh Token is invalid');
		refreshToken = existingRefreshToken.refreshToken as string;
		attachCookiesToResponse({ res, user: userTokenPayload, refreshToken });
		return res.status(StatusCodes.OK).send({
			msg: 'login successful',
		});
	}

	// Create new refresh token
	refreshToken = crypto.randomBytes(50).toString('hex');
	const userAgent = req.headers['user-agent'];
	const ip = req.ip;
	const userToken = { refreshToken, ip, userAgent, user: user._id };

	await Token.create(userToken);
	attachCookiesToResponse({ res, user: userTokenPayload, refreshToken });

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
	const origin = process.env.ORIGIN_DOMAIN as string;
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
