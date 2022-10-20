import styled from 'styled-components';
import { useEffect } from 'react';

interface IErrorMessage {
	msg: any;
}

export const ErrorMessage = ({ msg }: IErrorMessage) => {
	return <StyledContainer>{msg.msg}</StyledContainer>;
};

const StyledContainer = styled.p`
	color: var(--red-dark);
	letter-spacing: var(--letterSpacing);
	font-size: 0.9rem;
`;
