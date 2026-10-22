import Link from "next/link";
import {
  FiArrowRight,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Home Decor", href: "/categories/decor" },
  { label: "Party & Birthday", href: "/categories/party" },
  { label: "Festive Collection", href: "/categories/festive" },
  { label: "Fashion", href: "/categories/fashion" },
  { label: "Jewellery", href: "/categories/jewellery" },
  { label: "Lighting", href: "/categories/lighting" },
];

const helpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns & Refunds", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#292820] text-[#f8f4ec]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:items-center lg:px-12">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#d8c2a1]">
              A note from Zivora
            </p>

            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl">
              A little beauty in your inbox.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#bdb7ab]">
              Discover new arrivals, thoughtful collections, and inspiration for
              your next celebration.
            </p>
          </div>

          <form
            action="/newsletter"
            method="post"
            className="flex border-b border-[#8d8372] pb-3"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>

            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#969083] focus:placeholder:text-[#c6beb0]"
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="ml-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#e2cba9] transition hover:text-white"
            >
              Subscribe
              <FiArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-4 lg:px-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-medium tracking-[0.15em]">
              ZIVORA
            </span>
            <span className="mt-2 block text-[8px] uppercase tracking-[0.38em] text-[#d8c2a1]">
              The art of living
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-[#bdb7ab]">
            Thoughtful details, beautiful spaces, and little things that make
            every celebration special.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8c2a1] hover:text-[#d8c2a1]"
            >
              <FiInstagram size={17} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8c2a1] hover:text-[#d8c2a1]"
            >
              <FiFacebook size={17} />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8c2a1] hover:text-[#d8c2a1]"
            >
              <FiYoutube size={17} />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e2cba9]">
            Explore
          </h3>

          <ul className="space-y-3.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#bdb7ab] transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer care */}
        <div>
          <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e2cba9]">
            Customer Care
          </h3>

          <ul className="space-y-3.5">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#bdb7ab] transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e2cba9]">
            Get in Touch
          </h3>

          <ul className="space-y-5">
            <li className="flex items-start gap-3 text-sm leading-6 text-[#bdb7ab]">
              <FiMail className="mt-1 shrink-0 text-[#d8c2a1]" size={17} />
              <a
                href="mailto:support@yourdomain.com"
                className="transition hover:text-white"
              >
                support@yourdomain.com
              </a>
            </li>

            <li className="flex items-start gap-3 text-sm text-[#bdb7ab]">
              <FiPhone className="mt-1 shrink-0 text-[#d8c2a1]" size={17} />
              <span>Customer support</span>
            </li>

            <li className="flex items-start gap-3 text-sm leading-6 text-[#bdb7ab]">
              <FiMapPin className="mt-1 shrink-0 text-[#d8c2a1]" size={17} />
              <span>Made for life's special moments.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 text-[11px] text-[#a9a294] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {new Date().getFullYear()} Zivora. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/return-policy" className="transition hover:text-white">
              Refunds
            </Link>
          </div>

          <p className="tracking-wide">
            Thoughtfully curated. Beautifully yours.
          </p>
        </div>
      </div>
    </footer>
  );
}
