import "./globals.css";
import "react-material-symbols/dist/outlined.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/components";

const notoSansTc = Noto_Sans_TC({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_META_TITLE,
  description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
  manifest: "/manifest.json",
  openGraph: {
    url: process.env.NEXT_PUBLIC_META_OG_URL,
    images: [{ url: `${process.env.NEXT_PUBLIC_META_OG_IMAGE}` }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-TW">
      <body className={notoSansTc.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        {process.env.NEXT_PUBLIC_HOSTING_SERVICE === "vercel" && <Analytics />}
      </body>
    </html>
  );
}
