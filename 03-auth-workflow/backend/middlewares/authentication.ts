import { Request, Response, NextFunction } from 'express';

const authenticateMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

const authorizeMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export { authenticateMiddleware, authorizeMiddleware };
