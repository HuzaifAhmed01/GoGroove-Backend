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
