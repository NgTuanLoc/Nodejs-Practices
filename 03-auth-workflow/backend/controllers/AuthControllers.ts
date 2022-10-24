import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Login, Register, Forgot Password, Reset Password, Verify Email

const login = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'login successful',
	});
};

const register = async (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({
		msg: 'register successful',
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
	return res.status(StatusCodes.OK).send({
		msg: 'Verify Email Request',
	});
};

export { login, register, logout, forgotPassword, resetPassword, verifyEmail };
