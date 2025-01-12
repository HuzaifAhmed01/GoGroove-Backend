import generatingId from "../helpers/IdGenerator.js";
import {
  allProductfindingService,
  findProductByIdService,
  productCreateService,
  productDeleteService,
  productSearchingService,
} from "../services/productServices.js";

import {
  deleteImagesFromCloude,
  uploadeImages,
} from "../helpers/CloudinaryHelper.js";

// for creating product
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
    const uploadedImages = await uploadeImages(imagePaths); // here the img path is going in the cloudeinary function

    req.body.images = uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    const newProduct = await productCreateService(req.body);
    if (newProduct) {
      console.log("product inserted");
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
// for finding product by id
export let productFindingController = async (req, res) => {
  let id = req.params.id;
  try {
    let findProduct = await findProductByIdService(id);
    if (!findProduct) {
      res.status(404).json({ message: "faild to find product" });
    }
    res.status(200).json({ product: findProduct });
  } catch (error) {
    console.log(
      "error occured while finding product by id from controllers" +
        error.message
    );
    res.status(500).json({ message: "server error" });
  }
};
// for searching product by keys
export const productSearchingController = async (req, res) => {
  try {
    // console.log('from controllers '+req.query.keys);
    let searchingRegex = {
      $or: [{ productName: { $regex: req.query.keys, $options: "i" } }],

    };

    let searchedItems = await productSearchingService(searchingRegex);
    if (!searchedItems) {
      res.status(400).json({ message: "cannot find product" });
    }
    res
      .status(200)
      .json({ success: true, message: "product found", data: searchedItems });
  } catch (error) {
    console.log("error occured while searching product in the controllers"+error.message);
  }
};
// for deleting product by id
export let productDeleteController = async (req, res) => {
  let productId = req.params.id;

  try {
    // sending the id to find  the product first to get images public id;

    let product = await findProductByIdService(productId);

    let deletingImages = product.images.map((image) => {
      deleteImagesFromCloude(image.public_id); // passing public id to cloudinary to delete img with map cause contain array of imgs
    });
    await Promise.all(deletingImages); // resolving all promise which
    let deleteProduct = await productDeleteService(productId);
    if (deleteProduct) {
      return res.status(200).json({ message: "Product deleted successfully" });
    }

    res.status(400).json({ message: "failed to delete product" });
  } catch (error) {
    console.error(
      "Error occurred while deleting product from controller: " + error.message
    );
    res.status(500).json({ message: "Server error" });
  }
};
// for finding all products 
export let allProductFindingController = async (req, res) => {
  try {
    let allData = await allProductfindingService();
    if (!allData) {
      res.status(400).json({ message: "failed to find product" });
    }
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      allProducts: allData,
    });
  } catch (error) {
    console.log("error occured while finding all product " + error.message);
    res.status(500).json({ message: "server error" });
  }
};
