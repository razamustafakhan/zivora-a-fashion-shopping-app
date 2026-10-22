"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiShoppingBag,
  FiMenu,
  FiX,
  FiSearch,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Decor", href: "/categories/decor" },
    { name: "Fashion", href: "/categories/fashion" },
    { name: "Jewellery", href: "/categories/jewellery" },
    { name: "Our Story", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f6] text-[#24231f]">
      {" "}
      {/* Announcement bar */}{" "}
      <div className="flex items-center justify-center bg-[#292820] px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white sm:text-[11px]">
        {" "}
        Little things. Beautiful moments.{" "}
        <span className="mx-2 text-[#d9b989]">✦</span> Discover Zivora{" "}
      </div>
      {/* Main navbar */}
      <div className="border-b border-[#e9e5dd]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-start transition hover:text-[#a78354] md:hidden"
          >
            {open ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#625f57] transition-colors hover:text-[#b28a57]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Brand */}
          <Link
            href="/"
            aria-label="Zivora home"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block font-serif text-[29px] font-medium leading-none tracking-[0.13em] sm:text-[34px]">
              ZIVORA
            </span>
            <span className="mt-1.5 hidden text-[8px] font-medium uppercase tracking-[0.38em] text-[#a18b6b] sm:block">
              The art of living
            </span>
          </Link>

          {/* Desktop right navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#625f57] transition-colors hover:text-[#b28a57]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-4 sm:gap-5">
            <button
              aria-label="Search products"
              onClick={() => {
                window.location.href = "/shop";
              }}
              className="hidden transition hover:text-[#b28a57] sm:block"
            >
              <FiSearch size={20} strokeWidth={1.5} />
            </button>

            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="group relative flex items-center gap-2 transition hover:text-[#b28a57]"
            >
              <FiShoppingBag size={21} strokeWidth={1.5} />
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.12em] sm:block">
                Bag
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile navigation */}
      <div
        className={`grid overflow-hidden bg-[#faf9f6] transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          open
            ? "grid-rows-[1fr] border-b border-[#e9e5dd] opacity-100"
            : "grid-rows-[0fr] border-b border-transparent opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="flex flex-col px-6 pb-5 pt-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-[#e9e5dd] py-4 font-serif text-lg transition-colors hover:text-[#a78354]"
              >
                <span>{link.name}</span>
                <FiArrowUpRight
                  size={17}
                  className="text-[#a18b6b] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center gap-2 bg-[#292820] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.17em] text-white transition hover:bg-[#a78354]"
            >
              <FiShoppingBag size={17} />
              Explore Your Bag
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
