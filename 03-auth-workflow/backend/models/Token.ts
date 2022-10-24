import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema(
	{
		refreshToken: { type: String },
		ip: { type: String, required: [true, 'Missing IP'] },
		userAgent: { type: String, required: [true, 'Missing userAgent'] },
		isValid: { type: Boolean, default: true },
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Missing user reference'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Token', TokenSchema);
