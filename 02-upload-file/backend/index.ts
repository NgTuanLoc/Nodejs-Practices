import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';

// Connect to database
import { connectDB } from './db/connect';

// Router
import ProductRoutes from './routers/productRoutes';

// Error Handler Middlewares
import { notFoundMiddleware, errorHandlerMiddleware } from './middlewares';

// Config
dotenv.config();
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

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
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Upload File Server');
});

// Routers
app.use('/api/v1/products', ProductRoutes);
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
