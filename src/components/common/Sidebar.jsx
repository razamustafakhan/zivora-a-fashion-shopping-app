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
      {
        label: "All Products",
        href: "/admin/product/list",
        icon: FiShoppingBag,
      },
      {
        label: "Add Product",
        href: "/admin/product/new",
        icon: FiPlusSquare,
        exact: true,
      },
      { label: "Categories", href: "/admin/category/list", icon: FiTag },
      {
        label: "Add Category",
        href: "/admin/category/new",
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
      <aside className="border-r border-[#e9e4da] bg-white transition-all duration-300 flex-1">
        {/* Brand */}
        <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-[#eee9e0] px-5">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#292820] font-serif text-xl text-[#e4cfaa]">
              Z
            </span>
            <span>Zivora</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7  px-3 py-6">
          {navigation.map((group) => (
            <div key={group.label}>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={item.label}
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

                      <span className="flex-1">{item.label}</span>

                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#927650]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
