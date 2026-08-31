import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Avant de Poster — Protège-toi sur Internet",
  description:
    "Apprends à reconnaître les risques liés aux photos, vidéos et conversations sur Internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-950 antialiased dark:bg-slate-950 dark:text-white">
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}