"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide file name'],
    },
    price: {
        type: Number,
        requited: [true, 'Please provide price'],
    },
    image: {
        type: String,
        required: [true, 'Please provide image file'],
    },
});
exports.default = mongoose_1.default.model('Product', productSchema);
