import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '../errors';
import User from '../models/User';

const getAllUsers = async (req: Request, res: Response) => {
	const data = await User.find({}).select('-password');
	res.status(StatusCodes.OK).json({
		msg: 'Get All Users Successfully',
		data,
	});
};

const getUserById = async (req: Request, res: Response) => {
	const { id: userId } = req.params;
	const foundedUser = await User.findOne({ _id: userId });

	if (!foundedUser) throw new NotFoundError(`Not Found User With Id ${userId}`);

	res.status(StatusCodes.OK).json({
		msg: `Get User ${userId} Successfully`,
		data: foundedUser,
	});
};

const CreateUser = async (req: Request, res: Response) => {
	const newUserData = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({
		msg: 'Create User Successfully',
		data: newUserData,
	});
};

const deleteUserById = async (req: Request, res: Response) => {
	const { id: userId } = req.params;
	const deletedUser = await User.findOneAndDelete({ _id: userId });

	if (!deletedUser) throw new NotFoundError(`Not Found User With Id ${userId}`);

	res.status(StatusCodes.OK).json({
		msg: `Delete User ${userId} Successfully`,
		data: deletedUser,
	});
};

const updateUserById = async (req: Request, res: Response) => {
	const { id: userId } = req.params;
	const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!updatedUser) throw new NotFoundError(`Not Found User With Id ${userId}`);

	res.status(StatusCodes.OK).json({
		msg: `Update User ${userId} Successfully`,
		data: updatedUser,
	});
};

export { getAllUsers, getUserById, CreateUser, deleteUserById, updateUserById };
