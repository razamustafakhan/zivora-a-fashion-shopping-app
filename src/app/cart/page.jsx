"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";

const CART_KEY = "zivora-cart";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadCart = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setItems(
        Array.isArray(saved)
          ? saved.filter(
              (item) =>
                item &&
                item.productId != null &&
                typeof item.price === "number" &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
            )
          : [],
      );
    } catch {
      setItems([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadCart();

    const handleUpdate = () => loadCart();
    window.addEventListener("zivora-cart-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("zivora-cart-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadCart]);

  function saveCart(nextItems) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(nextItems));
      setItems(nextItems);
      window.dispatchEvent(new Event("zivora-cart-updated"));
    } catch {
      // Keep the current cart visible if browser storage is unavailable.
    }
  }

  function changeQuantity(productId, amount) {
    saveCart(
      items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(99, item.quantity + amount)),
            }
          : item,
      ),
    );
  }

  function removeItem(productId) {
    saveCart(items.filter((item) => item.productId !== productId));
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const money = (amount) =>
    `₹${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  if (!loaded) {
    return (
      <main className="min-h-[60vh] bg-[#faf9f6] px-5 py-20 text-center">
        <p className="text-sm text-[#777166]">Loading your bag...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292820]">
      <section className="border-b border-[#e9e4da] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#927650]">
            Your Zivora selection
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Your shopping bag.
          </h1>

          <p className="mt-4 text-sm text-[#777166]">
            {itemCount} {itemCount === 1 ? "item" : "items"} selected for your
            special moments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        {items.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
            <FiShoppingBag size={36} className="text-[#927650]" />

            <h2 className="mt-6 font-serif text-3xl">Your bag is waiting.</h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#777166]">
              Explore our collection of thoughtful décor, festive finds,
              jewellery, and beautiful little details.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-3 bg-[#292820] px-7 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[#927650]"
            >
              Discover the collection
              <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-10 lg:grid-cols-[1fr_350px] lg:gap-14">
              {/* Cart items */}
              <div>
                <div className="hidden grid-cols-[1fr_100px_100px] border-b border-[#ded7ca] pb-4 text-[10px] uppercase tracking-[0.15em] text-[#918575] sm:grid">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                <div className="divide-y divide-[#e6e0d6]">
                  {items.map((item) => (
                    <article
                      key={item.productId}
                      className="grid grid-cols-[100px_1fr] gap-4 py-6 sm:grid-cols-[120px_1fr_100px_100px] sm:items-center sm:gap-5"
                    >
                      <Link
                        href={`/product-detail/${item.productId}`}
                        className="relative aspect-[4/5] overflow-hidden bg-[#eee9df]"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name || "Zivora product"}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <FiShoppingBag size={24} />
                          </div>
                        )}
                      </Link>

                      <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#927650]">
                          Zivora collection
                        </p>

                        <Link
                          href={`/product-detail/${item.productId}`}
                          className="mt-2 block font-serif text-base sm:text-lg"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-sm">{money(item.price)}</p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="mt-4 inline-flex items-center gap-2 text-xs text-[#918575] transition hover:text-red-700"
                        >
                          <FiTrash2 size={14} />
                          Remove
                        </button>

                        <div className="mt-4 flex h-10 w-28 items-center justify-between border border-[#ded7ca] sm:hidden">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            disabled={item.quantity <= 1}
                            onClick={() => changeQuantity(item.productId, -1)}
                            className="flex h-full w-9 items-center justify-center disabled:opacity-30"
                          >
                            <FiMinus size={13} />
                          </button>

                          <span className="text-xs">{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            disabled={item.quantity >= 99}
                            onClick={() => changeQuantity(item.productId, 1)}
                            className="flex h-full w-9 items-center justify-center disabled:opacity-30"
                          >
                            <FiPlus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="hidden items-center justify-center sm:flex">
                        <div className="flex h-10 items-center border border-[#ded7ca]">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            disabled={item.quantity <= 1}
                            onClick={() => changeQuantity(item.productId, -1)}
                            className="flex h-full w-8 items-center justify-center disabled:opacity-30"
                          >
                            <FiMinus size={12} />
                          </button>

                          <span className="w-7 text-center text-xs">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            disabled={item.quantity >= 99}
                            onClick={() => changeQuantity(item.productId, 1)}
                            className="flex h-full w-8 items-center justify-center disabled:opacity-30"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>

                      <p className="col-span-2 text-right text-sm font-medium sm:col-span-1">
                        {money(item.price * item.quantity)}
                      </p>
                    </article>
                  ))}
                </div>

                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-2 text-xs text-[#777166] transition hover:text-[#927650]"
                >
                  <FiArrowLeft size={15} />
                  Continue shopping
                </Link>
              </div>

              {/* Order summary */}
              <aside className="h-fit border border-[#e6e0d6] bg-white p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#927650]">
                  Your order
                </p>

                <h2 className="mt-3 font-serif text-2xl">Order summary</h2>

                <div className="mt-7 space-y-4 border-b border-[#e6e0d6] pb-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#777166]">
                      Subtotal ({itemCount} items)
                    </span>
                    <span>{money(subtotal)}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#777166]">Shipping</span>
                    <span className="text-xs text-[#918575]">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 py-5">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-lg font-medium">{money(subtotal)}</span>
                </div>

                <p className="mb-5 text-xs leading-5 text-[#918575]">
                  Shipping and any applicable taxes will be confirmed before you
                  place your order.
                </p>

                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-3 bg-[#292820] px-5 py-4 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#927650]"
                >
                  Proceed to checkout
                  <FiArrowRight size={16} />
                </Link>

                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#918575]">
                  <FiShield size={15} />
                  Secure checkout
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
