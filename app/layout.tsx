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
  title: "BigOrange | Asesoria de seguros",
  description:
    "Asesoria personalizada en seguros personales, empresariales y responsabilidad civil con atencion directa en Cali, Colombia."
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
