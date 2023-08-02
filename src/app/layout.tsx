import "./globals.css";
import "react-material-symbols/dist/outlined.css";
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/components";

const notoSansTc = Noto_Sans_TC({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: process.env.META_TITLE,
  description: process.env.META_DESCRIPTION,
  manifest: "/manifest.json",
  openGraph: {
    url: process.env.META_OG_URL,
    images: [{ url: `${process.env.META_OG_IMAGE}` }],
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
      </body>
    </html>
  );
}
