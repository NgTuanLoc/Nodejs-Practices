"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileMiddleware = void 0;
const path_1 = __importDefault(require("path"));
const errors_1 = require("../errors");
const checkFileMiddleware = (req, res, next) => {
    const files = req.files;
    const filetypes = /jpg|jpeg|png/;
    req.body.images = [];
    for (const file of files) {
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (!extname && !mimetype) {
            throw new errors_1.BadRequestError('Image File Only!');
        }
        else {
            req.body.images.push(file.path);
        }
    }
    next();
};
exports.checkFileMiddleware = checkFileMiddleware;
