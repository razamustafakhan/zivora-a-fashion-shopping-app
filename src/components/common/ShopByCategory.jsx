import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Home Décor",
    subtitle: "Beautiful details for every space",
    href: "/categories/decor",
    image: "/images/categories/home-decor.jpg",
    number: "01",
  },
  {
    name: "Party & Birthday",
    subtitle: "Make every celebration special",
    href: "/categories/party",
    image: "/images/categories/party.jpg",
    number: "02",
  },
  {
    name: "Festive Collection",
    subtitle: "Bring every tradition to life",
    href: "/categories/festive",
    image: "/images/categories/festive.jpg",
    number: "03",
  },
  {
    name: "Fashion",
    subtitle: "Find your everyday statement",
    href: "/categories/fashion",
    image: "/images/categories/fashion.jpg",
    number: "04",
  },
  {
    name: "Jewellery",
    subtitle: "Details that make you shine",
    href: "/categories/jewellery",
    image: "/images/categories/jewellery.jpg",
    number: "05",
  },
  {
    name: "Lighting",
    subtitle: "A little glow goes a long way",
    href: "/categories/lighting",
    image: "/images/categories/lighting.jpg",
    number: "06",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#faf9f6] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#a58a65]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#927650]">
                Find your favourites
              </p>
            </div>

            <h2 className="font-serif text-3xl font-normal tracking-tight text-[#292820] sm:text-4xl lg:text-5xl">
              Shop by category<span className="text-[#a58a65]">.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#777166]">
              Thoughtfully chosen pieces for your home, your celebrations, and
              your personal style.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#c9b99f] pb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#49453e] transition hover:text-[#a58a65]"
          >
            Explore everything
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.name}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#eee9df]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute left-4 top-4 text-[10px] font-medium tracking-[0.18em] text-white sm:left-6 sm:top-6">
                  {category.number}
                </span>

                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-sm transition duration-300 group-hover:bg-white group-hover:text-[#292820] sm:bottom-6 sm:right-6">
                  ↗
                </span>
              </div>

              <div className="flex items-start justify-between gap-2 pt-4">
                <div>
                  <h3 className="font-serif text-lg text-[#292820] transition-colors group-hover:text-[#927650] sm:text-xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-[#817a70] sm:text-xs">
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
