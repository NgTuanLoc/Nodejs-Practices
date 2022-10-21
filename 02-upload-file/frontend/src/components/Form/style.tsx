import styled from 'styled-components';

const StyledContainer = styled.article`
	background-color: white;
	width: 100%;
	max-width: var(--fixed-width);
	border-radius: var(--borderRadius);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1.5rem 0;
	box-shadow: var(--shadow-2);
`;

const StyledFormContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
	padding: 0.5rem;
`;

const StyledInput = styled.input`
	width: 100%;
	cursor: text;
	font-size: 1.2rem;
	padding: 0.375rem 0.75rem;
	background: var(--grey-50);
	border: 1px solid var(--grey-300);
	line-height: 1.15;
	border-radius: var(--borderRadius);

	:focus {
		outline: none;
	}
	::placeholder {
		color: var(--grey-600);
	}
`;

// Typography
const StyledHeading = styled.h4`
	font-weight: 400;
	line-height: 1.3;
	text-transform: capitalize;
	letter-spacing: var(--spacing);
`;

const StyledLabel = styled.label`
	font-size: 1.1rem;
`;

const StyledSubmitButton = styled.button`
	margin-top: 1rem;
	width: 100%;
	cursor: pointer;
	color: var(--white);
	background: var(--primary-500);
	border: none;
	border-radius: var(--borderRadius);
	letter-spacing: var(--letterSpacing);
	padding: 0.375rem 0.75rem;
	box-shadow: var(--shadow-1);
	transition: var(--transition);
	text-transform: capitalize;
	font-size: 1.5rem;
	border-radius: var(--borderRadius);
	:hover {
		color: var(--white);
		background: var(--primary-700);
		box-shadow: var(--shadow-2);
	}
`;

export {
	StyledContainer,
	StyledFormContainer,
	StyledInput,
	StyledHeading,
	StyledLabel,
	StyledSubmitButton,
};
