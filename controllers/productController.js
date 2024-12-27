import uploadeImages from "../helpers/CloudinaryHelper.js";
import generatingId from "../helpers/IdGenerator.js";
import {
  findProductByIdService,
  productCreateService,
  productDeleteService,
} from "../services/productServices.js";

export let productCreateController = async (req, res) => {
  if (Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "please upload file" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "All fields are required" }); // Use 400 instead of 500
  }

  try {
    let generatedId = generatingId("PROD");
    req.body.productId = generatedId;
    const imagePaths = req.files.map((file) => file.path);
    const uploadedImages = await uploadeImages(imagePaths);  // here the img path is going in the cloudeinary function 
    req.body.images = uploadedImages.map((img) => img.secure_url); // destructure and assigning the value in 

    const newProduct = await productCreateService(req.body);
    if (newProduct) {
      return res
        .status(201)
        .json({ message: `Product created successfully`, product: newProduct });
    } else {
      return res.status(400).json({ message: "Failed to create product" }); // Better response status
    }
  } catch (error) {
    console.error("Error occurred while creating product:", error.message);
    return res.status(500).json({ message: "Internal server error" }); // Respond with 500 for unexpected errors
  }
};

export let productFindingController = async (req, res) => {
  let id = req.params.id;
  try {
    let findProduct = await findProductByIdService(id);
    if (!findProduct) {
      res.status(404).json({ message: "faild to find product" });
    }
    res.status(200).json({ data: findProduct });
  } catch (error) {
    console.log(
      "error occured while finding product by id from controllers" +
        error.message
    );
    res.status(500).json({ message: "server error" });
  }
};

export let productDeleteController = async (req, res) => {
  let { id } = req.params;

  try {
    let deletedProduct = await productDeleteService(id);
    if (!deletedProduct) {
      //IF PRODUCT NOT FOUND
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(
      "Error occurred while deleting product from controller: " + error.message
    );
    res.status(500).json({ message: "Server error" });
  }
};
