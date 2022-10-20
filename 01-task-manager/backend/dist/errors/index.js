"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.CustomAPIError = void 0;
const CustomError_1 = require("./CustomError");
Object.defineProperty(exports, "CustomAPIError", { enumerable: true, get: function () { return CustomError_1.CustomAPIError; } });
const BadRequest_1 = require("./BadRequest");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return BadRequest_1.BadRequestError; } });
const NotFound_1 = require("./NotFound");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFound_1.NotFoundError; } });
