"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

// export const metadata = {
//   title: "Online Grocery Store",
//   description: "Order groceries online conveniently",
// };

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <Header />
          {children}
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
