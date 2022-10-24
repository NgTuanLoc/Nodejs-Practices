import { sendEmail } from './SendEmail';

interface IVerificationEmail {
	name: string;
	email: string;
	verificationToken: string;
	origin: string;
}

export const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
	origin,
}: IVerificationEmail) => {
	const verifyEmailUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
	const message = `
  <h1>Hello ${name} </h1>
  <p>Please confirm your email by clicking on the following link : <a href='${verifyEmailUrl}'>Verify Email</a></p>`;

	return sendEmail({ to: email, subject: 'Email Verification', html: message });
};
