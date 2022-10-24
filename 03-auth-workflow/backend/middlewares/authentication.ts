import { Request, Response, NextFunction } from 'express';
import { UnAuthenticatedError } from '../errors';

import Token from '../models/Token';
import { attachCookiesToResponse, verifyToken } from '../utils';

const authenticateMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { refreshCookie, accessCookie } = req.signedCookies;

	try {
		if (accessCookie) {
			const payload = verifyToken(accessCookie);
			req.body.user = payload;
			return next();
		}

		const payload = verifyToken(refreshCookie) as any;
		const existingToken = await Token.findOne({
			user: payload?.user.id,
			refreshToken: payload.refreshToken,
		});

		if (!existingToken || !existingToken?.isValid) {
			throw new UnAuthenticatedError('Authentication Invalid');
		}

		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken as string,
		});
		req.body.user = payload.user;

		next();
	} catch (error) {
		throw new UnAuthenticatedError('Authentication Invalid');
	}
};

const authorizeMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export { authenticateMiddleware, authorizeMiddleware };
