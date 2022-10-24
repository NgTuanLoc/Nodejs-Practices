import nodemailer, { SendMailOptions } from 'nodemailer';

const config = {
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'jake.kshlerin79@ethereal.email',
		pass: 'z7RrUmhx3FbnK1GbZf',
	},
};

export const sendEmail = async ({ to, subject, html }: SendMailOptions) => {
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport(config);

	// send mail with defined transport object
	return transporter.sendMail({
		from: '"NgTuanLoc" <tuanloc2352000@gmail.com>', // sender address
		to,
		subject,
		html,
	});
};
