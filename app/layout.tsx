import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans"
});

const BASE = "https://bigorangeseguros.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "BigOrange | Asesoría de seguros en Cali",
    template: "%s | BigOrange Seguros"
  },
  description:
    "Asesoría personalizada en seguros personales, empresariales y responsabilidad civil con atención directa en Cali, Colombia. Más de 20 años de experiencia.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: BASE,
    siteName: "BigOrange Seguros",
    title: "BigOrange | Asesoría de seguros en Cali",
    description:
      "Asesoría personalizada en seguros personales, empresariales y responsabilidad civil con atención directa en Cali, Colombia. Más de 20 años de experiencia.",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "BigOrange Seguros — Asesoría de seguros en Cali"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "BigOrange | Asesoría de seguros en Cali",
    description:
      "Asesoría personalizada en seguros personales, empresariales y responsabilidad civil. Más de 20 años de experiencia en Cali, Colombia.",
    images: ["/img/og-image.png"]
  },
  icons: {
    icon: [
      { url: "/img/favicon.ico" },
      { url: "/img/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/img/logo-2.png"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "BigOrange Seguros",
  url: BASE,
  logo: `${BASE}/img/logo-1.png`,
  image: `${BASE}/img/logo-1.png`,
  description:
    "Asesoría personalizada en seguros personales, empresariales y responsabilidad civil en Cali, Colombia.",
  telephone: "+573167650809",
  email: "sulay.munoz@bigorangeseguros.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cali",
    addressRegion: "Valle del Cauca",
    addressCountry: "CO"
  },
  founder: {
    "@type": "Person",
    name: "Sulay Mariam Muñoz Paz",
    jobTitle: "Asesora de seguros",
    description:
      "Especialista en seguros de automóviles y responsabilidad civil con más de 20 años de experiencia."
  },
  areaServed: {
    "@type": "Country",
    name: "Colombia"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Portafolio de seguros BigOrange",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguros personales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguros empresariales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Responsabilidad civil" } }
    ]
  },
  sameAs: []
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.variable}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
