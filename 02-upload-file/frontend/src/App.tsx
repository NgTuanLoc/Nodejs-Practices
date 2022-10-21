import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loading, Form, Product } from './components';
import { getAllProductsThunk } from './features/productThunk';

function App() {
	const { isLoading, products } = useAppSelector((store) => store.product);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProductsThunk());
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
			<Form />
			<StyledProductContainer>
				{products.map((product) => (
					<Product key={product._id} {...product} />
				))}
			</StyledProductContainer>
		</StyledContainer>
	);
}

const StyledContainer = styled.main`
	position: relative;
	width: 100vw;
	min-height: 100vh;
	background-color: #f2f4f8;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem;
`;

const StyledProductContainer = styled.section`
	width: 90vw;
	margin-top: 3rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	grid-gap: 4rem 2rem;
	justify-content: center;
	align-items: center;
`;

// Typography

export default App;
