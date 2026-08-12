import Link from "next/link";
import Image from "next/image";

const whatsappHref = `https://wa.me/573167650809?text=${encodeURIComponent(
  "Hola Sulay, quisiera informacion sobre seguros."
)}`;

export default function Navbar() {
  return (
    <header className="siteHeader">
      <nav className="navShell" aria-label="Principal">
        <Link className="logo" href="/" aria-label="BigOrange inicio">
          <Image
            src="/img/logo-horizontal.png"
            alt="BigOrange Seguros"
            width={198}
            height={154}
            className="logoImg"
            loading="eager"
            priority
          />
        </Link>

        <div className="navLinks">
          <Link href="/">Inicio</Link>

          <div className="navDropdown">
            <span className="navDropdownTrigger">
              Servicios
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="navDropdownMenu" role="menu">
              <Link href="/servicios/personas" className="navDropdownItem" role="menuitem">
                <strong>Seguros personales</strong>
                <span>Vida, salud, hogar, autos y más</span>
              </Link>
              <Link href="/servicios/empresas" className="navDropdownItem" role="menuitem">
                <strong>Seguros empresariales</strong>
                <span>Activos, transporte y cumplimiento</span>
              </Link>
              <Link href="/servicios/responsabilidad" className="navDropdownItem" role="menuitem">
                <strong>Responsabilidad civil</strong>
                <span>Respaldo ante reclamaciones de terceros</span>
              </Link>
            </div>
          </div>

          <Link href="/#cotizar">Cotizar</Link>
          <Link href="/#contacto">Contacto</Link>
        </div>

        <a className="navCta" href={whatsappHref} target="_blank" rel="noreferrer">
          Escríbenos por WhatsApp
        </a>
      </nav>
    </header>
  );
}
