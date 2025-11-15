import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${neuzeitGrotesk.className} bg-[#EBEFF1] antialiased`}
        >
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
            className="fixed inset-0 -z-1"
            style={{
              backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
              backgroundSize: "20px 30px",
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
