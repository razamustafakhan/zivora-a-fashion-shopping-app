"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiTruck,
  FiShield,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

const shippingOptions = [
  {
    id: "standard",
    name: "Standard delivery",
    description: "Estimated 5–7 business days",
    price: 0,
  },
  {
    id: "express",
    name: "Express delivery",
    description: "Estimated 2–3 business days",
    price: 149,
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

const money = (amount) =>
  `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function CheckoutPage() {
  const [form, setForm] = useState(initialForm);
  const [shipping, setShipping] = useState("standard");
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const subtotal = demoItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const selectedShipping =
    shippingOptions.find((option) => option.id === shipping) ||
    shippingOptions[0];

  const shippingCost = selectedShipping.price;
  const total = subtotal + shippingCost;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setNotice("");
  }

  function validateForm() {
    const nextErrors = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (form.address.trim().length < 5) {
      nextErrors.address = "Enter your complete street address.";
    }

    if (form.city.trim().length < 2) {
      nextErrors.city = "Enter your city.";
    }

    if (form.state.trim().length < 2) {
      nextErrors.state = "Enter your state.";
    }

    if (!/^[1-9][0-9]{5}$/.test(form.postalCode.trim())) {
      nextErrors.postalCode = "Enter a valid 6-digit Indian PIN code.";
    }

    if (!form.country.trim()) {
      nextErrors.country = "Enter your country.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!validateForm()) {
      setNotice("Please correct the highlighted fields.");
      return;
    }

    // Backend integration goes here later.
    // No order is created and no customer data is persisted.
    setNotice(
      "Your details are valid. Connect the checkout API to continue to payment.",
    );
  }

  const inputClass =
    "w-full border border-[#e4dfd5] bg-white px-4 py-3.5 text-sm text-[#292820] outline-none transition placeholder:text-[#aaa397] focus:border-[#a58a65] focus:ring-1 focus:ring-[#a58a65]/20";

  function Field({
    label,
    name,
    placeholder,
    type = "text",
    autoComplete,
    required = true,
  }) {
    return (
      <div>
        <label
          htmlFor={name}
          className="mb-2 block text-xs font-medium text-[#403d35]"
        >
          {label}
          {required && <span className="ml-1 text-[#927650]">*</span>}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          className={`${inputClass} ${errors[name] ? "border-red-500" : ""}`}
        />

        {errors[name] && (
          <p
            id={`${name}-error`}
            role="alert"
            className="mt-1.5 text-xs text-red-600"
          >
            {errors[name]}
          </p>
        )}
      </div>
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
            <FiShield size={15} />
            Secure checkout
          </div>
        </div>
      </header>

      {/* Page title */}
      <section className="border-b border-[#e9e4da] px-5 py-9 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#918575]">
            <Link href="/cart" className="hover:text-[#927650]">
              Bag
            </Link>
            <span>/</span>
            <span className="text-[#292820]">Checkout</span>
            <span>/</span>
            <span>Payment</span>
          </div>

          <h1 className="mt-5 font-serif text-4xl sm:text-5xl">Checkout.</h1>

          <p className="mt-3 text-sm leading-6 text-[#777166]">
            Confirm your details and delivery preferences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid items-start gap-10 lg:grid-cols-[1fr_390px] lg:gap-14"
        >
          <div className="space-y-8">
            {/* Contact */}
            <section className="border border-[#e6e0d6] bg-white p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                  <FiMapPin size={19} />
                </span>

                <div>
                  <h2 className="font-serif text-2xl">Contact information</h2>
                  <p className="mt-1 text-xs leading-5 text-[#918575]">
                    Used for order updates and delivery coordination.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field
                    label="Full name"
                    name="fullName"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>

                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* Address */}
            <section className="border border-[#e6e0d6] bg-white p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                  <FiTruck size={19} />
                </span>

                <div>
                  <h2 className="font-serif text-2xl">Delivery address</h2>
                  <p className="mt-1 text-xs leading-5 text-[#918575]">
                    Where would you like your order delivered?
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <Field
                  label="Street address"
                  name="address"
                  placeholder="House number, street, area"
                  autoComplete="street-address"
                />

                <Field
                  label="Apartment, suite, landmark"
                  name="apartment"
                  placeholder="Apartment, floor, landmark (optional)"
                  autoComplete="address-line2"
                  required={false}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="City"
                    name="city"
                    placeholder="City"
                    autoComplete="address-level2"
                  />

                  <Field
                    label="State"
                    name="state"
                    placeholder="State"
                    autoComplete="address-level1"
                  />

                  <Field
                    label="PIN code"
                    name="postalCode"
                    placeholder="6-digit PIN code"
                    autoComplete="postal-code"
                  />

                  <Field
                    label="Country"
                    name="country"
                    placeholder="Country"
                    autoComplete="country-name"
                  />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="border border-[#e6e0d6] bg-white p-5 sm:p-8">
              <h2 className="font-serif text-2xl">Delivery method</h2>

              <p className="mt-2 text-xs leading-5 text-[#918575]">
                Choose your preferred shipping option.
              </p>

              <div className="mt-6 space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 border p-4 transition ${
                      shipping === option.id
                        ? "border-[#927650] bg-[#faf8f3]"
                        : "border-[#e6e0d6] hover:border-[#b7a58a]"
                    }`}
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shipping === option.id}
                        onChange={() => setShipping(option.id)}
                        className="mt-1 accent-[#927650]"
                      />

                      <span>
                        <span className="block text-sm font-medium">
                          {option.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#918575]">
                          {option.description}
                        </span>
                      </span>
                    </span>

                    <span className="shrink-0 text-sm">
                      {option.price === 0 ? "Free" : money(option.price)}
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-4 text-[10px] leading-5 text-[#918575]">
                Shipping prices and estimates are placeholders until your
                backend calculates available delivery options.
              </p>
            </section>

            {notice && (
              <div
                role="status"
                className={`border p-4 text-sm leading-6 ${
                  Object.keys(errors).length
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#e6e0d6] bg-white text-[#66553c]"
                }`}
              >
                {notice}
              </div>
            )}

            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-2 py-3 text-xs text-[#777166] transition hover:text-[#927650]"
              >
                <FiArrowLeft size={15} />
                Return to bag
              </Link>

              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#292820] px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#927650]"
              >
                Continue to payment
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit border border-[#e6e0d6] bg-white p-5 sm:p-8 lg:sticky lg:top-6">
            <div className="flex items-center gap-3">
              <FiShoppingBag size={19} className="text-[#927650]" />
              <h2 className="font-serif text-2xl">Order summary</h2>
            </div>

            <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#918575]">
              Demo products — not a live cart
            </p>

            <div className="mt-6 space-y-5">
              {demoItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                    <FiShoppingBag size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-sm leading-5">{item.name}</p>
                    <p className="mt-2 text-xs text-[#918575]">
                      Qty: {item.quantity}
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

            <div className="mt-6 flex gap-3 bg-[#f7f5ef] p-4">
              <FiCheck size={17} className="mt-0.5 shrink-0 text-[#927650]" />
              <p className="text-[10px] leading-5 text-[#777166]">
                Your final total must be verified by the server before payment.
              </p>
            </div>

            <Link
              href="/shop"
              className="mt-6 block text-center text-xs text-[#777166] underline underline-offset-4 transition hover:text-[#927650]"
            >
              Continue shopping
            </Link>
          </aside>
        </form>
      </section>
    </main>
  );
}
