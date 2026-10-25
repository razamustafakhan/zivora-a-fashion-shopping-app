import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/config/db";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id, index } = await params;
    const imageIndex = Number(index);

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 },
      );
    }

    // Validate image index
    if (!Number.isInteger(imageIndex) || imageIndex < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid image index" },
        { status: 400 },
      );
    }

    // Find product
    const product = await Product.findById(id).select("images");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    // Get image at the requested index
    const image = product.images?.[imageIndex];

    if (!image?.data) {
      return NextResponse.json(
        {
          success: false,
          message: `Image ${imageIndex} not found`,
        },
        { status: 404 },
      );
    }

    const data = image.data;
    let buffer;

    // Convert stored image data to a Node.js Buffer
    if (Buffer.isBuffer(data)) {
      buffer = Buffer.from(data);
    } else if (data?._bsontype === "Binary") {
      if (typeof data.value === "function") {
        buffer = Buffer.from(data.value(true));
      } else if (data.buffer) {
        buffer = Buffer.from(data.buffer).subarray(
          0,
          data.position ?? data.buffer.length,
        );
      }
    } else if (data instanceof Uint8Array) {
      buffer = Buffer.from(data);
    }

    if (!buffer || buffer.length === 0) {
      console.error("Invalid image data:", {
        productId: id,
        imageIndex,
        imageName: image.name,
      });

      return NextResponse.json(
        { success: false, message: "Image data is empty or invalid" },
        { status: 500 },
      );
    }

    // Debug information
    console.log("Image response:", {
      productId: id,
      imageIndex,
      imageName: image.name,
      contentType: image.contentType,
      bufferLength: buffer.length,
      firstBytes: buffer.subarray(0, 4).toString("hex"),
    });

    // Return image bytes
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": image.contentType || "image/jpeg",
        "Content-Length": String(buffer.length),
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Product image API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to load image",
      },
      { status: 500 },
    );
  }
}
