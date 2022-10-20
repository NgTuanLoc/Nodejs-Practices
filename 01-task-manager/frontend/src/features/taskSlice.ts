import { createSlice } from '@reduxjs/toolkit';

import {
	getAllTasksThunk,
	getTaskByIdThunk,
	createTaskThunk,
	deleteTaskByIdThunk,
	updateTaskByIdThunk,
} from './taskThunk';
import { ITask } from '../typing';

interface IState {
	tasks: ITask[];
	selectedTask: ITask;
	isLoading: boolean;
	error: string;
	msg: string;
	isModalOpen: boolean;
}

const initialState: IState = {
	tasks: [],
	isLoading: false,
	error: '',
	msg: '',
	isModalOpen: false,
	selectedTask: {
		name: '',
		completed: false,
	},
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
		},
	},
	extraReducers(builder) {
		// Get All Tasks
		builder.addCase(getAllTasksThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getAllTasksThunk.fulfilled, (state, { payload }) => {
			const { data, msg } = payload;
			state.isLoading = false;
			state.tasks = data;
			state.msg = msg;
		});
		builder.addCase(getAllTasksThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Get Task By Id
		builder.addCase(getTaskByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTaskByIdThunk.fulfilled, (state, { payload }) => {
			const { data, msg } = payload;
			state.isLoading = false;
			state.selectedTask = data;
			state.msg = msg;
		});
		builder.addCase(getTaskByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Create Task
		builder.addCase(createTaskThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createTaskThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(createTaskThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});
		// Delete Task By Id
		builder.addCase(deleteTaskByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteTaskByIdThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(deleteTaskByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Update Task By Id
		builder.addCase(updateTaskByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateTaskByIdThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(updateTaskByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});
	},
});

export const { openModal, closeModal } = taskSlice.actions;

export default taskSlice.reducer;
