import { useEffect } from 'react';
import styled from 'styled-components';

import { getAllTasksThunk } from './features/taskThunk';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loading } from './components';

function App() {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((store) => store.task);

	useEffect(() => {
		dispatch(getAllTasksThunk());
	}, [dispatch]);

	if (isLoading) {
		return (
			<StyledContainer style={{ justifyContent: 'center' }}>
				<Loading />
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<StyledContent>
				<StyledForm>
					<StyledHeading>Task Manager</StyledHeading>
					<StyledSearchContainer>
						<StyledInput placeholder='e.g: Washing dishes' />
						<StyledSubmitButton type='submit'>Submit</StyledSubmitButton>
					</StyledSearchContainer>
				</StyledForm>
				<StyledTaskContainer></StyledTaskContainer>
			</StyledContent>
		</StyledContainer>
	);
}

const StyledContainer = styled.main`
	width: 100vw;
	min-height: 100vh;
	background-color: #f2f4f8;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledContent = styled.section`
	margin-top: 8rem;
	width: 90vw;
	max-width: var(--fixed-width);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledForm = styled.form`
	background-color: white;
	width: 100%;
	border-radius: var(--radius);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
	box-shadow: var(--shadow-2);
`;

const StyledSearchContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto;
`;

const StyledInput = styled.input`
	cursor: text;
	font-size: 1.2rem;
	padding: 0.375rem 0.75rem;
	background: var(--grey-50);
	border: 1px solid var(--grey-300);
	border-right: transparent;
	line-height: 1.15;
	border-top-left-radius: var(--borderRadius);
	border-bottom-left-radius: var(--borderRadius);
	:focus {
		outline: none;
	}
	::placeholder {
		color: var(--grey-600);
	}
`;

const StyledTaskContainer = styled.div``;

const StyledTask = styled.button`
	background-color: white;
	border-radius: var(--radius);
`;

// Typography
const StyledHeading = styled.h4`
	font-weight: 400;
	line-height: 1.3;
	text-transform: capitalize;
	letter-spacing: var(--spacing);
`;
const StyledParagraph = styled.p``;
const StyledSubmitButton = styled.button`
	cursor: pointer;
	appearance: none;
	color: var(--white);
	background: var(--primary-500);
	border: none;
	border-radius: var(--borderRadius);
	letter-spacing: var(--letterSpacing);
	padding: 0.375rem 0.75rem;
	box-shadow: var(--shadow-1);
	transition: var(--transition);
	text-transform: capitalize;
	margin-top: 0;
	font-size: 1.5rem;
	width: 175px;
	border-radius: 0;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
	border-top-right-radius: var(--borderRadius);
	border-bottom-right-radius: var(--borderRadius);
	:hover {
		color: var(--white);
		background: var(--primary-700);
		box-shadow: var(--shadow-2);
	}
`;
const StyledEditButton = styled.button``;
const StyledDeleteButton = styled.button``;

export default App;
