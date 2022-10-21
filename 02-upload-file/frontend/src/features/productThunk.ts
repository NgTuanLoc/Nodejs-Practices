import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../app/store';
import { IProduct, IFormData } from '../typing';

interface IData {
	msg: string;
	data: IProduct;
}

const getAllProductsThunk = createAsyncThunk<
	{ msg: string; data: IProduct[] },
	void,
	{ state: RootState; rejectValue: string }
>('products/getAllProducts', async (_, thunkAPI) => {
	try {
		const response = await axios.get<{ msg: string; data: IProduct[] }>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/products`
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const getProductByIdThunk = createAsyncThunk<
	IData,
	string,
	{ state: RootState; rejectValue: string }
>('products/getProductById', async (id, thunkAPI) => {
	try {
		const response = await axios.get<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/products/${id}`
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const createProductThunk = createAsyncThunk<
	IData,
	IFormData,
	{ state: RootState; rejectValue: string }
>('products/createProductById', async (newProductData, thunkAPI) => {
	try {
		const formData = new FormData();
		formData.append('name', newProductData.name);
		formData.append('price', newProductData.price);

		for (const file in newProductData.images) {
			formData.append('images', newProductData.images[file]);
		}

		const response = await axios.post<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/products`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		thunkAPI.dispatch(getAllProductsThunk());
		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const deleteProductByIdThunk = createAsyncThunk<
	IData,
	string,
	{ state: RootState; rejectValue: string }
>('Products/deleteProductById', async (id, thunkAPI) => {
	try {
		const response = await axios.delete<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/products/${id}`
		);
		thunkAPI.dispatch(getAllProductsThunk());
		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const updateProductByIdThunk = createAsyncThunk<
	IData,
	IProduct,
	{ state: RootState; rejectValue: string }
>('products/updateProductById', async (updatedProductData, thunkAPI) => {
	try {
		const { _id, name, price, images } = updatedProductData;
		const response = await axios.put<IData>(
			`${process.env.REACT_APP_API_ENDPOINT}/api/v1/products/${_id}`,
			{ _id, name, price, images }
		);
		thunkAPI.dispatch(getAllProductsThunk());
		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export {
	getAllProductsThunk,
	getProductByIdThunk,
	createProductThunk,
	deleteProductByIdThunk,
	updateProductByIdThunk,
};
