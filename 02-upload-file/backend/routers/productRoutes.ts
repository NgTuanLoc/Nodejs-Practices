import express from 'express';

import {
	getAllProducts,
	getProductById,
	CreateProduct,
	deleteProductById,
	updateProductById,
	uploadImage,
} from '../controllers/ProductControllers';

const router = express.Router();

router.route('/').get(getAllProducts).post(CreateProduct);

router.route('/upload').post(uploadImage);

router
	.route('/:id')
	.get(getProductById)
	.delete(deleteProductById)
	.put(updateProductById);

export default router;
