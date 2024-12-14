import { productCreateService } from "../services/productServices.js";

export const productCreateControllers = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "All fields are required" }); // Use 400 instead of 500
    }

    try {
        const newProduct = await productCreateService(req.body);
        if (newProduct) {
            return res.status(201).json({ message: `Product created successfully`, product: newProduct });
        } else {
            return res.status(400).json({ message: "Failed to create product" }); // Better response status
        }
    } catch (error) {
        console.error('Error occurred while creating product:', error.message);
        return res.status(500).json({ message: "Internal server error" }); // Respond with 500 for unexpected errors
    }
};
