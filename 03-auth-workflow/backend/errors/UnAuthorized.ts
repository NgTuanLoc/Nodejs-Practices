import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './CustomError';

export class UnAuthorizedError extends CustomAPIError {
	statusCode: StatusCodes;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}
