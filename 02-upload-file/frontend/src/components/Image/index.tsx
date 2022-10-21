import Skeleton from 'react-loading-skeleton';

import { useProgressiveImg } from '../../hooks';
import { StyledContainer, StyledImage } from './style';
import DEFAULT_IMAGE from '../../images/default-user-image.jpg';

interface IImage {
	url: string;
	alt: string;
	gridArea?: string;
	heartIcon?: boolean;
}

const CustomImage = ({ url, alt, gridArea, heartIcon = false }: IImage) => {
	const isImageLoaded = useProgressiveImg(url);

	if (!url) {
		return (
			<StyledContainer gridArea={gridArea}>
				<StyledImage alt={alt} src={DEFAULT_IMAGE} />
			</StyledContainer>
		);
	}

	return (
		<StyledContainer gridArea={gridArea}>
			{isImageLoaded ? (
				<StyledImage src={url} alt={alt} />
			) : (
				<Skeleton style={{ lineHeight: 2 }} duration={2} />
			)}
		</StyledContainer>
	);
};

export default CustomImage;
