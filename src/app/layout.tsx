import type { Metadata } from "next";
import {
  Anybody,
  Archivo_Black,
  Bebas_Neue,
  Bricolage_Grotesque,
  Bungee,
  Chivo_Mono,
  Cormorant_Garamond,
  DM_Serif_Display,
  Fraunces,
  IBM_Plex_Sans_Condensed,
  Instrument_Serif,
  Newsreader,
  Oswald,
  Playfair_Display,
  Roboto_Condensed,
  Rubik_Mono_One,
  Space_Grotesk,
  Space_Mono,
  Special_Elite,
  Unbounded,
  Syne,
} from "next/font/google";
import * as ReactDOM from "react-dom";
import Script from "next/script";
import { ThemeSync } from "@/components/theme-sync";
import { portfolio_sections } from "@/lib/portfolio-content";
import { getPrototypePreconnectOrigins } from "@/lib/prototype-embed-policy";
import { getThemeInitScript } from "@/lib/theme";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const zineGrotesqueFont = Bricolage_Grotesque({
  variable: "--font-zine-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const zinePosterFont = Archivo_Black({
  variable: "--font-zine-poster",
  subsets: ["latin"],
  weight: "400",
});

const zineSerifFont = Fraunces({
  variable: "--font-zine-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const zineMonoFont = Space_Mono({
  variable: "--font-zine-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const zineCondensedFont = Oswald({
  variable: "--font-zine-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const zineModernFont = Unbounded({
  variable: "--font-zine-modern",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const zineReadableFont = Roboto_Condensed({
  variable: "--font-zine-readable",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const zineClassicFont = Playfair_Display({
  variable: "--font-zine-classic",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  style: ["normal", "italic"],
});

const zineCompressedFont = Bebas_Neue({
  variable: "--font-zine-compressed",
  subsets: ["latin"],
  weight: "400",
});

const zineElegantFont = DM_Serif_Display({
  variable: "--font-zine-elegant",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const zineLiteraryFont = Newsreader({
  variable: "--font-zine-literary",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
});

const zineProductCondensedFont = IBM_Plex_Sans_Condensed({
  variable: "--font-zine-product-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const zineGalleryFont = Syne({
  variable: "--font-zine-gallery",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const zineVariableFont = Anybody({
  variable: "--font-zine-variable",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const zineArcadeFont = Bungee({
  variable: "--font-zine-arcade",
  subsets: ["latin"],
  weight: "400",
});

const zineBrutalistFont = Rubik_Mono_One({
  variable: "--font-zine-brutalist",
  subsets: ["latin"],
  weight: "400",
});

const zineTypewriterFont = Special_Elite({
  variable: "--font-zine-typewriter",
  subsets: ["latin"],
  weight: "400",
});

const zineInkFont = Instrument_Serif({
  variable: "--font-zine-ink",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const zineCodeFont = Chivo_Mono({
  variable: "--font-zine-code",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danilocallejas.com"),
  title: {
    default: "Danilo Callejas",
    template: "%s | Danilo Callejas",
  },
  description:
    "A portfolio rebuilt as a contemporary gallery walk: staff-level product design, editorial pacing, and a selective archive of older work.",
  openGraph: {
    title: "Danilo Callejas",
    description:
      "Staff-level product design work with an editorial point of view.",
    type: "website",
    url: "https://danilocallejas.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danilo Callejas",
    description:
      "Staff-level product design work with an editorial point of view.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  getPrototypePreconnectOrigins(
    portfolio_sections.flatMap((project) => [
      project.prototype.embedUrl,
      project.prototype.openUrl,
    ]),
  ).forEach((origin) => {
    ReactDOM.prefetchDNS(origin);
    ReactDOM.preconnect(origin, { crossOrigin: "" });
  });

  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      style={{ colorScheme: "dark" }}
      className={`${bodyFont.variable} ${displayFont.variable} ${zineGrotesqueFont.variable} ${zinePosterFont.variable} ${zineSerifFont.variable} ${zineMonoFont.variable} ${zineCondensedFont.variable} ${zineModernFont.variable} ${zineReadableFont.variable} ${zineClassicFont.variable} ${zineCompressedFont.variable} ${zineElegantFont.variable} ${zineLiteraryFont.variable} ${zineProductCondensedFont.variable} ${zineGalleryFont.variable} ${zineVariableFont.variable} ${zineArcadeFont.variable} ${zineBrutalistFont.variable} ${zineTypewriterFont.variable} ${zineInkFont.variable} ${zineCodeFont.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        <ThemeSync />
        <div className="app-background fixed inset-0 -z-20" />
        <div className="site-noise fixed inset-0 -z-10" />
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {getThemeInitScript()}
        </Script>
      </body>
    </html>
  );
}
