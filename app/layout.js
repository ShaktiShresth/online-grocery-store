import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Online Grocery Store",
  description: "Order groceries online conveniently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
