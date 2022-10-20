"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskControllers_1 = require("../controllers/TaskControllers");
const router = express_1.default.Router();
router.route('/').get(TaskControllers_1.getAllTasks).post(TaskControllers_1.CreateTask);
router
    .route('/:id')
    .get(TaskControllers_1.getTaskById)
    .delete(TaskControllers_1.deleteTaskById)
    .put(TaskControllers_1.updateTaskById);
exports.default = router;
