"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Connect your authentication API here.
    console.log("Login form ready for API integration");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf9f6] px-5 py-8 text-[#292820] sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#777166] transition hover:text-[#927650]"
          >
            <FiArrowLeft size={16} />
            Back to Zivora
          </Link>

          <div className="mx-auto grid max-w-[1000px] overflow-hidden rounded-xl border border-[#e9e5dd] bg-white shadow-sm md:mt-10 md:grid-cols-2">
            {/* Brand panel */}
            <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-[#292820] p-10 text-white md:flex lg:p-14">
              <div>
                <Link
                  href="/"
                  className="font-serif text-3xl tracking-[0.16em]"
                >
                  ZIVORA
                </Link>
                <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#d8c2a1]">
                  The art of living
                </p>
              </div>

              <div className="relative z-10">
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#d8c2a1]">
                  Welcome back
                </p>
                <h1 className="font-serif text-4xl leading-tight lg:text-5xl">
                  Beautiful things
                  <br />
                  are waiting for you.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-7 text-[#c6beb0]">
                  Sign in to explore your favourites, manage orders, and keep
                  your wishlist close.
                </p>
              </div>

              <p className="text-[10px] tracking-wider text-[#aaa294]">
                THOUGHTFULLY CURATED. BEAUTIFULLY YOURS.
              </p>

              <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border border-[#d8c2a1]/20" />
              <div className="absolute -bottom-12 -right-4 h-52 w-52 rounded-full border border-[#d8c2a1]/20" />
            </div>

            {/* Login form */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">
              <Link
                href="/"
                className="mb-10 font-serif text-2xl tracking-[0.15em] md:hidden"
              >
                ZIVORA
              </Link>

              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
                Your account
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl">Welcome back.</h2>

              <p className="mt-3 text-sm leading-6 text-[#777166]">
                Sign in to continue your Zivora experience.
              </p>

              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-sm border border-[#e4dfd5] bg-[#fdfcf9] px-4 py-3.5 text-sm outline-none transition focus:border-[#a58a65] focus:ring-1 focus:ring-[#a58a65]/20"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-medium">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#927650] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-sm border border-[#e4dfd5] bg-[#fdfcf9] px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-[#a58a65] focus:ring-1 focus:ring-[#a58a65]/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777166] hover:text-[#292820]"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#292820] py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#927650]"
                >
                  Sign in
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-[#777166]">
                New to Zivora?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#927650] hover:underline"
                >
                  Create an account
                </Link>
              </p>

              <p className="mt-8 text-center text-[10px] leading-5 text-[#999185]">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
