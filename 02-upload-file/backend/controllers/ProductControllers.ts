import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { storeImagesInCloudinary } from '../utils';
// import { UploadedFile } from 'express-fileupload/index';

import { BadRequestError, NotFoundError } from '../errors';
import Product from '../models/Product';

const getAllProducts = async (req: Request, res: Response) => {
	const data = await Product.find({});
	res.status(StatusCodes.OK).json({
		msg: 'Get All Products Successfully',
		data,
	});
};

const getProductById = async (req: Request, res: Response) => {
	const { id: productId } = req.params;
	const foundedProduct = await Product.findOne({ _id: productId });

	if (!foundedProduct)
		throw new NotFoundError(`Not Found Product with id ${productId}`);

	res.status(StatusCodes.OK).json({
		msg: `Get Product ${productId} Successfully`,
		data: foundedProduct,
	});
};

const createProduct = async (req: Request, res: Response) => {
	const { name, price, images } = req.body;
	const secure_url_images = await storeImagesInCloudinary(images);
	const newProduct = { name, price: Number(price), images: secure_url_images };

	const newProductData = await Product.create(newProduct);
	res.status(StatusCodes.CREATED).json({
		msg: 'Create Product Successfully',
		data: newProductData,
	});
};

const deleteProductById = async (req: Request, res: Response) => {
	const { id: productId } = req.params;
	const deletedProduct = await Product.findOneAndDelete({ _id: productId });

	if (!deletedProduct)
		throw new NotFoundError(`Not Found Product with id ${productId}`);

	res.status(StatusCodes.OK).json({
		msg: `Delete Product ${productId} Successfully`,
		data: deletedProduct,
	});
};

const updateProductById = async (req: Request, res: Response) => {
	const { id: productId } = req.params;
	const updatedProduct = await Product.findOneAndUpdate(
		{ _id: productId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedProduct)
		throw new NotFoundError(`Not Found Product with id ${productId}`);

	res.status(StatusCodes.OK).json({
		msg: `Update Product ${productId} Successfully`,
		data: updatedProduct,
	});
};

// const uploadImage = async (req: Request, res: Response) => {
// if (!req.files) throw new BadRequestError('Invalid Image');
// 	const file = req.files.image as UploadedFile;
// 	const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
// 		use_filename: true,
// 		folder: 'file-upload',
// 	});
// 	fs.unlinkSync(file.tempFilePath);
// 	res.status(StatusCodes.CREATED).json({
// 		msg: 'Upload Image Successfully',
// 		image: { src: result.secure_url },
// 	});
// };

const uploadImage = async (req: Request, res: Response) => {
	const images = req.body.images;

	const secureUrlImagesCloudinary = await storeImagesInCloudinary(images);

	res.status(StatusCodes.CREATED).json({
		msg: 'Upload Image Successfully',
	});
};

export {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProductById,
	updateProductById,
	uploadImage,
};
