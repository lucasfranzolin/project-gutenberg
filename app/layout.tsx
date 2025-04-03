import "reactflow/dist/style.css";
import "./globals.css";

//

import { AppCtxProvider } from "@/context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Gutenberg Book Analyzer",
  description:
    "Analyze characters and their interactions in books from Project Gutenberg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppCtxProvider>{children}</AppCtxProvider>
      </body>
    </html>
  );
}
