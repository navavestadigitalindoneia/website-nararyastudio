import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Nararya Studio — Digital Creative Studio",
    template: "%s | Nararya Studio",
  },
  description:
    "Nararya Studio — digital product, creative design services, custom requests, and selected project work.",
  applicationName: "Nararya Studio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Nararya Studio — Digital Creative Studio",
    description: "Digital products and creative services by Nararya Studio.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}