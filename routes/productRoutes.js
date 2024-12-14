import express from 'express';
import { productCreateControllers } from '../controllers/productController.js';
// import multer from 'multer';

let productRoutes = express.Router();

// const upload = multer({
//     storage:multer.diskStorage({
//         destination:(req,file,cb)=>{
//             cb(null,"./uploads");
//         },
//         fileName:(req,file,cb)=>{
//             cb(null ,Date.now + '-' + file.originalname)
//         },
       
//     }),
// })

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "./uploads"); // Directory to store uploaded files
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + '-' + file.originalname); // Unique filename
//         }
//     }),
// });


productRoutes.post('/createProduct',productCreateControllers);


export default productRoutes;