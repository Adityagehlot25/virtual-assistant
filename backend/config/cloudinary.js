import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath); // delete file after upload
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filepath); // delete file on error as well
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Cloudinary upload failed');
    }

}

export default uploadOnCloudinary;