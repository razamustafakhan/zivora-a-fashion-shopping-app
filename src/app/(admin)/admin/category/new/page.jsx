"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus, FiTag, FiCheck, FiX } from "react-icons/fi";
import useCategory from "@/store/context/category.context";

const AddNewCategory = () => {
  const router = useRouter();
  const { state, categoryChange, addCategory } = useCategory();

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-6 text-[#292820] sm:px-6 lg:px-9 lg:py-8">
      <div className="mx-auto max-w-[1200px] space-y-7">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 border-b border-[#e9e4da] pb-6 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/admin/categories"
              className="mb-5 inline-flex items-center gap-2 text-xs text-[#8b8478] transition hover:text-[#927650]"
            >
              <FiArrowLeft size={14} />
              Back to categories
            </Link>

            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#a58a65]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
                The art of management
              </p>
            </div>

            <h1 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
              Add New Category
              <span className="text-[#a58a65]">.</span>
            </h1>

            <p className="mt-2 text-sm text-[#827b70]">
              Create a category and organize your products.
            </p>
          </div>

          <Link
            href="/admin/categories"
            className="inline-flex h-10 items-center gap-2 border border-[#e8e2d7] bg-white px-4 text-xs text-[#70695f] transition hover:border-[#d7c6aa]"
          >
            <FiArrowLeft size={14} />
            All Categories
          </Link>
        </header>

        {/* Success Message */}

        {/* Form and Sidebar */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
          {/* Category Form */}
          <section className="border border-[#eae5db] bg-white p-5 sm:p-8">
            <div className="mb-7 flex items-center gap-3 border-b border-[#eee9e0] pb-5">
              <span className="flex h-11 w-11 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                <FiTag size={20} />
              </span>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl">
                  Category Information
                </h2>
                <p className="mt-1 text-xs text-[#928a7e]">
                  Enter your category, subcategories, and description.
                </p>
              </div>
            </div>

            <form onSubmit={addCategory} className="space-y-6">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="categoryName"
                  className="text-xs font-medium text-[#514b41]"
                >
                  Category Name <span className="text-[#b16d5d]">*</span>
                </label>

                <input
                  id="categoryName"
                  name="categoryName"
                  type="text"
                  value={state.categoryForm.categoryName}
                  onChange={categoryChange}
                  placeholder="e.g. Home Décor"
                  maxLength={100}
                  required
                  className="mt-2 w-full border border-[#e8e2d7] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b0a89c] focus:border-[#a58a65] disabled:opacity-60"
                />
              </div>

              {/* Subcategories */}
              <div>
                <label
                  htmlFor="subCategoryName"
                  className="text-xs font-medium text-[#514b41]"
                >
                  Subcategory Names <span className="text-[#b16d5d]">*</span>
                </label>

                <input
                  id="subCategoryName"
                  name="subCategoryName"
                  type="text"
                  value={state.categoryForm.subCategoryName}
                  onChange={categoryChange}
                  placeholder="e.g. Wall Décor, Table Décor, Lighting"
                  required
                  className="mt-2 w-full border border-[#e8e2d7] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b0a89c] focus:border-[#a58a65] disabled:opacity-60"
                />

                {/* <p className="mt-2 text-[11px] leading-5 text-[#a0988d]">
                  Separate multiple subcategories with commas.
                </p> */}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="text-xs font-medium text-[#514b41]"
                >
                  Description
                  <span className="ml-1 text-[#928a7e]">(Optional)</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={state.categoryForm.description}
                  onChange={categoryChange}
                  placeholder="Describe this category..."
                  rows={4}
                  maxLength={500}
                  className="mt-2 w-full resize-y border border-[#e8e2d7] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b0a89c] focus:border-[#a58a65] disabled:opacity-60"
                />

                <p className="mt-1 text-right text-[11px] text-[#a0988d]">
                  {state.categoryForm.description.length}/500
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#eee9e0] pt-5">
                <button
                  type="button"
                  className="border border-[#e8e2d7] bg-white px-5 py-3 text-xs text-[#70695f] transition hover:border-[#d7c6aa] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#292820] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#927650] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiPlus size={15} />
                  Add Category
                </button>
              </div>
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <section className="border border-[#eae5db] bg-white p-6">
              <h2 className="font-serif text-xl">Category Preview</h2>

              <p className="mt-1 text-xs text-[#928a7e]">
                Preview your category details.
              </p>

              <div className="mt-5 border-t border-[#eee9e0] pt-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#927650]">
                  Category Name
                </p>
                <p className="mt-2 break-words text-sm font-medium">
                  {state.categoryForm.categoryName.trim()}
                </p>
              </div>

              <div className="mt-5 border-t border-[#eee9e0] pt-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#927650]">
                  Subcategories
                </p>

                <p className="mt-2 text-sm text-[#a0988d]">
                  {state.categoryForm.subCategoryName}
                </p>
              </div>

              <div className="mt-5 border-t border-[#eee9e0] pt-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#927650]">
                  Description
                </p>
                <p className="mt-2 break-words text-sm leading-6 text-[#70695f]">
                  {state.categoryForm.description.trim() ||
                    "No description added yet."}
                </p>
              </div>
            </section>

            <section className="border border-[#e8e0d3] bg-[#eee9df] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#927650]">
                Zivora Tip
              </p>

              <h3 className="mt-3 font-serif text-xl">Keep it organized.</h3>

              <p className="mt-2 text-xs leading-6 text-[#766e62]">
                Group related products into categories and use subcategories to
                make shopping easier for your customers.
              </p>
            </section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#e9e4da] pt-5 text-[10px] text-[#9a9185]">
          © 2026 Zivora. The art of living beautifully.
        </footer>
      </div>
    </main>
  );
};

export default AddNewCategory;
