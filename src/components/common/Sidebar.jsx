"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiTag,
  FiPlusSquare,
  FiList,
  FiPackage,
  FiUsers,
  FiCreditCard,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiHome,
  FiLogOut,
} from "react-icons/fi";

const navigation = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/admin", icon: FiGrid, exact: true }],
  },
  {
    label: "CATALOG",
    items: [
      { label: "All Products", href: "/admin/products", icon: FiShoppingBag },
      {
        label: "Add Product",
        href: "/admin/products/new",
        icon: FiPlusSquare,
        exact: true,
      },
      { label: "Categories", href: "/admin/categories", icon: FiTag },
      {
        label: "Add Category",
        href: "/admin/categories/new",
        icon: FiList,
        exact: true,
      },
    ],
  },
  {
    label: "SALES",
    items: [
      { label: "Orders", href: "/admin/orders", icon: FiPackage },
      { label: "Payments", href: "/admin/payments", icon: FiCreditCard },
      { label: "Customers", href: "/admin/customers", icon: FiUsers },
    ],
  },
  {
    label: "ACCOUNT",
    items: [{ label: "Admin Profile", href: "/admin/profile", icon: FiUser }],
  },
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#e9e4da] bg-white transition-all duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 ${
          collapsed ? "lg:w-[82px]" : "lg:w-[265px]"
        } ${
          mobileOpen
            ? "w-[280px] translate-x-0"
            : "w-[280px] -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-[#eee9e0] px-5">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#292820] font-serif text-xl text-[#e4cfaa]">
              Z
            </span>

            {(!collapsed || mobileOpen) && (
              <span>
                <span className="block font-serif text-xl tracking-[0.15em]">
                  ZIVORA
                </span>
                <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#927650]">
                  Administration
                </span>
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="text-[#777166] hover:text-[#292820] lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
          {navigation.map((group) => (
            <div key={group.label}>
              {(!collapsed || mobileOpen) && (
                <p className="mb-3 px-3 text-[9px] font-semibold tracking-[0.18em] text-[#a39a8c]">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      title={collapsed && !mobileOpen ? item.label : undefined}
                      className={`group flex min-h-11 items-center gap-3 rounded-sm px-3 text-[13px] transition ${
                        active
                          ? "bg-[#f4efe5] font-medium text-[#7f633e]"
                          : "text-[#716c63] hover:bg-[#faf8f4] hover:text-[#292820]"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`shrink-0 ${
                          active
                            ? "text-[#927650]"
                            : "text-[#999083] group-hover:text-[#927650]"
                        }`}
                      />

                      {(!collapsed || mobileOpen) && (
                        <span className="flex-1">{item.label}</span>
                      )}

                      {active && (!collapsed || mobileOpen) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#927650]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#eee9e0] p-3">
          <Link
            href="/"
            title="View storefront"
            className="flex min-h-11 items-center gap-3 rounded-sm px-3 text-[13px] text-[#716c63] transition hover:bg-[#faf8f4] hover:text-[#927650]"
          >
            <FiHome size={18} className="shrink-0" />
            {(!collapsed || mobileOpen) && <span>View storefront</span>}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="mt-2 hidden min-h-10 w-full items-center gap-3 rounded-sm px-3 text-xs text-[#999083] hover:bg-[#faf8f4] hover:text-[#292820] lg:flex"
          >
            {collapsed ? (
              <FiChevronRight size={17} />
            ) : (
              <FiChevronLeft size={17} />
            )}
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
