import cloudinary from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export let uploadeImages = async (
  imagesPaths,
  folderName = "Product-Images"
) => {
  try {
    let imagesUploading = imagesPaths.map((path) => {
      return cloudinary.uploader.upload(path, {
        folder: folderName,
      });
    });

    let uploadedImages = await Promise.all(imagesUploading);
    // console.log("Images uploaded successfully:", uploadedImages);
    return uploadedImages;
  } catch (error) {
    console.error("Error occurred while uploading images: " + error.message);
  }
};

export let deleteImagesFromCloude = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return "success";
  } catch (error) {
    console.log(
      "error occured while deleting uploaded images on the cloudinary"
    );
  }
};
