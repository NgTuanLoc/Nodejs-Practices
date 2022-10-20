import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../app/store';
import { ITask } from '../typing';

interface IData {
	msg: string;
	data: ITask;
}

const getAllTasksThunk = createAsyncThunk<
	{ msg: string; data: ITask[] },
	void,
	{ state: RootState; rejectValue: string }
>('quiz/getQuiz', async (_, thunkAPI) => {
	try {
		const response = await axios.get<{ msg: string; data: ITask[] }>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/tasks`
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const getTaskByIdThunk = createAsyncThunk<
	IData,
	string,
	{ state: RootState; rejectValue: string }
>('quiz/getQuiz', async (id, thunkAPI) => {
	try {
		const response = await axios.get<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/tasks/${id}`
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const createTaskThunk = createAsyncThunk<
	IData,
	{ id: string; data: ITask },
	{ state: RootState; rejectValue: string }
>('quiz/getQuiz', async (newTaskData, thunkAPI) => {
	try {
		const { id, data } = newTaskData;
		const response = await axios.post<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/tasks/${id}`,
			data
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const deleteTaskByIdThunk = createAsyncThunk<
	IData,
	string,
	{ state: RootState; rejectValue: string }
>('quiz/getQuiz', async (id, thunkAPI) => {
	try {
		const response = await axios.delete<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/tasks/${id}`
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const updateTaskByIdThunk = createAsyncThunk<
	IData,
	{ id: string; data: ITask },
	{ state: RootState; rejectValue: string }
>('quiz/getQuiz', async (updatedTaskData, thunkAPI) => {
	try {
		const { id, data } = updatedTaskData;
		const response = await axios.put<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/tasks/${id}`,
			data
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export {
	getAllTasksThunk,
	getTaskByIdThunk,
	createTaskThunk,
	deleteTaskByIdThunk,
	updateTaskByIdThunk,
};
