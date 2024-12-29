import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
    productId:{type:String,required:true,default:0},
    productName: { type: String, required: true }, 
    // public_id:{type:String,required: true },
    productDescription: { type: String, required: true }, 
    brand: { type: String, required: true },
    model: { type: String, required: true },
    mrp: { type: Number, required: true },
    offerPrice:{type:String,required:true},
    category: { type: String, required: true }, 
    stock: { type: Number, required: true, default: 0 }, 
    images: [
        {
          url: { type: String, required: true }, 
          public_id: { type: String, required: true }, 
          _id:false
        },
    

      ],
    ratings: { type: Number, min: 0, max: 5, default: 0 }, 
    discount: { type: Number, min: 0, max: 100, default: 0 }, 
    createdAt: { 
        type: Date, 
        default: Date.now, 
        set: (value) => {
            if (typeof value === 'string') {
                return new Date(value.trim()); // Trim and convert to Date
            }
            return value;
        }
    },});



let productModel = mongoose.model('Product', productSchema);

export default productModel;



