import styled from 'styled-components';
import {
	useState,
	useEffect,
	useRef,
	FormEventHandler,
	ChangeEventHandler,
} from 'react';

import { useOnClickOutside } from '../hooks/useClickOutsideHook';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { closeModal, clearError } from '../features/taskSlice';
import { getTaskByIdThunk, updateTaskByIdThunk } from '../features/taskThunk';
import { ErrorMessage } from './';

export const Modal = () => {
	const { selectedTask, error } = useAppSelector((store) => store.task);
	const [task, setTask] = useState(selectedTask);
	const dispatch = useAppDispatch();
	const modalRef = useRef(null);
	useOnClickOutside(modalRef, () => dispatch(closeModal()));
	const [errorMsg, setErrorMsg] = useState({ msg: error, display: false });

	const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		let value: string | boolean = e.target.value;
		const name = e.target.name;

		if (name === 'completed') value = e.target.checked;

		setTask((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		dispatch(updateTaskByIdThunk(task));
		dispatch(getTaskByIdThunk(task._id));
	};

	useEffect(() => {
		if (error) {
			setErrorMsg({ msg: error, display: true });
		}
		const timer = setTimeout(() => {
			setErrorMsg((prevState) => {
				return { ...prevState, display: false };
			});
			dispatch(clearError());
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [dispatch, error]);

	return (
		<StyledContainer>
			<StyledModal ref={modalRef}>
				<StyledHeading>Edit Task</StyledHeading>
				<StyledForm onSubmit={onSubmitHandler}>
					<StyledRow>
						<StyledSubHeading>Task ID</StyledSubHeading>
						<StyledLabel>{task._id}</StyledLabel>
					</StyledRow>
					<StyledRow>
						<StyledSubHeading>Name</StyledSubHeading>
						<StyledInput
							placeholder='eg. Do homework'
							onChange={onChangeHandler}
							name='name'
							value={task.name}
						/>
					</StyledRow>
					<StyledRow>
						<StyledSubHeading>Completed</StyledSubHeading>
						<StyledCheckboxInput
							onChange={onChangeHandler}
							defaultChecked={task.completed}
							type='checkbox'
							name='completed'
						/>
					</StyledRow>
					{errorMsg.display && <ErrorMessage msg={errorMsg.msg} />}
					<StyledSubmitButton type='submit'>Edit</StyledSubmitButton>
				</StyledForm>
			</StyledModal>
		</StyledContainer>
	);
};

const StyledContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 99;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledModal = styled.article`
	background-color: white;
	border-radius: var(--borderRadius);
	padding: 1rem 3rem;
`;

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const StyledRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	gap: 4rem;
	margin-bottom: 1rem;
`;

// Typography
const StyledHeading = styled.h4`
	font-weight: 400;
	line-height: 1.3;
	text-transform: capitalize;
	letter-spacing: var(--spacing);
	text-align: center;
`;

const StyledSubHeading = styled.h4`
	font-size: 1.1rem;
	font-weight: 300;
	line-height: 1.3;
	text-transform: capitalize;
	letter-spacing: var(--spacing);
	margin: 0;
`;

const StyledLabel = styled.label`
	font-size: 1rem;
`;

const StyledInput = styled.input`
	color: black;
	font-size: 1.1rem;
	width: 100%;
	padding: 0.375rem 0.75rem;
	border-radius: var(--borderRadius);
	background: var(--grey-50);
	border-color: transparent;
	border: 1px solid var(--grey-300);

	::placeholder {
		color: var(--grey-600);
		opacity: 0.54;
	}
`;

const StyledCheckboxInput = styled.input`
	margin-inline: auto;
`;

const StyledSubmitButton = styled.button`
	width: 100%;
	cursor: pointer;
	border-radius: var(--borderRadius);
	padding: 1rem 3rem;
	background-color: black;
	color: white;
	font-size: 1.2rem;
	font-weight: bold;
	border-color: transparent;
`;
