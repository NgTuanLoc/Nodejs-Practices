import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Task from '../models/Task';

const getAllTasks = async (req: Request, res: Response) => {
	const data = await Task.find({});
	res.status(StatusCodes.OK).json({
		data,
	});
};

const getTaskById = async (req: Request, res: Response) => {
	const { id: taskId } = req.params;
	const foundedTask = await Task.findOne({ _id: taskId });

	res.status(StatusCodes.OK).json({
		data: foundedTask,
	});
};

const CreateTask = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		msg: 'CreateTask',
	});
};

const deleteTaskById = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		msg: 'DeleteTaskById',
	});
};

const updateTaskById = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		msg: 'UpdateTaskById',
	});
};

export { getAllTasks, getTaskById, CreateTask, deleteTaskById, updateTaskById };
