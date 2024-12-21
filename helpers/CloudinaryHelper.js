import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

let uploadImages = async (imagesPaths, folderName = "Product-Images") => {
  try {
    let imagesUploading = imagesPaths.map((path) => {
      return cloudinary.uploader.upload(path, {
        folder: folderName,});
    });

    let uploadedImages = await Promise.all(imagesUploading);
    console.log("Images uploaded successfully:", uploadedImages);
    return uploadedImages;
  } catch (error) {
    console.error("Error occurred while uploading images: " + error.message);
  }
};

export default uploadImages;
