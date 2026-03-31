import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vigil – Stop losing money to silent website failures",
  description:
    "Vigil alerts you before customers notice a broken checkout, sign-up, payment, or any revenue-critical flow. Join the waitlist for early access and a lifetime discount.",
  openGraph: {
    title: "Vigil – Stop losing money to silent website failures",
    description:
      "Get alerted before customers notice a broken checkout, sign-up, or payment flow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
