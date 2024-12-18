import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

let uploadeImages = async (imagesPaths, folderName = "Product-Images") => {
  try {
    let imagesUploading = await imagesPaths.map(async(path) => {
      return await cloudinary.uploader.upload(path, { folder: folderName });
    });
    let uploadedImages = await Promise.all(imagesUploading);
    console.log("images uploaded successfully");
    return uploadedImages;
  } catch (error) {
    console.log("error occured while uploading images"+error.message);
  }
};

export default uploadeImages;
