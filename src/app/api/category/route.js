import connectDB from "@/config/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})

      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: categories.length,
        data: categories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET categories error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      { status: 500 },
    );
  }
}

// POST: Create a category
export async function POST(request) {
  try {
    await connectDB();
    const categoryData = await request.json();

    const category = await Category.create(categoryData);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
      },

      { status: 201 },
    );
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "This category name already exists.",
      },
      { status: 409 },
    );
  }
}
