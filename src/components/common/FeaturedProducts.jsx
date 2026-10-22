import { products } from "@/data/product";
import Link from "next/link";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ onAddToCart }) {
  return (
    <section className="bg-[#faf9f6] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-9 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#927650]">
              The Zivora edit
            </p>

            <h2 className="font-serif text-3xl font-normal text-[#292820] sm:text-4xl lg:text-5xl">
              Pieces to fall for.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#777166]">
              Discover little details that make everyday living special.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 border-b border-[#c9b99f] pb-2 text-[10px] font-medium uppercase tracking-wider text-[#49453e] transition hover:text-[#927650] sm:text-xs"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-7">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
