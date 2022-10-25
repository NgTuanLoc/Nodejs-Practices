import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

import User from '../models/User';
import Token from '../models/Token';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import {
	attachCookiesToResponse,
	sendVerificationEmail,
	createUserToken,
	generateHashString,
	sendResetPasswordEmail,
} from '../utils';

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
	const userData = {
		name: user.name,
		email: user.email,
		userId: user.id,
		role: user.role,
	};

	if (existingRefreshToken) {
		if (!existingRefreshToken.isValid)
			throw new BadRequestError('Refresh Token is invalid');
		refreshToken = existingRefreshToken.refreshToken as string;
		attachCookiesToResponse({ res, user: userTokenPayload, refreshToken });
		return res.status(StatusCodes.OK).send({
			msg: 'login successful',
			user: userData,
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
		user: userData,
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
	await Token.findOneAndDelete({ user: req.body.user.id });

	res.cookie('refreshCookie', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});

	res.cookie('accessCookie', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw new BadRequestError(`Not found user with email: ${email}`);

	const TERMINATE_IN_TEN_MINUTE = 1000 * 60 * 10;
	const passwordTokenExpirationDate = new Date(
		Date.now() + TERMINATE_IN_TEN_MINUTE
	);
	const passwordToken = crypto.randomBytes(80).toString('hex');

	// Send reset password email
	await sendResetPasswordEmail({
		name: user.name,
		email: user.email,
		token: passwordToken,
		origin: process.env.ORIGIN_DOMAIN as string,
	});

	// Update user instance data
	user.resetPasswordToken = generateHashString(passwordToken);
	user.resetPasswordTokenExpirationDate = passwordTokenExpirationDate;
	await user.save();

	return res.status(StatusCodes.OK).send({
		msg: 'Please check your email for reset password link',
	});
};
const resetPassword = async (req: Request, res: Response) => {
	const { token, email, password } = req.body;

	// Check empty
	if (!token || !email || !password)
		throw new BadRequestError('Please provide email, password');

	const user = await User.findOne({ email });
	const currentDate = new Date();
	const expiredResetPassword = user?.resetPasswordTokenExpirationDate as Date;

	// Check user existed
	if (!user) throw new BadRequestError(`Not found user with email: ${email}`);

	// Check token
	if (user.resetPasswordToken !== generateHashString(token))
		throw new BadRequestError('Token not match');

	// Check expired reset password date
	if (currentDate > expiredResetPassword)
		throw new BadRequestError('Reset password expired, please try again later');

	user.password = password;
	user.resetPasswordToken = '';
	user.resetPasswordTokenExpirationDate = null;
	await user.save();

	return res.status(StatusCodes.OK).send({
		msg: 'Reset Password successful',
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
