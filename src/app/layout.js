import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const neuzeitGrotesk = localFont({
  src: [
    {
      path: "./fonts/neuzeit-grotesk/neuzeit-grotesk-Light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/neuzeit-grotesk/neuzeit-grotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/neuzeit-grotesk/neuzeit-grotesk-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/neuzeit-grotesk/neuzeit-grotesk-Black.otf",
      weight: "900",
      style: "black",
    },
  ],
});

export const metadata = {
  title: "Accessories || Online Shopping in Bangladesh",
  description:
    "Shop online at Accessories for the latest electronics, fashion, groceries, and home essentials. Fast delivery and best prices across Bangladesh.",
  keywords: [
    "Accessories",
    "Online Shopping",
    "Bangladesh",
    "Ecommerce",
    "Fashion",
    "Electronics",
    "Groceries",
    "Home Essentials",
  ],
  metadataBase: new URL("https://accessories.ngengroup.org/"),
  openGraph: {
    title: "Accessories || Online Shopping in Bangladesh",
    description:
      "Discover great deals on electronics, fashion, and daily essentials at Accessories. Shop smart, shop fast!",
    url: "https://accessories.ngengroup.org/",
    siteName: "Accessories",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Accessories || Online Shopping in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessories || Shop Online in Bangladesh",
    description:
      "Shop online for fashion, electronics, and groceries at Accessories. Great prices and fast delivery!",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${neuzeitGrotesk.className} bg-[#EBEFF1] antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Suspense
              fallback={
                <div className="flex items-center justify-center md:min-h-[calc(100dvh-33rem)]">
                  Loading...
                </div>
              }
            >
              {children}
            </Suspense>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <div
          className="pointer-events-none fixed inset-0 isolate -z-1"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
            opacity: 0.55,
          }}
        />
      </body>
    </html>
  );
}
