import styled from 'styled-components';

const StyledContainer = styled.div`
	width: 100%;
	height: 100%;
	border-radius: var(--borderRadius);
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	overflow: hidden;

	.swiper-pagination {
		opacity: 0;
	}

	.swiper-pagination-bullet-active {
		background-color: white !important;
	}
	.swiper-pagination-bullet {
		background-color: white;
	}

	.swiper-button-next,
	.swiper-button-prev {
		color: black;
		transition: var(--transition);
		opacity: 0;

		::after {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30px;
			width: 30px;
			box-shadow: var(--box-shadow);
			text-align: center;
			font-weight: bold;
			border-radius: 50%;
			padding: 15px;
			color: black;
			z-index: 12;
			font-size: 10px;
			background-color: rgba(254, 254, 255, 0.9);
		}
	}

	:hover {
		.swiper-button-next,
		.swiper-button-prev,
		.swiper-pagination {
			opacity: 1;
		}
	}
`;

export { StyledContainer };
