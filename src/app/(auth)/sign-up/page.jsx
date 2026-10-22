"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff, FiArrowLeft, FiCheck } from "react-icons/fi";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    // TODO: Connect to POST /api/auth/register.
    setError("Registration API is not connected yet.");
  }

  const inputClass =
    "w-full rounded-sm border border-[#e6e0d6] bg-[#fdfcf9] px-4 py-3.5 text-sm text-[#292820] outline-none transition placeholder:text-[#aaa397] focus:border-[#a58a65] focus:ring-1 focus:ring-[#a58a65]/20";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-4 py-8 sm:px-6 lg:py-12">
      <div className="w-full max-w-[1080px]">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs text-[#777166] transition hover:text-[#927650]"
        >
          <FiArrowLeft size={15} />
          Back to Zivora
        </Link>

        <div className="grid overflow-hidden rounded-lg border border-[#e8e2d8] bg-white shadow-[0_18px_70px_rgba(41,40,32,0.06)] md:grid-cols-2">
          {/* Brand panel */}
          <aside className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-[#292820] p-10 text-white lg:flex xl:p-14">
            <div className="relative z-10">
              <Link href="/" className="font-serif text-3xl tracking-[0.18em]">
                ZIVORA
              </Link>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#d8c2a1]">
                The art of living
              </p>
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="mb-5 block h-px w-10 bg-[#d8c2a1]" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d8c2a1]">
                A little something beautiful
              </p>
              <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.15]">
                Make room for
                <span className="block italic text-[#d8c2a1]">
                  lovely things.
                </span>
              </h1>
              <p className="mt-6 text-sm leading-7 text-[#c6beb0]">
                Discover thoughtful décor, celebration essentials, jewellery,
                and details that make every moment yours.
              </p>

              <div className="mt-8 space-y-3 text-xs text-[#e0d9cc]">
                {[
                  "Save your favourite finds",
                  "Keep track of your orders",
                  "Discover new collections",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FiCheck className="text-[#d8c2a1]" size={15} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="relative z-10 text-[9px] tracking-[0.18em] text-[#aaa294]">
              THOUGHTFULLY CURATED. BEAUTIFULLY YOURS.
            </p>

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-[#d8c2a1]/20" />
            <div className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 rounded-full border border-[#d8c2a1]/20" />
          </aside>

          {/* Registration form */}
          <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
            <Link
              href="/"
              className="mb-9 inline-block font-serif text-2xl tracking-[0.16em] lg:hidden"
            >
              ZIVORA
            </Link>

            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
              Become a member
            </p>

            <h2 className="mt-3 font-serif text-3xl font-normal text-[#292820] sm:text-4xl">
              Create account.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#777166]">
              Join us and find something lovely.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-[#403d35]"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-[#403d35]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-[#403d35]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    maxLength={128}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888174] transition hover:text-[#292820]"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-medium text-[#403d35]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888174] transition hover:text-[#292820]"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-xs leading-5 text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 bg-[#292820] px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#927650] focus:outline-none focus:ring-2 focus:ring-[#a58a65] focus:ring-offset-2"
              >
                Create account
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#777166]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#927650] underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-[10px] leading-5 text-[#999185]">
              By creating an account, you agree to our{" "}
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
          </section>
        </div>
      </div>
    </main>
  );
}
