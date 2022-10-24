import { IUser } from '../models/User';

export const createUserToken = (user: IUser) => {
	return { id: user.id, email: user.email, role: user.role };
};
