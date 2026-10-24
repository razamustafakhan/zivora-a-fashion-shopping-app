import { Open_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Zivora | Beautiful Things for Every Occasion",
    template: "%s | Zivora",
  },
  description:
    "Discover thoughtfully curated home décor, festive decorations, lighting, jewellery, fashion, and party essentials at Zivora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
