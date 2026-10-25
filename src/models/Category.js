import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    subCategoryName: [
      {
        type: String,
        trim: true,
      },
    ],

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // image: {
    //   data: Buffer,
    //   contentType: {
    //     type: String,
    //     enum: ["image/jpeg", "image/png", "image/webp"],
    //   },
    // },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
