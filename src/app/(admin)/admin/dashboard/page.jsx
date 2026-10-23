"use client";

import React from "react";
import Link from "next/link";
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiPlus,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiCalendar,
} from "react-icons/fi";

const stats = [
  {
    label: "Total Revenue",
    value: "₹2,84,650",
    change: "+12.8%",
    positive: true,
    icon: FiCreditCard,
    description: "vs. previous month",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: FiPackage,
    description: "vs. previous month",
  },
  {
    label: "Total Products",
    value: "356",
    change: "+4.6%",
    positive: true,
    icon: FiShoppingBag,
    description: "vs. previous month",
  },
  {
    label: "Total Customers",
    value: "2,410",
    change: "-2.4%",
    positive: false,
    icon: FiUsers,
    description: "vs. previous month",
  },
];

const orders = [
  {
    id: "#ZV-1048",
    customer: "Aarav Sharma",
    product: "Ceramic Table Vase",
    date: "22 Oct, 2026",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#ZV-1047",
    customer: "Ananya Verma",
    product: "Pearl Gold Necklace",
    date: "22 Oct, 2026",
    amount: "₹3,850",
    status: "Processing",
  },
  {
    id: "#ZV-1046",
    customer: "Ishita Kapoor",
    product: "Festive Candle Set",
    date: "21 Oct, 2026",
    amount: "₹1,299",
    status: "Shipped",
  },
  {
    id: "#ZV-1045",
    customer: "Rohan Mehta",
    product: "Decorative Wall Mirror",
    date: "21 Oct, 2026",
    amount: "₹4,500",
    status: "Pending",
  },
  {
    id: "#ZV-1044",
    customer: "Meera Singh",
    product: "Elegant Gift Hamper",
    date: "20 Oct, 2026",
    amount: "₹2,150",
    status: "Delivered",
  },
];

const products = [
  {
    name: "Ceramic Table Vase",
    category: "Home Décor",
    sold: 128,
    revenue: "₹31,240",
    stock: 8,
    initials: "CV",
    color: "bg-[#eee4d6] text-[#927650]",
  },
  {
    name: "Pearl Gold Necklace",
    category: "Jewellery",
    sold: 96,
    revenue: "₹28,800",
    stock: 24,
    initials: "PG",
    color: "bg-[#eee7e0] text-[#927650]",
  },
  {
    name: "Festive Candle Set",
    category: "Celebrations",
    sold: 84,
    revenue: "₹16,800",
    stock: 5,
    initials: "FC",
    color: "bg-[#e8e9df] text-[#69735b]",
  },
  {
    name: "Decorative Wall Mirror",
    category: "Home Décor",
    sold: 67,
    revenue: "₹26,800",
    stock: 18,
    initials: "WM",
    color: "bg-[#e9e2d8] text-[#806b50]",
  },
];

const activities = [
  {
    icon: FiCheckCircle,
    color: "bg-[#e8efe4] text-[#718363]",
    title: "Order delivered",
    detail: "Order #ZV-1044 was delivered successfully.",
    time: "20 min ago",
  },
  {
    icon: FiPackage,
    color: "bg-[#f2eadb] text-[#927650]",
    title: "New order received",
    detail: "Order #ZV-1048 · ₹2,499",
    time: "45 min ago",
  },
  {
    icon: FiUsers,
    color: "bg-[#e8eaf1] text-[#737c9b]",
    title: "New customer registered",
    detail: "A new customer joined Zivora.",
    time: "1 hour ago",
  },
];

const sales = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 84 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 73 },
];

const statusStyles = {
  Delivered: "bg-[#e9f0e5] text-[#627b52]",
  Processing: "bg-[#f4ecda] text-[#927650]",
  Shipped: "bg-[#e8edf5] text-[#61799d]",
  Pending: "bg-[#f5e8e4] text-[#a36e5e]",
};

function SectionHeading({ title, subtitle, action, href }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      {" "}
      <div>
        {" "}
        <h2 className="font-serif text-xl text-[#292820] sm:text-2xl">
          {" "}
          {title}{" "}
        </h2>{" "}
        {subtitle && (
          <p className="mt-1 text-xs text-[#8b8478]">{subtitle}</p>
        )}{" "}
      </div>
      {action && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#927650] transition hover:text-[#292820]"
        >
          {action}
          <FiArrowUpRight size={14} />
        </Link>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-6 text-[#292820] sm:px-6 lg:px-9 lg:py-8">
      {" "}
      <div className="mx-auto max-w-[1600px] space-y-8">
        {" "}
        {/* Page heading */}{" "}
        <header className="flex flex-col justify-between gap-5 border-b border-[#e9e4da] pb-6 sm:flex-row sm:items-center">
          {" "}
          <div>
            {" "}
            <div className="mb-3 flex items-center gap-2">
              {" "}
              <span className="h-px w-7 bg-[#a58a65]" />{" "}
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
                {" "}
                The art of management{" "}
              </p>{" "}
            </div>
            <h1 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
              Dashboard<span className="text-[#a58a65]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#827b70]">
              Welcome back. Here&apos;s what&apos;s happening with your store.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 items-center gap-2 border border-[#e8e2d7] bg-white px-3 text-xs text-[#70695f]">
              <FiCalendar size={15} className="text-[#927650]" />
              22 October, 2026
            </div>

            <Link
              href="/admin/products/new"
              className="inline-flex h-10 items-center gap-2 bg-[#292820] px-4 text-xs font-medium text-white transition hover:bg-[#927650]"
            >
              <FiPlus size={16} />
              Add product
            </Link>
          </div>
        </header>
        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8173]">
              Store overview
            </h2>
            <span className="text-[10px] text-[#a09789]">
              Monthly performance
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const TrendIcon = stat.positive
                ? FiArrowUpRight
                : FiArrowDownRight;

              return (
                <article
                  key={stat.label}
                  className="border border-[#eae5db] bg-white p-5 transition duration-300 hover:border-[#d7c6aa] sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-xs text-[#81796e]">{stat.label}</p>
                    <span className="flex h-9 w-9 items-center justify-center bg-[#f5f0e7] text-[#927650]">
                      <Icon size={18} />
                    </span>
                  </div>

                  <p className="mt-5 font-serif text-2xl tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        stat.positive ? "text-[#718363]" : "text-[#b16d5d]"
                      }`}
                    >
                      <TrendIcon size={13} />
                      {stat.change}
                    </span>
                    <span className="text-[10px] text-[#a0988d]">
                      {stat.description}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        {/* Sales chart and activity */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
          <article className="border border-[#eae5db] bg-white p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#927650]">
                  Revenue analytics
                </p>
                <h2 className="mt-2 font-serif text-2xl">Sales performance</h2>
                <p className="mt-1 text-xs text-[#928a7e]">
                  Weekly revenue overview
                </p>
              </div>

              <button
                type="button"
                aria-label="More sales analytics options"
                className="p-2 text-[#918879] transition hover:bg-[#f8f5ef]"
              >
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            <div className="mt-8 flex items-end justify-between gap-2 sm:gap-4">
              <div>
                <p className="font-serif text-3xl sm:text-4xl">₹84,250</p>
                <p className="mt-2 flex items-center gap-1 text-[11px] text-[#718363]">
                  <FiArrowUpRight size={14} />
                  16.4% increase this week
                </p>
              </div>

              <span className="border border-[#e9e2d7] px-3 py-2 text-[10px] text-[#746c60]">
                This week
              </span>
            </div>

            <div
              className="mt-8 flex h-48 items-end justify-between gap-2 border-b border-[#eee9e0] px-1 sm:gap-4"
              role="img"
              aria-label="Illustrative weekly sales chart: Monday 42, Tuesday 68, Wednesday 52, Thursday 84, Friday 60, Saturday 96, Sunday 73 percent of chart height."
            >
              {sales.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end">
                    <div
                      className={`w-full transition-all duration-300 hover:bg-[#927650] ${
                        item.day === "Sat" ? "bg-[#927650]" : "bg-[#e8decd]"
                      }`}
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  <span className="pb-3 text-[10px] text-[#948b7e]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#948b7e]">
              <span>Sales are shown as illustrative chart values.</span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#927650]" />
                Highest sales day
              </span>
            </div>
          </article>

          <article className="border border-[#eae5db] bg-white p-5 sm:p-7">
            <SectionHeading
              title="Recent activity"
              subtitle="The latest updates from your store"
              action="View orders"
              href="/admin/orders"
            />

            <div className="space-y-0">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className={`flex gap-3 py-5 ${
                      index !== activities.length - 1
                        ? "border-b border-[#f0ece5]"
                        : ""
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center ${activity.color}`}
                    >
                      <Icon size={17} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#8b8378]">
                        {activity.detail}
                      </p>
                      <p className="mt-2 flex items-center gap-1 text-[10px] text-[#a39a8e]">
                        <FiClock size={11} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 border-t border-[#eee9e0] pt-4">
              <Link
                href="/admin/orders"
                className="flex items-center justify-center gap-2 py-2 text-xs text-[#927650] transition hover:text-[#292820]"
              >
                View all activity
                <FiArrowUpRight size={14} />
              </Link>
            </div>
          </article>
        </section>
        {/* Orders table */}
        <section>
          <SectionHeading
            title="Recent orders"
            subtitle="Track and manage your latest customer purchases"
            action="View all orders"
            href="/admin/orders"
          />

          <div className="overflow-hidden border border-[#eae5db] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#eee9e0] bg-[#fbfaf7]">
                    {[
                      "ORDER ID",
                      "CUSTOMER",
                      "PRODUCT",
                      "DATE",
                      "AMOUNT",
                      "STATUS",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-[9px] font-medium tracking-[0.15em] text-[#918779]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#f0ece5] last:border-0 transition hover:bg-[#fdfcf9]"
                    >
                      <td className="px-5 py-4 text-xs font-medium text-[#927650]">
                        {order.id}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#39372f]">
                        {order.customer}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#70695f]">
                        {order.product}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#8b8378]">
                        {order.date}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium">
                        {order.amount}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] ${statusStyles[order.status]}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eee9e0] px-5 py-4">
              <p className="text-[10px] text-[#968d80]">
                Showing {orders.length} recent orders
              </p>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-2 text-xs text-[#927650] hover:text-[#292820]"
              >
                Manage orders
                <FiArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
        {/* Best-selling products */}
        <section>
          <SectionHeading
            title="Best-selling products"
            subtitle="Your most popular pieces this month"
            action="Manage products"
            href="/admin/products"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="border border-[#eae5db] bg-white p-5 transition duration-300 hover:border-[#d7c6aa]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center font-serif text-lg ${product.color}`}
                  >
                    {product.initials}
                  </div>
                  <span className="text-[10px] tracking-[0.12em] text-[#a08a69]">
                    #{index + 1}
                  </span>
                </div>

                <p className="mt-5 font-serif text-lg">{product.name}</p>
                <p className="mt-1 text-[11px] text-[#92897d]">
                  {product.category}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#eee9e0] pt-4">
                  <div>
                    <p className="text-[10px] text-[#9a9185]">Units sold</p>
                    <p className="mt-1 text-sm font-medium">{product.sold}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9a9185]">Revenue</p>
                    <p className="mt-1 text-sm font-medium">
                      {product.revenue}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#eee9e0] pt-4">
                  <span className="text-[10px] text-[#918779]">
                    Stock remaining
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      product.stock < 10 ? "text-[#b16d5d]" : "text-[#718363]"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </div>

                {product.stock < 10 && (
                  <p className="mt-3 flex items-center gap-1.5 text-[10px] text-[#b16d5d]">
                    <FiTruck size={13} />
                    Low stock — consider restocking
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
        {/* Quick actions */}
        <section className="border border-[#e8e0d3] bg-[#eee9df] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#927650]">
                Your store, your vision
              </p>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
                What would you like to do today?
              </h2>
              <p className="mt-2 max-w-xl text-xs leading-6 text-[#766e62]">
                Keep your collections fresh, delight your customers, and make
                every shopping experience a little more beautiful.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 bg-[#292820] px-5 py-3 text-xs text-white transition hover:bg-[#927650]"
              >
                <FiPlus size={15} />
                Add a product
              </Link>

              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-2 border border-[#cfc3b0] px-5 py-3 text-xs text-[#62594d] transition hover:border-[#927650] hover:text-[#927650]"
              >
                <FiEye size={15} />
                Manage orders
              </Link>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9e4da] pt-5 text-[10px] text-[#9a9185]">
          <p>© 2026 Zivora. The art of living beautifully.</p>
          <p>Admin dashboard · Store overview</p>
        </footer>
      </div>
    </main>
  );
}
