import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';

// Connect to database
import { connectDB } from './db/connect';

// Router
import UserRouters from './routers/userRoutes';
import AuthRouters from './routers/authRoutes';

// Error Handler Middlewares
import { notFoundMiddleware, errorHandlerMiddleware } from './middlewares';

dotenv.config();

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
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Auth Workflow Server');
});

// Routers
app.use('/api/v1/users', UserRouters);
app.use('/api/v1/auth', AuthRouters);
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
