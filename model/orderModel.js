import mongoose from "mongoose";

let orderSchema = mongoose.Schema(
  {
    // Link the order to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    // List of items in the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        name: {
          type: String,
          required: true, // For quick display without extra database calls
        },
        image: {
          type: String, // Store product image URL
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // Total amount of the order
    totalAmount: {
      type: Number,
      required: true,
    },

    // Order status tracking
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // Shipping details
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    // Payment details
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    // Delivery details
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;
