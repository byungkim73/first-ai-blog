import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "A simple Markdown-powered blog built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Field Notes home">
            Field Notes
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Home</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
