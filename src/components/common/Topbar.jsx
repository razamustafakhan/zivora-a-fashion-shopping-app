"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi";

const pageTitles = [
  { prefix: "/admin/categories/new", title: "Add Category" },
  { prefix: "/admin/categories", title: "Categories" },
  { prefix: "/admin/products/new", title: "Add Product" },
  { prefix: "/admin/products", title: "Products" },
  { prefix: "/admin/orders", title: "Orders" },
  { prefix: "/admin/payments", title: "Payments" },
  { prefix: "/admin/customers", title: "Customers" },
  { prefix: "/admin/profile", title: "Admin Profile" },
  { prefix: "/admin", title: "Dashboard" },
];

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();

  const currentPage = pageTitles.find(
    (page) =>
      pathname === page.prefix ||
      (page.prefix !== "/admin" && pathname.startsWith(`${page.prefix}/`)),
  );

  const title = currentPage?.title || "Dashboard";

  return (
    <header className="flex h-[78px] items-center justify-between gap-4 border-b border-[#e9e4da] bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#716c63] hover:bg-[#f7f4ed] lg:hidden"
        >
          <FiMenu size={22} />
        </button>

        <div className="min-w-0">
          <p className="hidden text-[9px] uppercase tracking-[0.2em] text-[#a39a8c] sm:block">
            Zivora workspace
          </p>

          <h1 className="truncate font-serif text-xl sm:mt-1 sm:text-2xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <form
          action="/admin/products"
          method="GET"
          className="hidden h-10 w-52 items-center gap-2 border border-[#e9e4da] px-3 xl:flex"
        >
          <FiSearch size={16} className="shrink-0 text-[#a39a8c]" />

          <input
            name="search"
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a39a8c]"
          />
        </form>

        <Link
          href="/admin/orders"
          aria-label="View orders"
          title="View orders"
          className="relative flex h-10 w-10 items-center justify-center text-[#716c63] transition hover:bg-[#f7f4ed] hover:text-[#927650]"
        >
          <FiBell size={19} />
        </Link>

        <div className="h-8 w-px bg-[#e9e4da]" />

        <Link
          href="/admin/profile"
          className="flex items-center gap-2 sm:gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-[#292820] font-serif text-sm text-[#e4cfaa]">
            A
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-xs font-medium text-[#292820]">
              Administrator
            </span>
            <span className="mt-0.5 block text-[10px] text-[#999083]">
              Store management
            </span>
          </span>

          <FiChevronDown size={15} className="hidden text-[#999083] sm:block" />
        </Link>
      </div>
    </header>
  );
}
