import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request) {
  console.log(">>>>>>>>>>>>>>  this is running");
  console.log(request);
  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: "//:path*",
};
