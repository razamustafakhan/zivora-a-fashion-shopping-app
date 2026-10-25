import mongoose from "mongoose";

const ProductImageSchema = new mongoose.Schema(
  {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp"],
    },
    name: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    brand: {
      type: String,
      trim: true,
      default: "",
    },

    sellingPrice: {
      type: Number,
    },

    originalPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      required: true,
    },

    sku: {
      type: String,
    },

    images: {
      type: [ProductImageSchema],
      // validate: {
      //   validator: (images) => images.length >= 1 && images.length <= 5,
      //   message: "A product must have between 1 and 5 images",
      // },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
