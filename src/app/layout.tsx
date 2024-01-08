/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import 'antd/lib/style/index';
import { AntdRegistry } from "@ant-design/nextjs-registry";




export const metadata: Metadata = {
  title:
    "Zestgen - A dynamic tool for generating and downloading random values as CSV files. Ideal for testing and prototyping.",
  description:
    "A dynamic tool for generating and downloading random values as CSV files. Ideal for testing and prototyping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-50">
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
