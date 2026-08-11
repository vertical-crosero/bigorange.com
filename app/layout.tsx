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

export const metadata: Metadata = {
  title: "BigOrange | Asesoría de seguros",
  description:
    "Asesoría personalizada en seguros personales, empresariales y responsabilidad civil con atención directa en Cali, Colombia.",
  icons: {
    icon: [
      { url: "/img/favicon.ico" },
      { url: "/img/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/img/logo-2.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.variable}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
