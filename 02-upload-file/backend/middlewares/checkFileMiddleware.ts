import { Request, Response, NextFunction } from 'express';
import path from 'path';

import { BadRequestError } from '../errors';

export const checkFileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const files = req.files as Express.Multer.File[];
	const filetypes = /jpg|jpeg|png/;
	req.body.images = [];

	for (const file of files) {
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);
		if (!extname && !mimetype) {
			throw new BadRequestError('Image File Only!');
		} else {
			req.body.images.push(file.path);
		}
	}
	next();
};
