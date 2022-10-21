import styled from 'styled-components';

interface IStyledContainerProps {
	gridArea?: string;
}

const StyledContainer = styled.div<IStyledContainerProps>`
	width: 100%;
	height: 100%;
	grid-area: ${(props) => (props.gridArea ? props.gridArea : '')};
`;

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
`;

export { StyledContainer, StyledImage };
