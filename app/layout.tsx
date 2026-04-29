import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Nisa & Fata - 6 Juni 2026",
  description: "Undangan pernikahan Nisaul' Azizah & Fata Akromul Muttaqin - Sabtu, 6 Juni 2026 di Dukuh Kedungkwali, Desa Klapasawit. Semoga dapat hadir dan memberikan doa restu.",
  keywords: ["undangan pernikahan", "wedding invitation", "Nisa Fata", "6 Juni 2026", "Klapasawit"],
  openGraph: {
    title: "Undangan Pernikahan Nisa & Fata",
    description: "Sabtu, 6 Juni 2026 - Undangan Pernikahan Nisaul' Azizah & Fata Akromul Muttaqin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💒</text></svg>" />
      </head>
      <body className="font-sans antialiased bg-cream text-rolex-dark">
        {children}
      </body>
    </html>
  );
}
