import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

// GET /api/products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .select("-images.data")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Fetch products error:", error);

    return NextResponse.json(
      { message: "Unable to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    console.log(formData);

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const brand = String(formData.get("brand") || "").trim();

    const sellingPrice = Number(formData.get("sellingPrice"));
    const originalPrice = Number(formData.get("originalPrice"));
    const stock = Number(formData.get("stock"));

    // if (!name || !description || !category) {
    //   return NextResponse.json(
    //     { message: "Name, description, and category are required" },
    //     { status: 400 },
    //   );
    // }

    if (
      !Number.isFinite(sellingPrice) ||
      !Number.isFinite(originalPrice) ||
      sellingPrice < 0 ||
      originalPrice < 0
    ) {
      return NextResponse.json(
        { message: "Enter valid product prices" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json(
        { message: "Stock must be a non-negative whole number" },
        { status: 400 },
      );
    }

    if (sellingPrice > originalPrice) {
      return NextResponse.json(
        { message: "Selling price cannot exceed original price" },
        { status: 400 },
      );
    }

    const files = formData.getAll("images");

    if (files.length < 1 || files.length > 5) {
      return NextResponse.json(
        { message: "Upload between 1 and 5 product images" },
        { status: 400 },
      );
    }

    const images = [];

    for (const file of files) {
      if (typeof file === "string" || typeof file.arrayBuffer !== "function") {
        return NextResponse.json(
          { message: "Invalid image upload" },
          { status: 400 },
        );
      }

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { message: "Images must be JPG, PNG, or WebP" },
          { status: 400 },
        );
      }

      if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { message: "Each image must be smaller than 5 MB" },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      images.push({
        data: buffer,
        contentType: file.type,
        name: file.name,
      });
    }

    const product = await Product.create({
      name,
      description,
      categoryId,
      brand,
      sellingPrice,
      originalPrice,
      stock,
      images,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { message: "Unable to create product" },
      { status: 500 },
    );
  }
}
