import { ClipLoader } from 'react-spinners';
import { StyledContainer } from './style';

const Loading = () => {
	return (
		<StyledContainer>
			<ClipLoader color='#36d7b7' size={50} />
		</StyledContainer>
	);
};

export default Loading;
