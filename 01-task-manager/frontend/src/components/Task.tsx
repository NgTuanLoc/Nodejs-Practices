import styled from 'styled-components';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import { ITask } from '../typing';
import { useAppDispatch } from '../app/hooks';
import { deleteTaskByIdThunk, getTaskByIdThunk } from '../features/taskThunk';
import { openModal } from '../features/taskSlice';

export const Task = ({ _id, name, completed }: ITask) => {
	const dispatch = useAppDispatch();

	const deleteTask = () => {
		dispatch(deleteTaskByIdThunk(_id));
	};

	const editTask = () => {
		dispatch(getTaskByIdThunk(_id));
		dispatch(openModal());
	};

	return (
		<StyledContainer>
			<StyledContent>
				{completed && (
					<StyledButton isSuccess>
						<IoIosCheckmarkCircleOutline />
					</StyledButton>
				)}

				<StyledParagraph>{name}</StyledParagraph>
			</StyledContent>
			<StyledButtonContainer>
				<StyledButton isSuccess onClick={editTask}>
					<AiOutlineEdit />
				</StyledButton>
				<StyledButton onClick={deleteTask}>
					<IoTrashOutline />
				</StyledButton>
			</StyledButtonContainer>
		</StyledContainer>
	);
};

const StyledContainer = styled.article`
	background-color: white;
	transition: var(--transition);
	box-shadow: var(--shadow-2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 5rem;
	border-radius: var(--borderRadius);

	:hover {
		box-shadow: var(--shadow-4);
	}
`;

const StyledButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: space-around;
	align-items: center;
`;

const StyledContent = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: space-around;
	align-items: center;
`;

const StyledParagraph = styled.p`
	font-size: 1.2rem;
`;

const StyledButton = styled.button<{ isSuccess?: boolean }>`
	cursor: pointer;
	background-color: transparent;
	border-color: transparent;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) =>
		props.isSuccess ? 'var(--green-dark)' : 'var(--red-dark)'};
	font-size: 1.2rem;
`;
