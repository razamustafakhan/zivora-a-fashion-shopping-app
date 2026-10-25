"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiX,
} from "react-icons/fi";
import useCategory from "@/store/context/category.context";

const CategoryList = () => {
  const { state } = useCategory();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredCategories = state?.categories.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(search.toLowerCase()),
    // category.subCategoryName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = () => {
    setCategories((prev) => prev.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-6 text-[#292820] sm:px-6 lg:px-9 lg:py-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 border-b border-[#e9e4da] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#a58a65]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
                The art of management
              </p>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl">
              Categories<span className="text-[#a58a65]">.</span>
            </h1>

            <p className="mt-2 text-sm text-[#827b70]">
              Manage your categories and subcategories.
            </p>
          </div>

          <Link
            href="/admin/category/new"
            className="inline-flex h-11 items-center justify-center gap-2 bg-[#292820] px-5 text-xs font-medium text-white transition hover:bg-[#927650]"
          >
            <FiPlus size={16} />
            Add New Category
          </Link>
        </header>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="border border-[#eae5db] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#81796e]">Total Categories</p>
              <span className="flex h-9 w-9 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                <FiTag size={18} />
              </span>
            </div>
            <p className="mt-5 font-serif text-3xl">
              {state?.categories.length}
            </p>
            <p className="mt-2 text-[10px] text-[#a0988d]">
              Total category entries
            </p>
          </article>

          <article className="border border-[#eae5db] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#81796e]">Subcategories</p>
              <span className="flex h-9 w-9 items-center justify-center bg-[#eee7dc] text-[#927650]">
                <FiTag size={18} />
              </span>
            </div>
            <p className="mt-5 font-serif text-3xl">
              {state?.categories.length}
            </p>
            <p className="mt-2 text-[10px] text-[#a0988d]">
              Total subcategory entries
            </p>
          </article>
        </section>

        {/* Category List */}
        <section>
          <div className="mb-5">
            <h2 className="font-serif text-xl sm:text-2xl">All Categories</h2>
            <p className="mt-1 text-xs text-[#8b8478]">
              View and manage your category information.
            </p>
          </div>

          <div className="overflow-hidden border border-[#eae5db] bg-white">
            {/* Search */}
            <div className="border-b border-[#eee9e0] p-4 sm:p-5">
              <div className="relative w-full sm:max-w-sm">
                <FiSearch
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0988d]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search category or subcategory..."
                  className="h-10 w-full border border-[#e8e2d7] bg-[#fbfaf7] pl-9 pr-4 text-xs outline-none transition placeholder:text-[#a0988d] focus:border-[#a58a65]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#eee9e0] bg-[#fbfaf7]">
                    <th className="px-5 py-4 text-[9px] font-medium tracking-[0.15em] text-[#918779]">
                      CATEGORY NAME
                    </th>
                    <th className="px-5 py-4 text-[9px] font-medium tracking-[0.15em] text-[#918779]">
                      SUBCATEGORY NAME
                    </th>
                    <th className="px-5 py-4 text-[9px] font-medium tracking-[0.15em] text-[#918779]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b border-[#f0ece5] transition last:border-0 hover:bg-[#fdfcf9]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                            <FiTag size={16} />
                          </span>
                          <span className="text-xs font-medium">
                            {category.categoryName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs text-[#70695f]">
                        {category.subCategoryName}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/categories/edit/${category.id}`}
                            title="Edit category"
                            className="p-2 text-[#8b8478] transition hover:bg-[#f5f0e7] hover:text-[#927650]"
                          >
                            <FiEdit2 size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteId(category.id)}
                            title="Delete category"
                            className="p-2 text-[#a36e5e] transition hover:bg-[#f9eeeb]"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-16 text-center">
                        <FiSearch
                          size={24}
                          className="mx-auto text-[#b0a89c]"
                        />
                        <p className="mt-3 text-sm text-[#70695f]">
                          No categories found
                        </p>
                        <p className="mt-1 text-xs text-[#a0988d]">
                          Try searching with another name.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#eee9e0] px-5 py-4">
              <p className="text-[10px] text-[#968d80]">
                Showing {filteredCategories.length} of {state.categories.length}{" "}
                categories
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9e4da] pt-5 text-[10px] text-[#9a9185]">
          <p>© 2026 Zivora. The art of living beautifully.</p>
          <p>Admin dashboard · Category management</p>
        </footer>
      </div>

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292820]/40 p-4">
          <div className="w-full max-w-md border border-[#eae5db] bg-[#fdfcf9] p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center bg-[#f5e8e4] text-[#a36e5e]">
                <FiTrash2 size={19} />
              </span>

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                aria-label="Close dialog"
                className="p-2 text-[#8b8478] hover:bg-[#f0ece5]"
              >
                <FiX size={18} />
              </button>
            </div>

            <h2 className="mt-5 font-serif text-2xl">Delete category?</h2>

            <p className="mt-2 text-sm leading-6 text-[#827b70]">
              Are you sure you want to delete{" "}
              {/* <span className="font-medium text-[#292820]">
                {
                  categories.find((item) => item.id === deleteId)
                    ?.subCategoryName
                }
              </span> */}
              ?
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="border border-[#e8e2d7] px-4 py-3 text-xs text-[#70695f] hover:border-[#d7c6aa]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-[#a36e5e] px-4 py-3 text-xs font-medium text-white transition hover:bg-[#8f594a]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryList;
