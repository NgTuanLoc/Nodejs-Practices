"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.notFoundMiddleware = void 0;
const notFoundMiddleware_1 = require("./notFoundMiddleware");
Object.defineProperty(exports, "notFoundMiddleware", { enumerable: true, get: function () { return notFoundMiddleware_1.notFoundMiddleware; } });
const errorHandlerMiddleware_1 = require("./errorHandlerMiddleware");
Object.defineProperty(exports, "errorHandlerMiddleware", { enumerable: true, get: function () { return errorHandlerMiddleware_1.errorHandlerMiddleware; } });
