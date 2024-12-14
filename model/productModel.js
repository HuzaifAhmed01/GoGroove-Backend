import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
    productId:{type:String,required:true,default:0},
    productName: { type: String, required: true }, 
    productDescription: { type: String, required: true }, 
    brand: { type: String, required: true },
    model: { type: String, required: true },
    mrp: { type: Number, required: true },
    offerPrice:{type:String,required:true},
    category: { type: String, required: true }, 
    stock: { type: Number, required: true, default: 0 }, 
    images: { type: [String], default: [] },
    ratings: { type: Number, min: 0, max: 5, default: 0 }, 
    discount: { type: Number, min: 0, max: 100, default: 0 }, 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }
});



let productModel = mongoose.model('Product', productSchema);

export default productModel;



