import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="px-4 pb-8 pt-5 sm:px-8 lg:px-12">
      <div className="relative mx-auto grid max-w-360 overflow-hidden rounded-2xl bg-[#eee9df] lg:min-h-142.5 lg:grid-cols-2">
        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#a58a65]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#927650]">
              The art of living
            </p>
          </div>

          <h1 className="max-w-xl font-serif text-4xl font-normal leading-[1.15] tracking-tight text-[#292820] sm:text-5xl lg:text-6xl xl:text-7xl">
            Make every moment
            <span className="italic text-[#9c7c53]">
              a little more beautiful.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#70695f] sm:text-base">
            Thoughtful décor, festive details, beautiful jewellery and timeless
            style for all of life&apos;s special moments.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/shop"
              className="inline-flex items-center gap-4 bg-[#292820] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.17em] text-white transition duration-300 hover:bg-[#927650]"
            >
              Explore collection
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/categories/decor"
              className="border-b border-[#b9a58b] pb-1 text-xs text-[#62594d] transition hover:text-[#927650]"
            >
              Discover décor
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.17em] text-[#847767] sm:mt-16">
            <span>Home décor</span>
            <span>✦</span>
            <span>Celebrations</span>
            <span>✦</span>
            <span>Style & jewellery</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative min-h-80 overflow-hidden sm:min-h-107.5 lg:min-h-full">
          <Image
            src="/images/zivora-hero.jpg"
            alt="Elegant Zivora lifestyle collection featuring décor and accessories"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition duration-700 hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
            <div className="rounded-lg border border-white/40 bg-white/75 px-4 py-3 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#88704f]">
                Curated with care
              </p>
              <p className="mt-1 font-serif text-lg text-[#292820]">
                Your world, your style.
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/20 text-lg text-white backdrop-blur-sm">
              ✳
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
