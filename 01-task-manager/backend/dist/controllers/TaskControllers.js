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
exports.updateTaskById = exports.deleteTaskById = exports.CreateTask = exports.getTaskById = exports.getAllTasks = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Task_1 = __importDefault(require("../models/Task"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Task_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: 'Get All Tasks Successfully',
        data,
    });
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const foundedTask = yield Task_1.default.findOne({ _id: taskId });
    if (!foundedTask)
        throw new errors_1.NotFoundError(`Not Found task with id ${taskId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Get Task ${taskId} Successfully`,
        data: foundedTask,
    });
});
exports.getTaskById = getTaskById;
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTaskData = yield Task_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Create Task Successfully',
        data: newTaskData,
    });
});
exports.CreateTask = CreateTask;
const deleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const deletedTask = yield Task_1.default.findOneAndDelete({ _id: taskId });
    if (!deletedTask)
        throw new errors_1.NotFoundError(`Not Found task with id ${taskId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Delete Task ${taskId} Successfully`,
        data: deletedTask,
    });
});
exports.deleteTaskById = deleteTaskById;
const updateTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const updatedTask = yield Task_1.default.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedTask)
        throw new errors_1.NotFoundError(`Not Found task with id ${taskId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Update Task ${taskId} Successfully`,
        data: updatedTask,
    });
});
exports.updateTaskById = updateTaskById;
