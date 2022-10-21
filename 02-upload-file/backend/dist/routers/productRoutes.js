"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductControllers_1 = require("../controllers/ProductControllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.route('/').get(ProductControllers_1.getAllProducts).post(ProductControllers_1.CreateProduct);
router.route('/upload').post(middlewares_1.checkFileMiddleware, ProductControllers_1.uploadImage);
router
    .route('/:id')
    .get(ProductControllers_1.getProductById)
    .delete(ProductControllers_1.deleteProductById)
    .put(ProductControllers_1.updateProductById);
exports.default = router;
