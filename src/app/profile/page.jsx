"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiMail,
  FiPhone,
  FiEdit3,
} from "react-icons/fi";
import { FaShield } from "react-icons/fa6";

const initialProfile = {
  fullName: "",
  email: "",
  phone: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(true);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      profile.fullName.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim()) ||
      profile.phone.replace(/\D/g, "").length < 10
    ) {
      setMessage("Please enter a valid name, email, and phone number.");
      return;
    }

    // Connect your profile update API here later.
    setEditing(false);
    setMessage("Details validated. Connect your backend to save changes.");
  }

  const inputClass =
    "mt-2 w-full border border-[#e4dfd5] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#927650]";

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292820]">
      {/* Page header */}
      <section className="border-b border-[#e9e4da] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#777166] transition hover:text-[#927650]"
          >
            <FiArrowLeft size={15} />
            Back to home
          </Link>

          <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-[#927650]">
            Your personal space
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">My account.</h1>

          <p className="mt-3 text-sm leading-6 text-[#777166]">
            Manage your details and keep your Zivora essentials organised.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[270px_1fr] lg:gap-12 lg:px-12 lg:py-14">
        {/* Sidebar navigation */}
        <aside>
          <div className="border border-[#e6e0d6] bg-white p-5 sm:p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2ede3] text-[#927650]">
              <FiUser size={24} />
            </div>

            <p className="mt-4 font-serif text-xl">
              {profile.fullName || "Welcome to Zivora"}
            </p>

            <p className="mt-1 break-all text-xs text-[#918575]">
              {profile.email || "Your account details"}
            </p>

            <div className="mt-6 h-px bg-[#e6e0d6]" />

            <nav className="mt-3 space-y-1">
              <Link
                href="/profile"
                className="flex items-center gap-3 bg-[#f7f4ed] px-3 py-3 text-sm text-[#927650]"
              >
                <FiUser size={17} />
                My profile
              </Link>

              <Link
                href="/profile/addresses"
                className="flex items-center gap-3 px-3 py-3 text-sm text-[#777166] transition hover:bg-[#faf9f6] hover:text-[#927650]"
              >
                <FiMapPin size={17} />
                Saved addresses
                <FiArrowRight className="ml-auto" size={15} />
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 px-3 py-3 text-sm text-[#777166] transition hover:bg-[#faf9f6] hover:text-[#927650]"
              >
                <FiPackage size={17} />
                My orders
                <FiArrowRight className="ml-auto" size={15} />
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 px-3 py-3 text-sm text-[#777166] transition hover:bg-[#faf9f6] hover:text-[#927650]"
              >
                <FiHeart size={17} />
                Wishlist
                <FiArrowRight className="ml-auto" size={15} />
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main profile panel */}
        <div className="min-w-0">
          <section className="border border-[#e6e0d6] bg-white p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#927650]">
                  Account information
                </p>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                  Personal details
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#918575]">
                  Keep your contact information up to date.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setMessage("");
                  }}
                  className="inline-flex items-center gap-2 border border-[#ded7ca] px-4 py-2.5 text-xs transition hover:border-[#927650]"
                >
                  <FiEdit3 size={14} />
                  Edit details
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="fullName" className="text-xs font-medium">
                  Full name
                </label>

                <div className="relative">
                  <FiUser
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a59b8c]"
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!editing}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-11 disabled:bg-[#faf9f6] disabled:text-[#777166]`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-medium">
                  Email address
                </label>

                <div className="relative">
                  <FiMail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a59b8c]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputClass} pl-11 disabled:bg-[#faf9f6] disabled:text-[#777166]`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="text-xs font-medium">
                  Phone number
                </label>

                <div className="relative">
                  <FiPhone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a59b8c]"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    className={`${inputClass} pl-11 disabled:bg-[#faf9f6] disabled:text-[#777166]`}
                  />
                </div>
              </div>

              {message && (
                <div
                  role="status"
                  className="border border-[#e6e0d6] bg-[#faf9f6] p-4 text-xs leading-5 text-[#66553c]"
                >
                  {message}
                </div>
              )}

              {editing && (
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setProfile(initialProfile);
                      setMessage("");
                    }}
                    className="border border-[#ded7ca] px-6 py-4 text-xs transition hover:bg-[#faf9f6]"
                  >
                    Clear form
                  </button>

                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 bg-[#292820] px-6 py-4 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#927650]"
                  >
                    <FiCheck size={16} />
                    Validate details
                  </button>
                </div>
              )}
            </form>

            <div className="mt-10 border-t border-[#e6e0d6] pt-6">
              <div className="flex items-start gap-3">
                <FaShield
                  size={17}
                  className="mt-0.5 shrink-0 text-[#927650]"
                />

                <p className="text-xs leading-6 text-[#918575]">
                  Your personal details should be accessible only to you after
                  authentication. Connect this page to your account API before
                  using it for real customer data.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
