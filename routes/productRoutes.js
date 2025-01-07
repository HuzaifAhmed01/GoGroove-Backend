import express from "express";
import {
  allProductFindingController,
  productCreateController,
  productDeleteController,
  productFindingController,
  productSearchingController,
} from "../controllers/productController.js";
import multer from "multer";

let productRoutes = express.Router();

const uploads = multer({
  storage: multer.diskStorage({
    destination: (req, images, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, images, cb) => {
      cb(null, `${Date.now()}-${images.originalname}`);
    },
  }),
});

productRoutes.post(
  "/createProduct",
  uploads.array("images", 4),
  productCreateController
);

productRoutes.get("/findProduct/:id", productFindingController);
productRoutes.get("/searchProducts/:keys",productSearchingController);
productRoutes.delete("/deleteProduct/:id", productDeleteController);
productRoutes.get("/allProducts", allProductFindingController);

export default productRoutes;
