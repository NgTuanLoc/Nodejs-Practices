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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
// Connect to database
const connect_1 = require("./db/connect");
// Router
const taskRoutes_1 = __importDefault(require("./routers/taskRoutes"));
// Error Handler Middlewares
const middlewares_1 = require("./middlewares");
// Config
dotenv_1.default.config();
let whitelist = ['http://localhost:3000', 'http://example2.com']; // Only these domain can access API
let corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.headers.origin) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const PORT = process.env.PORT;
colors_1.default.setTheme({
    server: ['brightGreen', 'bgBrightMagenta', 'bold'],
    database: ['brightGreen', 'bgBrightCyan', 'bold'],
    error: ['bgBrightRed', 'underline'],
});
// Useful Middleware
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptionsDelegate));
app.get('/', (req, res) => {
    res.send('Task Manager API');
});
// Routers
app.use('/api/v1/tasks', taskRoutes_1.default);
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, connect_1.connectDB)(process.env.MONGO_URI);
    console.log(colors_1.default.bgYellow.blue.bold(`⚡️[server]: Server is running at https://localhost:${PORT}`));
}));
