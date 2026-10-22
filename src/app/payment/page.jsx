"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiCreditCard,
  FiSmartphone,
  FiPackage,
  FiTruck,
  FiLock,
} from "react-icons/fi";

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay using your preferred UPI app",
    icon: FiSmartphone,
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard and other supported cards",
    icon: FiCreditCard,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: FiPackage,
  },
];

const demoItems = [
  {
    id: "demo-1",
    name: "Sculptural Ceramic Vase",
    price: 899,
    quantity: 1,
  },
  {
    id: "demo-2",
    name: "Warm Fairy Lights",
    price: 499,
    quantity: 1,
  },
];

const shippingCost = 0;

const money = (amount) =>
  `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function PaymentPage() {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = demoItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal + shippingCost;

  function handleMethodChange(nextMethod) {
    setMethod(nextMethod);
    setErrors({});
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (method === "upi") {
      const value = upiId.trim();

      if (!/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9.-]{1,63}$/.test(value)) {
        nextErrors.upiId = "Enter a valid UPI ID, such as name@bank.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setNotice("Please correct the highlighted field.");
      return;
    }

    // Backend/payment gateway integration goes here.
    // This demo does not create an order or initiate a payment.
    setNotice(
      method === "cod"
        ? "COD selected. Connect your checkout API to place the order."
        : method === "upi"
          ? "UPI details validated. Connect your payment gateway to continue."
          : "Card payment selected. Connect a secure payment gateway to continue.",
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292820]">
      {/* Header */}
      <header className="border-b border-[#e9e4da] bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="font-serif text-2xl tracking-[0.16em]">
            ZIVORA
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#777166]">
            <FiLock size={15} />
            Secure payment
          </div>
        </div>
      </header>

      {/* Page intro */}
      <section className="border-b border-[#e9e4da] px-5 py-9 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#918575]">
            <Link href="/cart" className="hover:text-[#927650]">
              Bag
            </Link>
            <span>/</span>
            <Link href="/checkout" className="hover:text-[#927650]">
              Checkout
            </Link>
            <span>/</span>
            <span className="text-[#292820]">Payment</span>
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#927650]">
            Almost yours
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Payment.</h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#777166]">
            Choose how you would like to pay for your Zivora selection.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-10 lg:grid-cols-[1fr_390px] lg:gap-14"
        >
          {/* Payment options */}
          <div>
            <section className="border border-[#e6e0d6] bg-white p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                  <FiCreditCard size={19} />
                </span>

                <div>
                  <h2 className="font-serif text-2xl">Payment method</h2>
                  <p className="mt-1 text-xs leading-5 text-[#918575]">
                    Select your preferred payment option.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {paymentMethods.map((option) => {
                  const Icon = option.icon;
                  const selected = method === option.id;

                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-start gap-4 border p-4 transition sm:p-5 ${
                        selected
                          ? "border-[#927650] bg-[#faf8f3]"
                          : "border-[#e6e0d6] hover:border-[#b7a58a]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={selected}
                        onChange={() => handleMethodChange(option.id)}
                        className="mt-1 accent-[#927650]"
                      />

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#927650]">
                        <Icon size={20} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {option.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#918575]">
                          {option.description}
                        </span>
                      </span>

                      {selected && (
                        <FiCheckCircle
                          size={18}
                          className="mt-1 shrink-0 text-[#927650]"
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* UPI */}
              {method === "upi" && (
                <div className="mt-6 border-t border-[#e6e0d6] pt-6">
                  <label htmlFor="upiId" className="block text-xs font-medium">
                    UPI ID
                  </label>

                  <input
                    id="upiId"
                    name="upiId"
                    type="text"
                    autoComplete="off"
                    value={upiId}
                    onChange={(event) => {
                      setUpiId(event.target.value);
                      setErrors({});
                      setNotice("");
                    }}
                    placeholder="yourname@bank"
                    aria-invalid={Boolean(errors.upiId)}
                    aria-describedby={errors.upiId ? "upi-error" : undefined}
                    className={`mt-2 w-full border bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#927650] ${
                      errors.upiId ? "border-red-500" : "border-[#e4dfd5]"
                    }`}
                  />

                  {errors.upiId && (
                    <p
                      id="upi-error"
                      role="alert"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.upiId}
                    </p>
                  )}

                  <p className="mt-3 text-xs leading-5 text-[#918575]">
                    This is a UI placeholder. Actual UPI payment requests must
                    be generated and verified through your payment provider.
                  </p>
                </div>
              )}

              {/* Card */}
              {method === "card" && (
                <div className="mt-6 border-t border-[#e6e0d6] pt-6">
                  <div className="flex items-start gap-3 bg-[#f7f5ef] p-4">
                    <FiLock
                      size={17}
                      className="mt-0.5 shrink-0 text-[#927650]"
                    />
                    <p className="text-xs leading-6 text-[#777166]">
                      Card entry will be provided by your payment gateway. No
                      card information is collected or stored on this demo page.
                    </p>
                  </div>
                </div>
              )}

              {/* COD */}
              {method === "cod" && (
                <div className="mt-6 border-t border-[#e6e0d6] pt-6">
                  <div className="flex items-start gap-3 bg-[#f7f5ef] p-4">
                    <FiTruck
                      size={17}
                      className="mt-0.5 shrink-0 text-[#927650]"
                    />
                    <p className="text-xs leading-6 text-[#777166]">
                      Cash on Delivery availability, service fees, and order
                      limits must be confirmed by your backend.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <div className="mt-6 flex items-start gap-3 border border-[#e6e0d6] bg-white p-5">
              <FiShield size={18} className="mt-0.5 shrink-0 text-[#927650]" />
              <div>
                <p className="text-sm font-medium">Your security matters</p>
                <p className="mt-1 text-xs leading-5 text-[#918575]">
                  Use a trusted payment provider and verify payment status on
                  your server before marking an order as paid.
                </p>
              </div>
            </div>

            {notice && (
              <div
                role="status"
                className="mt-5 border border-[#e6e0d6] bg-white p-4 text-sm leading-6 text-[#66553c]"
              >
                {notice}
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 py-3 text-xs text-[#777166] transition hover:text-[#927650]"
              >
                <FiArrowLeft size={15} />
                Back to checkout
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#292820] px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#927650] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {method === "cod" ? "Continue with COD" : "Continue to pay"}
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Order summary */}
          <aside className="h-fit border border-[#e6e0d6] bg-white p-5 sm:p-8 lg:sticky lg:top-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#927650]">
              Your selection
            </p>

            <h2 className="mt-3 font-serif text-2xl">Order summary</h2>

            <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-[#918575]">
              Demo products — not a live order
            </p>

            <div className="mt-6 space-y-5">
              {demoItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                    <FiPackage size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-sm leading-5">{item.name}</p>
                    <p className="mt-2 text-xs text-[#918575]">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm">
                    {money(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-4 border-t border-[#e6e0d6] pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[#777166]">Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[#777166]">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : money(shippingCost)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#e6e0d6] pt-5">
              <span className="text-sm font-medium">Total</span>
              <span className="text-xl font-medium">{money(total)}</span>
            </div>

            <div className="mt-6 flex items-start gap-3 bg-[#f7f5ef] p-4">
              <FiCheckCircle
                size={16}
                className="mt-0.5 shrink-0 text-[#927650]"
              />
              <p className="text-[10px] leading-5 text-[#777166]">
                The server must verify the final amount and payment status
                before confirming an order.
              </p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
