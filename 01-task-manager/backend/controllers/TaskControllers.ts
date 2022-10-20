import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '../errors';
import Task from '../models/Task';

const getAllTasks = async (req: Request, res: Response) => {
	const data = await Task.find({});
	res.status(StatusCodes.OK).json({
		msg: 'Get All Tasks Successfully',
		data,
	});
};

const getTaskById = async (req: Request, res: Response) => {
	const { id: taskId } = req.params;
	const foundedTask = await Task.findOne({ _id: taskId });

	if (!foundedTask) throw new NotFoundError(`Not Found task with id ${taskId}`);

	res.status(StatusCodes.OK).json({
		msg: `Get Task ${taskId} Successfully`,
		data: foundedTask,
	});
};

const CreateTask = async (req: Request, res: Response) => {
	const newTaskData = await Task.create(req.body);
	res.status(StatusCodes.CREATED).json({
		msg: 'Create Task Successfully',
		data: newTaskData,
	});
};

const deleteTaskById = async (req: Request, res: Response) => {
	const { id: taskId } = req.params;
	const deletedTask = await Task.findOneAndDelete({ _id: taskId });

	if (!deletedTask) throw new NotFoundError(`Not Found task with id ${taskId}`);

	res.status(StatusCodes.OK).json({
		msg: `Delete Task ${taskId} Successfully`,
		data: deletedTask,
	});
};

const updateTaskById = async (req: Request, res: Response) => {
	const { id: taskId } = req.params;
	const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!updatedTask) throw new NotFoundError(`Not Found task with id ${taskId}`);

	res.status(StatusCodes.OK).json({
		msg: `Update Task ${taskId} Successfully`,
		data: updatedTask,
	});
};

export { getAllTasks, getTaskById, CreateTask, deleteTaskById, updateTaskById };
