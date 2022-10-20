"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductControllers_1 = require("../controllers/ProductControllers");
const router = express_1.default.Router();
router.route('/').get(ProductControllers_1.getAllTasks).post(ProductControllers_1.CreateTask);
router
    .route('/:id')
    .get(ProductControllers_1.getTaskById)
    .delete(ProductControllers_1.deleteTaskById)
    .put(ProductControllers_1.updateTaskById);
exports.default = router;
