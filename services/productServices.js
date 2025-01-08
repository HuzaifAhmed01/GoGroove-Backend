import productModel from "../model/productModel.js";


// for creating product
export let productCreateService = async (data) => {
  try {
    let createProduct = productModel({ ...data });
    let savedProduct = await createProduct.save();
    return savedProduct;
  } catch (error) {
    console.log(
      "error occured while creating product in the services " + error.message
    );
  }
};
// for finding product by id
export let findProductByIdService = async (id) => {
  try {
    let product = await productModel.findById(id);
    if (!product) {
      console.log("faild to find product in the service");
    }
    return product;
  } catch (error) {
    console.log("error occured while finding product by id" + error.message);
  }
};
// finding all product from db
export let allProductfindingService = async () => {
  try {
    let alldata = await productModel.find();
    return alldata;
  } catch (error) {
    console.log("error occured while finding all product" + error.message);
  }
};
// for searching product by keys
export const productSearchingService = async (keys) => {
  try {
    let searchedItems = await productModel.find(keys);
    return searchedItems;
  } catch (error) {
    console.error("Error in productSearchingService:", error.message);
    throw error; // Let the controller handle the error
  }
};
// for deleting product by id
export let productDeleteService = async (id) => {
  try {
    let deleteProduct = await productModel.findByIdAndDelete(id);
    if (!deleteProduct) console.log("failed to delet from services");
    console.log("product Deleted successfully");
    return deleteProduct;
  } catch (error) {
    console.log(
      "error occured while deleting product from services" + error.message
    );
  }
};
