import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = (url: string) => {
	mongoose.connect(url);
	console.log(colors.bgGreen.bold('Connect to Database successfully'));
};
