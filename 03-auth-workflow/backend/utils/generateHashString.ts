import crypto from 'crypto';

export const generateHashString = (payload: string) =>
	crypto.createHash('md5').update(payload).digest('hex');
