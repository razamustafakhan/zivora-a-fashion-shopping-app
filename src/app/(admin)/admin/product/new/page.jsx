"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBox,
  FiCheck,
  FiChevronDown,
  FiImage,
  FiInfo,
  FiSave,
  FiTag,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { useProduct } from "@/store/context/product.context";
import useCategory from "@/store/context/category.context";

const inputClass =
  "mt-2 w-full rounded-lg border border-[#e8e2d7] bg-white px-4 py-3 text-sm text-[#292820] outline-none transition placeholder:text-[#b0a99e] focus:border-[#d97736] focus:ring-2 focus:ring-[#d97736]/10";

const labelClass = "block text-sm font-medium text-[#39372f]";

const sectionClass = "rounded-2xl border border-[#eae5db] bg-white p-5 sm:p-7";

const AddNewProduct = () => {
  const router = useRouter();

  const {
    state: { productForm, loading },
    errors,
    message,
    discount,
    imagePreviews,
    productChange,
    handleImageChange,
    removeImage,
    addProduct,

    setErrors,
    setMessage,
  } = useProduct();
  const { state } = useCategory();

  const formData = productForm;

  const sellingPrice = Number(formData.sellingPrice) || 0;
  const originalPrice = Number(formData.originalPrice) || 0;
  const stock = Number(formData.stock) || 0;
  const savings = Math.max(originalPrice - sellingPrice, 0);

  const renderError = (field) =>
    errors[field] ? (
      <p className="mt-1.5 text-xs text-red-600">{errors[field]}</p>
    ) : null;

  const handleReset = () => {
    dispatch({ type: "RESET_PRODUCT_FORM" });
    setErrors({});
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-6 text-[#292820] sm:px-6 lg:px-9 lg:py-8">
      <div className="mx-auto max-w-[1200px] space-y-7">
        {/* Page heading */}
        <header className="flex flex-col justify-between gap-5 border-b border-[#e9e4da] pb-6 sm:flex-row sm:items-center">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="mb-5 inline-flex items-center gap-2 text-xs text-[#827b70] transition hover:text-[#d97736]"
            >
              <FiArrowLeft size={15} />
              Back to products
            </button>

            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#d97736]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#d97736]">
                Product management
              </p>
            </div>

            <h1 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
              Add new product
              <span className="text-[#d97736]">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#827b70]">
              Add a product to Zivora with accurate details, pricing, inventory,
              and product images.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8e2d7] bg-white px-3 py-2 text-xs text-[#70695f]">
            <span className="h-2 w-2 rounded-full bg-[#d97736]" />
            New product
          </span>
        </header>

        {/* Feedback */}
        {message && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
              /success/i.test(message)
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <FiInfo size={18} className="mt-0.5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={addProduct}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main form */}
            <div className="space-y-6">
              {/* Basic information */}
              <section className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e3] text-[#d97736]">
                    <FiBox size={19} />
                  </span>

                  <div>
                    <h2 className="text-lg font-medium">Basic information</h2>
                    <p className="mt-1 text-xs text-[#928a7e]">
                      Product name, brand, and description
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Product name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={productChange}
                      placeholder="e.g. Premium Basmati Rice"
                      className={inputClass}
                      maxLength={150}
                      required
                    />

                    {renderError("name")}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="sku" className={labelClass}>
                        SKU
                      </label>

                      <input
                        id="sku"
                        name="sku"
                        type="text"
                        value={formData.sku}
                        onChange={productChange}
                        placeholder="e.g. RICE-001"
                        className={inputClass}
                      />

                      <p className="mt-1.5 text-[11px] text-[#9a9185]">
                        Leave blank if your backend generates it.
                      </p>

                      {renderError("sku")}
                    </div>

                    <div>
                      <label htmlFor="brand" className={labelClass}>
                        Brand
                      </label>

                      <input
                        id="brand"
                        name="brand"
                        type="text"
                        value={formData.brand}
                        onChange={productChange}
                        placeholder="Enter brand name"
                        className={inputClass}
                      />

                      {renderError("brand")}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="categoryId" className={labelClass}>
                      Category <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={productChange}
                        className={`${inputClass} appearance-none pr-10`}
                        required
                      >
                        <option value="">Select Cateory</option>

                        {state?.categories
                          .filter((category) => category.isActive !== false)
                          .map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.categoryName}
                            </option>
                          ))}
                      </select>

                      <FiChevronDown
                        size={16}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#928a7e]"
                      />
                    </div>

                    {renderError("categoryId")}
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor="description" className={labelClass}>
                        Description
                      </label>

                      <span className="text-[11px] text-[#a09789]">
                        {(formData.description || "").length}/1000
                      </span>
                    </div>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={productChange}
                      placeholder="Describe the product, its quality, origin, and key features..."
                      rows={5}
                      maxLength={1000}
                      className={`${inputClass} resize-y leading-6`}
                    />

                    {renderError("description")}
                  </div>
                </div>
              </section>

              {/* Product images */}
              <section className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e3] text-[#d97736]">
                    <FiImage size={19} />
                  </span>

                  <div>
                    <h2 className="text-lg font-medium">Product images</h2>
                    <p className="mt-1 text-xs text-[#928a7e]">
                      Upload up to 5 product photos
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="product-images"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e5d8c7] bg-[#fdfbf7] px-5 py-9 text-center transition hover:border-[#d97736] hover:bg-[#fff8f1]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e3] text-[#d97736]">
                    <FiUploadCloud size={25} />
                  </span>

                  <span className="mt-4 text-sm font-medium">
                    Click to upload product images
                  </span>

                  <span className="mt-2 text-xs text-[#928a7e]">
                    JPG, PNG or WebP · Maximum 5 MB per image
                  </span>

                  <span className="mt-4 rounded-lg bg-[#292820] px-4 py-2.5 text-xs font-medium text-white">
                    Browse images
                  </span>

                  <input
                    id="product-images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                    disabled={(formData.images || []).length >= 5}
                  />
                </label>

                {renderError("images")}

                {imagePreviews.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {imagePreviews.map((image, index) => (
                      <div
                        key={`${image.file.name}-${image.file.lastModified}-${index}`}
                        className="group relative overflow-hidden rounded-xl border border-[#eae5db] bg-[#f8f7f3]"
                      >
                        <img
                          src={image.url}
                          alt={`Product preview ${index + 1}`}
                          className="h-36 w-full object-cover"
                        />

                        {index === 0 && (
                          <span className="absolute bottom-12 left-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-medium text-[#292820]">
                            Main image
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                        >
                          <FiTrash2 size={14} />
                        </button>

                        <p className="truncate px-3 py-2 text-[11px] text-[#827b70]">
                          {image.file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Pricing */}
              <section className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e3] text-[#d97736]">
                    <FiTag size={19} />
                  </span>

                  <div>
                    <h2 className="text-lg font-medium">Pricing information</h2>
                    <p className="mt-1 text-xs text-[#928a7e]">
                      Set the original and selling prices
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="originalPrice" className={labelClass}>
                      Original price (₹) <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#928a7e]">
                        ₹
                      </span>

                      <input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={formData.originalPrice ?? ""}
                        onChange={productChange}
                        placeholder="0.00"
                        className={`${inputClass} pl-9`}
                        required
                      />
                    </div>

                    {renderError("originalPrice")}
                  </div>

                  <div>
                    <label htmlFor="sellingPrice" className={labelClass}>
                      Selling price (₹) <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#928a7e]">
                        ₹
                      </span>

                      <input
                        id="sellingPrice"
                        name="sellingPrice"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={formData.sellingPrice ?? ""}
                        onChange={productChange}
                        placeholder="0.00"
                        className={`${inputClass} pl-9`}
                        required
                      />
                    </div>

                    {renderError("sellingPrice")}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#fff4e9] p-4">
                  <div>
                    <p className="text-xs text-[#895126]">
                      Calculated discount
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-[#d97736]">
                      {discount}%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#895126]">Customer savings</p>
                    <p className="mt-1 text-lg font-medium text-[#292820]">
                      ₹{savings.toFixed(2)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Inventory */}
              <section className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e3] text-[#d97736]">
                    <FiBox size={19} />
                  </span>

                  <div>
                    <h2 className="text-lg font-medium">Inventory</h2>
                    <p className="mt-1 text-xs text-[#928a7e]">
                      Manage available stock
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className={labelClass}>
                    Stock quantity <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stock ?? ""}
                    onChange={productChange}
                    placeholder="e.g. 100"
                    className={inputClass}
                    required
                  />

                  {renderError("stock")}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-6">
              {/* Product summary */}
              <section className="rounded-2xl border border-[#ead9c6] bg-[#fff4e9] p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b66a30]">
                  Product summary
                </p>

                <h2 className="mt-3 break-words font-serif text-xl">
                  {formData.name.trim() || "Your product name"}
                </h2>

                <p className="mt-2 text-xs text-[#827b70]">
                  {/* {stgselectedCategory?.categoryName || "No category selected"} */}
                </p>

                <div className="my-5 border-t border-[#ead9c6]" />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#827b70]">Selling price</span>
                  <span className="text-lg font-semibold text-[#d97736]">
                    ₹{sellingPrice.toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#827b70]">Original price</span>
                  <span className="text-sm text-[#292820]">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#827b70]">Discount</span>
                  <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-[#d97736]">
                    {discount}% OFF
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#827b70]">
                    Available stock
                  </span>
                  <span className="text-sm font-medium">{stock}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#827b70]">Product images</span>
                  <span className="text-sm font-medium">
                    {(formData.images || []).length}/5
                  </span>
                </div>
              </section>

              {/* Actions */}
              <section className="rounded-2xl border border-[#eae5db] bg-white p-5">
                <button
                  type="submit"
                  // disabled={isSubmitting || loading || categoriesLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#292820] px-4 py-3.5 text-sm font-medium text-white transition hover:bg-[#d97736] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSave size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#e8e2d7] px-4 py-3 text-sm text-[#70695f] transition hover:border-[#d97736] hover:text-[#d97736] disabled:opacity-60"
                >
                  <FiX size={16} />
                  Reset form
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-[#9a9185]">
                  Fields marked with <span className="text-red-500">*</span> are
                  required.
                </p>
              </section>
            </aside>
          </div>
        </form>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9e4da] pt-5 text-[10px] text-[#9a9185]">
          <p>© 2026 Zivora. The art of living beautifully.</p>
          <p>Admin dashboard · Product management</p>
        </footer>
      </div>
    </main>
  );
};

export default AddNewProduct;
