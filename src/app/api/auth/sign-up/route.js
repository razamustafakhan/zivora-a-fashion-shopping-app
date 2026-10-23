import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, password } = await req.json();

    // Validate fields
    if (!fullName || !email || !password) {
      return NextResponse.json(
        {success:false,
             message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
       
        { success:false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(

        {
            success:false,
            message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success:true,
        message: "Account created  successfully",
       
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}