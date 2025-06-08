import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (path) => {
  try {

    if (!path) return null;


    // upload file on cloudinary
   const upload =   await cloudinary.uploader.upload(
      path,
      {
        resource_type: "auto",
      }
    )
    //after uploading on cloudinary
    console.log(`file uploaded on cloudinary ${upload.public_id}`);
    

    fs.unlinkSync(path)

    return upload

  } catch (error) {
    fs.unlinkSync(path)
    return null
  }
}


export default uploadOnCloudinary;
