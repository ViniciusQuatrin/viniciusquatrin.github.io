import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import { home } from "@/content/home";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: home.meta.title,
    template: `%s — ${site.name}`,
  },
  description: home.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} h-full`}>
      <body className={`${sans.className} shell antialiased`}>
        <SkipLink />
        <SiteHeader />
        <main id="conteudo" className="main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
