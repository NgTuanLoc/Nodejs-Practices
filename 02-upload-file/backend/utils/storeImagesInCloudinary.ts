import cloudinary from 'cloudinary';
import fs from 'fs';

export const storeImagesInCloudinary = async (images: any) => {
	const secureUrlImagesCloudinary: string[] = [];
	for (const image of images) {
		const result = await cloudinary.v2.uploader.upload(image, {
			use_filename: true,
			folder: 'file-upload',
		});
		secureUrlImagesCloudinary.push(result.secure_url);
		fs.unlinkSync(image);
	}
	return secureUrlImagesCloudinary;
};
