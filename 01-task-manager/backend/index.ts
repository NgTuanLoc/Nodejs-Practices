import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import 'express-async-errors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

colors.setTheme({
	server: ['brightGreen', 'bgBrightMagenta', 'bold'],
	database: ['brightGreen', 'bgBrightCyan', 'bold'],
	error: ['bgBrightRed', 'underline'],
});

// Useful Middleware
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
	console.log(
		colors.bgYellow.blue.bold(
			`⚡️[server]: Server is running at https://localhost:${PORT}`
		)
	);
});
