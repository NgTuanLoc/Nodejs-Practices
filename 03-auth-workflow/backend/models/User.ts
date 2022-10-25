import mongoose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: 'admin' | 'user';
	verificationToken: string;
	isVerified: boolean;
	verifiedDate: Date;
	resetPasswordToken: string;
	resetPasswordTokenExpirationDate: Date | null;
	comparePassword: (inputPassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		minLength: [5, 'Name can not be less than 10 characters'],
		maxlength: [30, 'Name can not be more than 30 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please provided email'],
		unique: [true, 'Email has been already used!'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provided valid email!',
		},
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minLength: [6, 'Password must be more than 6 characters'],
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	verificationToken: { type: String },
	isVerified: { type: Boolean, default: false },
	verifiedDate: {
		type: Date,
	},
	resetPasswordToken: { type: String },
	resetPasswordTokenExpirationDate: {
		type: Date,
	},
});

// Custom build method for user Schema
// Hash password
UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
UserSchema.methods.comparePassword = async function (inputPassword: string) {
	const isMatch = await bcrypt.compare(inputPassword, this.password);
	return isMatch;
};

export default mongoose.model<IUser>('User', UserSchema);
