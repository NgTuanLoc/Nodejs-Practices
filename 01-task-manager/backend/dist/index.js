"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
colors_1.default.setTheme({
    server: ['brightGreen', 'bgBrightMagenta', 'bold'],
    database: ['brightGreen', 'bgBrightCyan', 'bold'],
    error: ['bgBrightRed', 'underline'],
});
// Useful Middleware
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(PORT, () => {
    console.log(colors_1.default.bgYellow.blue.bold(`⚡️[server]: Server is running at https://localhost:${PORT}`));
});
