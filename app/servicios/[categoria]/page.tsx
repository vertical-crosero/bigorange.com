import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { categories, services, type ServiceCategory } from "@/data/services";

const whatsappNumber = "573167650809";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hola Sulay, quisiera informacion sobre seguros."
)}`;

const validKeys: ServiceCategory[] = ["personas", "empresas", "responsabilidad"];

export function generateStaticParams() {
  return validKeys.map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const key = categoria as ServiceCategory;
  if (!validKeys.includes(key)) return {};
  return {
    title: `${categories[key].label} | BigOrange Seguros`,
    description: categories[key].description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const key = categoria as ServiceCategory;
  if (!validKeys.includes(key)) notFound();

  const cat = categories[key];
  const list = services.filter((s) => s.category === key);

  return (
    <>
      <header className="siteHeader">
        <nav className="navShell" aria-label="Principal">
          <Link className="logo" href="/" aria-label="BigOrange inicio">
            <Image
              src="/img/logo-horizontal.png"
              alt="BigOrange Seguros"
              width={198}
              height={154}
              className="logoImg"
              priority
            />
          </Link>
          <div className="navLinks">
            <Link href="/#inicio">Inicio</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/#cotizar">Cotizar</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
          <a className="navCta" href={whatsappHref} target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </nav>
      </header>

      <main>
        <section className="categoryDetailHero sectionShell">
          <Link href="/#servicios" className="backLink">← Volver a servicios</Link>
          <p className="eyebrow">{cat.short}</p>
          <h1>{cat.label}</h1>
          <p className="categoryDetailDesc">{cat.description}</p>
        </section>

        <section className="sectionShell sectionBlock">
          <div className="serviceDetailGrid">
            {list.map((s) => (
              <article className="serviceDetailCard" key={s.id}>
                <strong>{s.title}</strong>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="adviceBand">
          <div>
            <h2>¿Tienes dudas sobre {cat.label.toLowerCase()}?</h2>
            <p>Escríbele a Sulay y recibe asesoría personalizada, sin costo.</p>
          </div>
          <a className="lightButton" href={whatsappHref} target="_blank" rel="noreferrer">
            Hablar por WhatsApp
          </a>
        </section>
      </main>

      <footer className="footer">
        <Link className="logo" href="/" aria-label="BigOrange inicio">
          <Image
            src="/img/logo-horizontal.png"
            alt="BigOrange Seguros"
            width={198}
            height={154}
            className="logoImg"
          />
        </Link>
        <a className="footerCredit" href="https://verticaltech.ai" target="_blank" rel="noreferrer">
          <span className="footerCreditLabel">Desarrollado por</span>
          <Image
            src="/img/verticalai-logo.png"
            alt="VerticalAI"
            width={90}
            height={24}
            className="footerCreditLogo"
          />
        </a>
      </footer>
    </>
  );
}
