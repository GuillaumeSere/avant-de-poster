
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://avant-de-poster.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Avant de Poster — Protège-toi sur Internet",
    template: "%s | Avant de Poster",
  },

  description:
    "Avant de Poster aide les jeunes à mieux se protéger sur Internet : photos, vidéos, conversations avec des inconnus, vie privée et bons réflexes en ligne.",

  keywords: [
    "sécurité internet",
    "jeunes internet",
    "protection des jeunes",
    "sensibilisation internet",
    "réseaux sociaux",
    "photos internet",
    "vidéos internet",
    "conversation internet",
    "inconnus internet",
    "cyberharcèlement",
    "vie privée",
    "protéger ses données",
    "sécurité réseaux sociaux",
    "éducation numérique",
    "prévention internet",
  ],

  authors: [
    {
      name: "Guillaume Sere",
    },
  ],

  creator: "Guillaume Sere",
  publisher: "Avant de Poster",

  applicationName: "Avant de Poster",

  category: "education",

  verification: { google: "hGMCr1W6D99RGbRgZ1WGKJuTdw_Mmqq7rlSObwX_1Ic", },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,

    siteName: "Avant de Poster",

    title:
      "Avant de Poster — Protège-toi sur Internet",

    description:
      "Apprends à mieux te protéger sur Internet avant de publier une photo, envoyer une vidéo ou répondre à un inconnu.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Avant de Poster — Sensibilisation à la sécurité sur Internet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Avant de Poster — Protège-toi sur Internet",

    description:
      "Apprends à reconnaître les risques liés aux photos, vidéos et conversations sur Internet.",

    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
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
