"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const connectDB = (url) => {
    mongoose_1.default.connect(url);
    console.log(colors_1.default.bgGreen.bold('Connect to Database successfully'));
};
exports.connectDB = connectDB;
