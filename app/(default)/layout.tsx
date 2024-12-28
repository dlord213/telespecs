import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../globals.css";
import { ReactQueryProvider } from "@/hooks/ReactQueryProvider";
import Header from "@/components/Header";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeleSpecs",
  description:
    "Don't know the specifications of your mobile phone or looking for a review? Search/find your device here and find reviews from users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} antialiased 2xl:mx-[20%]`}>
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
