"use client";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

export default function ProductCard({ product, onAddToCart }) {
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#eee9df]">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-2 top-2 z-10 bg-[#faf9f6] px-2.5 py-1.5 text-[9px] uppercase tracking-wider text-[#62594d] sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-2 left-2 z-10 bg-[#292820] px-2 py-1 text-[9px] text-white sm:bottom-3 sm:left-3">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#292820] transition hover:bg-[#292820] hover:text-white sm:right-3 sm:top-3"
        >
          <FiHeart size={17} />
        </button>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => onAddToCart?.(product)}
          className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-full items-center justify-center gap-2 bg-[#292820] px-3 py-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-transform duration-300 group-hover:translate-y-0 focus:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-500 max-sm:translate-y-0"
        >
          <FiShoppingBag size={15} />
          {product.inStock ? "Add to bag" : "Out of stock"}
        </button>
      </div>

      <div className="pt-3 sm:pt-4">
        <p className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#918575] sm:text-[10px]">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-serif text-sm text-[#292820] transition hover:text-[#927650] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[#292820]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.compareAtPrice > product.price && (
            <span className="text-xs text-[#a29a8e] line-through">
              ₹{product.compareAtPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <p className="mt-2 text-[10px] text-[#817a70]">
          <span className="text-[#a17d47]">★</span> {product.rating} (
          {product.reviewCount} reviews)
        </p>
      </div>
    </article>
  );
}
