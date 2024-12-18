import express from "express";
import { productCreateControllers } from "../controllers/productController.js";
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
  productCreateControllers
);

export default productRoutes;
