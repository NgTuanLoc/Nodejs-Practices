import {
	StyledContainer,
	StyledContent,
	StyledHeading,
	StyledPrice,
} from './style';
import { IProduct } from '../../typing';
import { Catalog } from '../';

const Product = ({ name, price, images }: IProduct) => {
	return (
		<StyledContainer>
			<Catalog images={images} navigation />
			<StyledContent>
				<StyledHeading>{name}</StyledHeading>
				<StyledPrice>{price}$</StyledPrice>
			</StyledContent>
		</StyledContainer>
	);
};

export default Product;
