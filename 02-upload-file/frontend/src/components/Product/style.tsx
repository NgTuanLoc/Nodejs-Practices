import styled from 'styled-components';

const StyledContainer = styled.article`
	height: 15rem;
`;

const StyledContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	border-bottom-left-radius: var(--borderRadius);
	border-bottom-right-radius: var(--borderRadius);
	padding: 0.5rem 1rem;
`;

// Typography
const StyledHeading = styled.h4`
	font-size: 1.8rem;
	letter-spacing: var(--letterSpacing);
	font-weight: bold;
	margin: 0;
`;

const StyledPrice = styled.h5`
	font-size: 1.5rem;
	color: var(--green-dark);
	letter-spacing: var(--letterSpacing);
	font-weight: bold;
	margin: 0;
`;

export { StyledContainer, StyledContent, StyledHeading, StyledPrice };
