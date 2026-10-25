import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

export const runtime = "nodejs";

// PUT: Update category by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        { status: 400 },
      );
    }

    const contentType = request.headers.get("content-type") || "";

    let body = {};
    let image = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      body.categoryName = formData.get("categoryName");
      body.subCategoryName = formData.get("subCategoryName");
      body.description = formData.get("description");
      body.isActive = formData.get("isActive");

      const uploadedImage = formData.get("image");

      if (
        uploadedImage &&
        typeof uploadedImage !== "string" &&
        uploadedImage.size > 0
      ) {
        image = uploadedImage;
      }
    } else if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Use multipart/form-data or application/json.",
        },
        { status: 415 },
      );
    }

    const updateData = {};

    if (body.categoryName !== undefined) {
      if (typeof body.categoryName !== "string" || !body.categoryName.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "Category name cannot be empty.",
          },
          { status: 400 },
        );
      }

      updateData.categoryName = body.categoryName.trim();
    }

    if (body.subCategoryName !== undefined) {
      let subCategories = body.subCategoryName;

      if (typeof subCategories === "string") {
        try {
          subCategories = JSON.parse(subCategories);
        } catch {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid subcategory JSON.",
            },
            { status: 400 },
          );
        }
      }

      if (
        !Array.isArray(subCategories) ||
        !subCategories.every((item) => typeof item === "string" && item.trim())
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Subcategories must be an array of non-empty strings.",
          },
          { status: 400 },
        );
      }

      updateData.subCategoryName = subCategories.map((item) => item.trim());
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Description must be a string.",
          },
          { status: 400 },
        );
      }

      updateData.description = body.description.trim();
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive === "boolean") {
        updateData.isActive = body.isActive;
      } else if (body.isActive === "true" || body.isActive === "false") {
        updateData.isActive = body.isActive === "true";
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "isActive must be a boolean.",
          },
          { status: 400 },
        );
      }
    }

    if (image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only JPEG, PNG, and WebP images are allowed.",
          },
          { status: 400 },
        );
      }

      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Image size must not exceed 5 MB.",
          },
          { status: 400 },
        );
      }

      updateData.image = {
        data: Buffer.from(await image.arrayBuffer()),
        contentType: image.type,
      };
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid fields provided for update.",
        },
        { status: 400 },
      );
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).select("-image.data");

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully.",
        category,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT category error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This category name already exists.",
        },
        { status: 409 },
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category.",
      },
      { status: 500 },
    );
  }
}

// DELETE: Delete category by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        { status: 400 },
      );
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE category error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category.",
      },
      { status: 500 },
    );
  }
}
