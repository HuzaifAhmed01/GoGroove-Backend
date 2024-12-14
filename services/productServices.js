import productModel from "../model/productModel.js";

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
