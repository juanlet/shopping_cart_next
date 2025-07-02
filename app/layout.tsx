import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./components/Provider";
import { Navbar } from "./components/Navbar"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promotional Shopping Cart",
  description: "A Next.js cart with advanced pricing rules.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <Navbar />
          <main className="container mx-auto p-4 md:p-8">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}