import { response, Response } from 'express';
import jwt from 'jsonwebtoken';

const createJWT = (payload: any) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

const verifyToken = (token: string) =>
	jwt.verify(token, process.env.JWT_SECRET as string);

interface IPayload {
	res: Response;
	user: any;
	refreshToken: string;
}

const attachCookiesToResponse = ({ res, user, refreshToken }: IPayload) => {
	const ONE_DAY = 1000 * 60 * 60 * 24;
	const accessTokenJWT = createJWT(user);
	const refreshTokenJWT = createJWT({ user, refreshToken });

	res.cookie('accessCookie', accessTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		maxAge: 1000,
	});

	res.cookie('refreshCookie', refreshTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		expires: new Date(Date.now() + ONE_DAY),
	});
};

export { createJWT, verifyToken, attachCookiesToResponse };
