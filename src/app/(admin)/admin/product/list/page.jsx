"use client";

import Link from "next/link";
import {
  FiBox,
  FiPlus,
  FiSearch,
  FiImage,
  FiEdit2,
  FiEye,
  FiArrowUpRight,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiLayers,
  FiX,
} from "react-icons/fi";
import { useMemo, useState } from "react";
import { useProduct } from "@/store/context/product.context";

export default function ProductList() {
  const { state } = useProduct();
  const products = state.products || [];

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [imageErrors, setImageErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState(null);

  const getStockStatus = (stock) => {
    const quantity = Number(stock ?? 0);

    if (quantity <= 0) {
      return {
        label: "Out of stock",
        className: "bg-red-50 text-red-700 ring-red-600/15",
        dot: "bg-red-500",
      };
    }

    if (quantity <= 10) {
      return {
        label: "Low stock",
        className: "bg-amber-50 text-amber-700 ring-amber-600/20",
        dot: "bg-amber-500",
      };
    }

    return {
      label: "In stock",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      dot: "bg-emerald-500",
    };
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.sku,
        product.categoryId?.categoryName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const stock = Number(product.stock ?? 0);

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in" && stock > 10) ||
        (stockFilter === "low" && stock > 0 && stock <= 10) ||
        (stockFilter === "out" && stock <= 0);

      return matchesSearch && matchesStock;
    });
  }, [products, search, stockFilter]);

  const totalStock = products.reduce(
    (total, product) => total + Math.max(0, Number(product.stock ?? 0)),
    0,
  );

  const lowStockCount = products.filter((product) => {
    const stock = Number(product.stock ?? 0);
    return stock > 0 && stock <= 10;
  }).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock ?? 0) <= 0,
  ).length;

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const resetFilters = () => {
    setSearch("");
    setStockFilter("all");
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-6 text-[#292820] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page heading */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d97736]">
              <span className="h-2 w-2 rounded-full bg-[#d97736]" />
              Store management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Your inventory at a glance. Manage product details, pricing,
              availability, and stock from one place.
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-[#d97736] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-[#bd6328] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200 sm:self-center"
          >
            <FiPlus size={19} />
            Add new product
          </Link>
        </header>

        {/* Overview cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="Total products"
            value={products.length}
            description="Products in your catalog"
            icon={<FiBox size={21} />}
            iconClass="bg-[#FFE4CC] text-[#c56b2f]"
          />

          <OverviewCard
            title="Units in stock"
            value={totalStock.toLocaleString("en-IN")}
            description="Total available inventory"
            icon={<FiPackage size={21} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <OverviewCard
            title="Low stock"
            value={lowStockCount}
            description="10 units or fewer"
            icon={<FiAlertCircle size={21} />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <OverviewCard
            title="Out of stock"
            value={outOfStockCount}
            description="Products needing restock"
            icon={<FiLayers size={21} />}
            iconClass="bg-red-50 text-red-600"
          />
        </section>

        {/* Inventory table */}
        <section className="overflow-hidden rounded-2xl border border-[#EAE6DF] bg-white shadow-sm">
          {/* Table heading */}
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold">All products</h2>
                <span className="rounded-lg bg-[#FFF0E3] px-2.5 py-1 text-xs font-bold text-[#b95f26]">
                  {filteredProducts.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Search and review your product inventory.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-72">
                <FiSearch
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, SKU, brand..."
                  aria-label="Search products"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-[#FCFBF9] pl-10 pr-10 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#d97736] focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              <select
                value={stockFilter}
                onChange={(event) => setStockFilter(event.target.value)}
                aria-label="Filter by stock status"
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium outline-none focus:border-[#d97736] focus:ring-4 focus:ring-orange-100"
              >
                <option value="all">All stock</option>
                <option value="in">In stock</option>
                <option value="low">Low stock</option>
                <option value="out">Out of stock</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="px-5 py-20 text-center sm:px-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E3] text-[#d97736]">
                {products.length === 0 ? (
                  <FiBox size={28} />
                ) : (
                  <FiSearch size={28} />
                )}
              </div>

              <h3 className="text-lg font-bold">
                {products.length === 0
                  ? "Your catalog is waiting"
                  : "No matching products"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {products.length === 0
                  ? "Add your first product to start building your store inventory."
                  : "Try another search term or change the stock filter."}
              </p>

              {products.length === 0 ? (
                <Link
                  href="/admin/products/add"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d97736] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#bd6328]"
                >
                  <FiPlus size={18} />
                  Create your first product
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop/tablet table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-[#FAF9F6]">
                      <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Product
                      </th>
                      <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Category
                      </th>
                      <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Price
                      </th>
                      <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Inventory
                      </th>
                      <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        SKU
                      </th>
                      <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => {
                      const stockStatus = getStockStatus(product.stock);
                      const images = product.images || [];
                      const firstImage = images[0];
                      const imageFailed = imageErrors[`${product._id}-0`];

                      return (
                        <tr
                          key={product._id}
                          className="group transition-colors hover:bg-[#FFFCF8]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex min-w-[220px] items-center gap-3.5">
                              <button
                                type="button"
                                onClick={() =>
                                  images.length > 0 &&
                                  setSelectedImages({
                                    product,
                                    images,
                                  })
                                }
                                disabled={images.length === 0}
                                aria-label={`View images of ${product.name || "product"}`}
                                className="group/image relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-[#F5EBDD] transition hover:border-[#d97736] disabled:cursor-default"
                              >
                                {firstImage && !imageFailed ? (
                                  <img
                                    src={`/api/product/photo/${product._id}/0`}
                                    alt={
                                      firstImage.name ||
                                      product.name ||
                                      "Product"
                                    }
                                    loading="lazy"
                                    className="h-full w-full object-cover transition duration-300 group-hover/image:scale-110"
                                    onError={() =>
                                      setImageErrors((previous) => ({
                                        ...previous,
                                        [`${product._id}-0`]: true,
                                      }))
                                    }
                                  />
                                ) : (
                                  <FiImage
                                    size={22}
                                    className="text-[#d97736]"
                                  />
                                )}

                                {images.length > 1 && (
                                  <span className="absolute bottom-0.5 right-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                    +{images.length - 1}
                                  </span>
                                )}
                              </button>

                              <div className="min-w-0">
                                <p className="max-w-[230px] truncate text-sm font-bold text-[#292820]">
                                  {product.name || "Unnamed product"}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {product.brand || "No brand"}
                                </p>
                                <p className="mt-1 text-[10px] font-medium text-gray-400">
                                  {images.length}{" "}
                                  {images.length === 1 ? "image" : "images"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="inline-flex max-w-[160px] items-center truncate rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                              {product.categoryId?.categoryName ||
                                "Uncategorized"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-sm font-bold text-[#292820]">
                              {formatPrice(product.sellingPrice)}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <div className="space-y-2">
                              <p className="text-sm font-semibold">
                                {Number(product.stock ?? 0).toLocaleString(
                                  "en-IN",
                                )}{" "}
                                <span className="text-xs font-normal text-gray-400">
                                  units
                                </span>
                              </p>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${stockStatus.className}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${stockStatus.dot}`}
                                />
                                {stockStatus.label}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="font-mono text-xs text-gray-500">
                              {product.sku || "—"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end">
                              <Link
                                href={`/admin/products/edit/${product._id}`}
                                title="Edit product"
                                aria-label={`Edit ${product.name || "product"}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#f2c29e] hover:bg-[#FFF0E3] hover:text-[#bd6328]"
                              >
                                <FiEdit2 size={16} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile product cards */}
              <div className="divide-y divide-gray-100 md:hidden">
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  const images = product.images || [];
                  const imageFailed = imageErrors[`${product._id}-0`];

                  return (
                    <article
                      key={product._id}
                      className="p-4 transition hover:bg-[#FFFCF8] sm:p-5"
                    >
                      <div className="flex gap-3">
                        <button
                          type="button"
                          disabled={images.length === 0}
                          onClick={() =>
                            images.length > 0 &&
                            setSelectedImages({ product, images })
                          }
                          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-[#F5EBDD]"
                          aria-label={`View images of ${product.name || "product"}`}
                        >
                          {images[0] && !imageFailed ? (
                            <img
                              src={`/api/product/photo/${product._id}/0`}
                              alt={images[0].name || product.name || "Product"}
                              loading="lazy"
                              className="h-full w-full object-cover"
                              onError={() =>
                                setImageErrors((previous) => ({
                                  ...previous,
                                  [`${product._id}-0`]: true,
                                }))
                              }
                            />
                          ) : (
                            <FiImage size={25} className="text-[#d97736]" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold">
                            {product.name || "Unnamed product"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {product.brand || "No brand"}
                          </p>
                          <p className="mt-2 text-base font-bold">
                            {formatPrice(product.sellingPrice)}
                          </p>
                          <span
                            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${status.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                          </span>
                        </div>

                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          aria-label={`Edit ${product.name || "product"}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-[#FFF0E3] hover:text-[#bd6328]"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#FAF9F6] p-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Category
                          </p>
                          <p className="mt-1 truncate text-xs font-semibold">
                            {product.categoryId?.categoryName ||
                              "Uncategorized"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Stock · SKU
                          </p>
                          <p className="mt-1 truncate text-xs font-semibold">
                            {product.stock ?? 0} units · {product.sku || "—"}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}

          {/* Table footer */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-gray-100 bg-[#FCFBF9] px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>
                Showing{" "}
                <span className="font-bold text-[#292820]">
                  {filteredProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#292820]">
                  {products.length}
                </span>{" "}
                products
              </p>
              <p className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-600" size={14} />
                Inventory overview
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Product image viewer */}
      {selectedImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImages(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Images of ${selectedImages.product.name || "product"}`}
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="min-w-0">
                <h3 className="truncate font-bold">
                  {selectedImages.product.name || "Product images"}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedImages.images.length} product images
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImages(null)}
                aria-label="Close image viewer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3">
              {selectedImages.images.map((image, index) => {
                const key = `${selectedImages.product._id}-${index}`;
                const imageFailed = imageErrors[key];

                return (
                  <div
                    key={key}
                    className="overflow-hidden rounded-xl border border-gray-100 bg-[#FAF9F6]"
                  >
                    {imageFailed ? (
                      <div className="flex aspect-square flex-col items-center justify-center gap-2 p-3 text-center text-gray-400">
                        <FiImage size={28} />
                        <span className="text-xs">Image unavailable</span>
                      </div>
                    ) : (
                      <img
                        src={`/api/product/photo/${selectedImages.product._id}/${index}`}
                        alt={
                          image.name ||
                          `${selectedImages.product.name} ${index + 1}`
                        }
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                        onError={() =>
                          setImageErrors((previous) => ({
                            ...previous,
                            [key]: true,
                          }))
                        }
                      />
                    )}
                    <p className="truncate px-3 py-2 text-xs text-gray-500">
                      {image.name || `Image ${index + 1}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function OverviewCard({ title, value, description, icon, iconClass }) {
  return (
    <div className="group rounded-2xl border border-[#EAE6DF] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#292820]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <FiArrowUpRight size={14} />
        {description}
      </div>
    </div>
  );
}
