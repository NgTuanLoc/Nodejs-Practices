"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.updateProductById = exports.deleteProductById = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
// import { UploadedFile } from 'express-fileupload/index';
const errors_1 = require("../errors");
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Product_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: 'Get All Products Successfully',
        data,
    });
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const foundedProduct = yield Product_1.default.findOne({ _id: productId });
    if (!foundedProduct)
        throw new errors_1.NotFoundError(`Not Found Product with id ${productId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Get Product ${productId} Successfully`,
        data: foundedProduct,
    });
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, images } = req.body;
    const secure_url_images = yield (0, utils_1.storeImagesInCloudinary)(images);
    const newProduct = { name, price: Number(price), images: secure_url_images };
    const newProductData = yield Product_1.default.create(newProduct);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Create Product Successfully',
        data: newProductData,
    });
});
exports.createProduct = createProduct;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const deletedProduct = yield Product_1.default.findOneAndDelete({ _id: productId });
    if (!deletedProduct)
        throw new errors_1.NotFoundError(`Not Found Product with id ${productId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Delete Product ${productId} Successfully`,
        data: deletedProduct,
    });
});
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const updatedProduct = yield Product_1.default.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedProduct)
        throw new errors_1.NotFoundError(`Not Found Product with id ${productId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Update Product ${productId} Successfully`,
        data: updatedProduct,
    });
});
exports.updateProductById = updateProductById;
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
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const images = req.body.images;
    const secureUrlImagesCloudinary = yield (0, utils_1.storeImagesInCloudinary)(images);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Upload Image Successfully',
    });
});
exports.uploadImage = uploadImage;
