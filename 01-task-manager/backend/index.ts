import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';

// Connect to database
import { connectDB } from './db/connect';

// Router
import TaskRouters from './routers/taskRoutes';

// Error Handler Middlewares
import { notFoundMiddleware, errorHandlerMiddleware } from './middlewares';

// Config
dotenv.config();
let whitelist = ['http://localhost:3000', 'http://example2.com']; // Only these domain can access API
let corsOptionsDelegate = function (req: Request, callback: any) {
	var corsOptions;
	if (whitelist.indexOf(req.headers.origin as string) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

const app: Express = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT;

colors.setTheme({
	server: ['brightGreen', 'bgBrightMagenta', 'bold'],
	database: ['brightGreen', 'bgBrightCyan', 'bold'],
	error: ['bgBrightRed', 'underline'],
});

// Useful Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.get('/', (req: Request, res: Response) => {
	res.send('Task Manager API');
});

// Routers
app.use('/api/v1/tasks', TaskRouters);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
	connectDB(process.env.MONGO_URI as string);
	console.log(
		colors.bgYellow.blue.bold(
			`⚡️[server]: Server is running at https://localhost:${PORT}`
		)
	);
});
