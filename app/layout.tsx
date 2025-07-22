import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets : ["latin"] , variable: "--font-inter"});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight  : ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata1: Metadata = {
  title: "Asset App",
  description: "Next generation asset management application",
  icons: {
    icon: "/icons/logo.svg  ",
  }
    
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asset App",
  description: "Next generation asset management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
