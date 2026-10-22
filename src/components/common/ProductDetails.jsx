"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiHeart,
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiCheck,
} from "react-icons/fi";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const discount =
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : 0;

  function addToCart() {
    setError("");
    setAdded(false);

    if (!product.inStock) {
      setError("This product is currently out of stock.");
      return;
    }

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("zivora-cart") || "[]",
      );

      if (!Array.isArray(existingCart)) {
        throw new Error("Invalid cart data");
      }

      const existingItem = existingCart.find(
        (item) => item.productId === product.id,
      );

      const updatedCart = existingItem
        ? existingCart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [
            ...existingCart,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity,
            },
          ];

      localStorage.setItem("zivora-cart", JSON.stringify(updatedCart));

      window.dispatchEvent(new Event("zivora-cart-updated"));
      setAdded(true);
    } catch {
      setError("Unable to update your bag. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292820]">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#918575]">
          <Link href="/" className="transition hover:text-[#927650]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition hover:text-[#927650]">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#292820]">{product.name}</span>
        </div>
      </div>

      {/* Product information */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <Link
          href="/shop"
          className="mb-6 inline-flex items-center gap-2 text-xs text-[#777166] transition hover:text-[#927650]"
        >
          <FiArrowLeft size={15} />
          Back to shop
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Product image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#eee9df]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

            {product.badge && (
              <span className="absolute left-4 top-4 bg-[#faf9f6] px-3 py-2 text-[10px] uppercase tracking-[0.15em]">
                {product.badge}
              </span>
            )}

            {discount > 0 && (
              <span className="absolute bottom-4 left-4 bg-[#292820] px-3 py-2 text-[10px] uppercase tracking-wider text-white">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center py-2 md:py-8 lg:py-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
              {product.category}
            </p>

            <h1 className="mt-4 font-serif text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-xl font-medium">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <>
                  <span className="text-sm text-[#a29a8e] line-through">
                    ₹{product.compareAtPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#927650]">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {product.rating != null && (
              <div className="mt-4 flex items-center gap-2 text-xs text-[#777166]">
                <span className="text-[#a17d47]">★</span>
                <span>{product.rating} out of 5</span>
                {product.reviewCount != null && (
                  <span>({product.reviewCount} reviews)</span>
                )}
              </div>
            )}

            <div className="my-7 h-px bg-[#e6e0d6]" />

            <p className="text-sm leading-7 text-[#777166]">
              A thoughtfully selected piece from the Zivora collection, designed
              to bring a little extra beauty to your everyday moments and
              special celebrations.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs">
              {product.inStock ? (
                <>
                  <FiCheck className="text-green-700" size={16} />
                  <span className="text-green-800">
                    In stock and ready to order
                  </span>
                </>
              ) : (
                <span className="text-red-700">Currently out of stock</span>
              )}
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <label className="mb-3 block text-xs font-medium">Quantity</label>

              <div className="flex h-12 w-36 items-center justify-between border border-[#ded7ca]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-full w-11 items-center justify-center transition hover:bg-[#eee9df] disabled:opacity-30"
                >
                  <FiMinus size={14} />
                </button>

                <span aria-live="polite" className="text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= 99}
                  onClick={() =>
                    setQuantity((value) => Math.min(99, value + 1))
                  }
                  className="flex h-full w-11 items-center justify-center transition hover:bg-[#eee9df] disabled:opacity-30"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            {/* Purchase actions */}
            <div className="mt-6 grid grid-cols-[1fr_48px] gap-3">
              <button
                type="button"
                disabled={!product.inStock}
                onClick={addToCart}
                className="flex min-h-14 items-center justify-center gap-3 bg-[#292820] px-5 text-xs font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[#927650] disabled:cursor-not-allowed disabled:bg-[#aaa69c]"
              >
                <FiShoppingBag size={17} />
                Add to bag
              </button>

              <button
                type="button"
                aria-label="Add product to wishlist"
                title="Wishlist coming soon"
                className="flex min-h-14 items-center justify-center border border-[#ded7ca] transition hover:border-[#927650] hover:text-[#927650]"
              >
                <FiHeart size={19} />
              </button>
            </div>

            {added && (
              <div
                role="status"
                className="mt-4 flex items-center justify-between gap-3 border border-[#d7e5d2] bg-[#f2f7ef] p-4 text-sm text-[#365c36]"
              >
                <span className="flex items-center gap-2">
                  <FiCheck size={17} />
                  Added to your bag.
                </span>
                <Link
                  href="/cart"
                  className="shrink-0 font-medium underline underline-offset-4"
                >
                  View bag
                </Link>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}

            <p className="mt-3 text-center text-[10px] text-[#918575]">
              Your selection, your style, your Zivora.
            </p>

            {/* Store benefits */}
            <div className="mt-8 border-t border-[#e6e0d6]">
              <div className="flex items-center gap-4 border-b border-[#e6e0d6] py-4">
                <FiTruck size={19} className="shrink-0 text-[#927650]" />
                <div>
                  <p className="text-xs font-medium">Delivery information</p>
                  <p className="mt-1 text-xs leading-5 text-[#918575]">
                    Shipping options and estimated delivery at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-[#e6e0d6] py-4">
                <FiRotateCcw size={19} className="shrink-0 text-[#927650]" />
                <div>
                  <p className="text-xs font-medium">Returns and exchanges</p>
                  <Link
                    href="/return-policy"
                    className="mt-1 inline-block text-xs text-[#918575] underline underline-offset-2 hover:text-[#292820]"
                  >
                    Read our return policy
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4">
                <FiShield size={19} className="shrink-0 text-[#927650]" />
                <div>
                  <p className="text-xs font-medium">Secure shopping</p>
                  <p className="mt-1 text-xs text-[#918575]">
                    Payment options shown during checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
