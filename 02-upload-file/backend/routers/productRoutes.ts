import express from 'express';

import {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProductById,
	updateProductById,
	uploadImage,
} from '../controllers/ProductControllers';

import { checkFileMiddleware } from '../middlewares';

const router = express.Router();

router.route('/').get(getAllProducts).post(checkFileMiddleware, createProduct);

router.route('/upload').post(checkFileMiddleware, uploadImage);

router
	.route('/:id')
	.get(getProductById)
	.delete(deleteProductById)
	.put(updateProductById);

export default router;
