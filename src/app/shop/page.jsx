"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiSliders, FiX, FiArrowUpRight } from "react-icons/fi";
import { products } from "@/data/product";

const categories = [
  "All",
  "Home Decor",
  "Lighting",
  "Festive Decor",
  "Jewellery",
  "Fashion",
  "Party Supplies",
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("featured");
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292820]">
      {/* Page introduction */}
      <section className="border-b border-[#e9e4da] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-5 flex items-center gap-2 text-xs text-[#918575]">
            <Link href="/" className="hover:text-[#927650]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#292820]">Shop</span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#927650]">
                The Zivora collection
              </p>

              <h1 className="font-serif text-4xl font-normal sm:text-5xl lg:text-6xl">
                Shop all things lovely.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#777166]">
                From thoughtful home accents to celebration essentials, find
                beautiful little details for every occasion.
              </p>
            </div>

            <p className="text-xs text-[#777166]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section className="border-b border-[#e9e4da] bg-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 border-b pb-2 text-xs transition ${
                category === item
                  ? "border-[#927650] font-medium text-[#292820]"
                  : "border-transparent text-[#8c8579] hover:text-[#292820]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Search and sorting */}
      <section className="px-5 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex h-12 items-center gap-3 border-b border-[#dcd5c9] sm:w-80">
            <FiSearch className="shrink-0 text-[#918575]" size={18} />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa397]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FiX size={17} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 border border-[#e2dcd1] px-4 py-3 text-xs sm:hidden"
            >
              <FiSliders size={15} />
              Categories
            </button>

            <label className="flex items-center gap-3 text-xs text-[#777166]">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="max-w-[175px] bg-transparent py-3 text-xs text-[#292820] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setMobileFiltersOpen(false);
                }}
                className={`border px-3 py-2 text-xs ${
                  category === item
                    ? "border-[#292820] bg-[#292820] text-white"
                    : "border-[#e2dcd1]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section className="px-5 pb-20 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const discount =
                  product.compareAtPrice > product.price
                    ? Math.round(
                        ((product.compareAtPrice - product.price) /
                          product.compareAtPrice) *
                          100,
                      )
                    : null;

                return (
                  <article key={product.id} className="group min-w-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative block aspect-[4/5] overflow-hidden bg-[#eee9df]"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                      {product.badge && (
                        <span className="absolute left-2 top-2 bg-[#faf9f6] px-2 py-1.5 text-[9px] uppercase tracking-wider sm:left-3 sm:top-3">
                          {product.badge}
                        </span>
                      )}

                      {discount && (
                        <span className="absolute bottom-2 left-2 bg-[#292820] px-2 py-1 text-[9px] text-white">
                          -{discount}%
                        </span>
                      )}

                      <span className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-[#292820] py-4 text-[10px] uppercase tracking-[0.15em] text-white transition-transform duration-300 group-hover:translate-y-0 max-sm:translate-y-0">
                        View product <FiArrowUpRight size={14} />
                      </span>
                    </Link>

                    <div className="pt-4">
                      <p className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#918575]">
                        {product.category}
                      </p>

                      <Link href={`/products/${product.slug}`}>
                        <h2 className="font-serif text-sm sm:text-base">
                          {product.name}
                        </h2>
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>

                        {product.compareAtPrice > product.price && (
                          <span className="text-xs text-[#a29a8e] line-through">
                            ₹{product.compareAtPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center py-16 text-center">
              <p className="font-serif text-2xl">Nothing found just yet.</p>
              <p className="mt-3 text-sm text-[#777166]">
                Try another search or explore all our collections.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 bg-[#292820] px-6 py-3 text-xs uppercase tracking-wider text-white transition hover:bg-[#927650]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
