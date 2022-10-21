import { createSlice } from '@reduxjs/toolkit';

import {
	getAllProductsThunk,
	getProductByIdThunk,
	createProductThunk,
	deleteProductByIdThunk,
	updateProductByIdThunk,
} from './productThunk';
import { IProduct } from '../typing';

interface IState {
	products: IProduct[];
	selectedProduct: IProduct;
	isLoading: boolean;
	error: string;
	msg: string;
}

const initialState: IState = {
	products: [],
	isLoading: false,
	error: '',
	msg: '',

	selectedProduct: {
		_id: '',
		name: '',
		price: 0,
		images: [],
	},
};

const ProductSlice = createSlice({
	name: 'Products',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// Get All Products
		builder.addCase(getAllProductsThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getAllProductsThunk.fulfilled, (state, { payload }) => {
			const { data, msg } = payload;
			state.isLoading = false;
			state.products = data;
			state.msg = msg;
		});
		builder.addCase(getAllProductsThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Get Product By Id
		builder.addCase(getProductByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getProductByIdThunk.fulfilled, (state, { payload }) => {
			const { data, msg } = payload;
			state.isLoading = false;
			state.selectedProduct = data;
			state.msg = msg;
		});
		builder.addCase(getProductByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Create Product
		builder.addCase(createProductThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createProductThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(createProductThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});
		// Delete Product By Id
		builder.addCase(deleteProductByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteProductByIdThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(deleteProductByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});

		// Update Product By Id
		builder.addCase(updateProductByIdThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateProductByIdThunk.fulfilled, (state, { payload }) => {
			const { msg } = payload;
			state.isLoading = false;
			state.msg = msg;
		});
		builder.addCase(updateProductByIdThunk.rejected, (state, { payload }) => {
			state.isLoading = false;
			if (payload) {
				state.error = payload;
			}
		});
	},
});

export default ProductSlice.reducer;
