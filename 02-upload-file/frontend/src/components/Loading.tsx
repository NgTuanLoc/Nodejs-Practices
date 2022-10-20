import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export const Loading = () => {
	return (
		<StyledContainer>
			<ClipLoader color='#36d7b7' size={50} />
		</StyledContainer>
	);
};

const StyledContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
