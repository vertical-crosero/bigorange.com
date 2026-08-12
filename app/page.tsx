import Image from "next/image";
import QuoteForm from "./components/QuoteForm";
import ServiceCards from "./components/ServiceCards";
import Navbar from "./components/Navbar";

const whatsappNumber = "573167650809";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hola Sulay, quisiera informacion sobre seguros."
)}`;

const protectionTracks = [
  {
    label: "Personas",
    title: "Familia, salud y patrimonio",
    text: "Vida, salud, hogar, autos, SOAT y accidentes personales para decisiones cotidianas de protección.",
    href: "#servicios",
  },
  {
    label: "Empresas",
    title: "Operación y continuidad",
    text: "Pólizas empresariales, transporte, cumplimiento, todo riesgo y arrendamiento para operar con respaldo.",
    href: "#servicios",
  },
  {
    label: "RC",
    title: "Responsabilidad civil",
    text: "Coberturas para profesionales, clínicas, hospitales y actividades con exposición ante terceros.",
    href: "#servicios",
  },
];

const trustPoints = [
  "Lectura clara del riesgo antes de cotizar",
  "Comparación entre alternativas del mercado",
  "Acompañamiento directo en emisión y siniestros",
];

const process = [
  ["01", "Diagnóstico", "Entendemos tu actividad, bienes, familia o contrato para definir qué riesgo se debe cubrir."],
  ["02", "Comparación", "Revisamos opciones de aseguradoras y aterrizamos diferencias de cobertura, exclusiones y costo."],
  ["03", "Decisión", "Te ayudamos a elegir una póliza coherente y dejamos claro qué queda protegido."],
  ["04", "Acompañamiento", "Después de emitir, tienes una asesora disponible para renovaciones, dudas y siniestros."],
];

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="BigOrange inicio">
      <Image
        src="/img/logo-horizontal.png"
        alt="BigOrange Seguros"
        width={198}
        height={154}
        className="logoImg"
        loading="eager"
        priority
      />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero sectionShell" id="inicio">
          <div className="heroOrb heroOrbAnim" aria-hidden="true" />
          <div className="heroCopy">

            <h1 className="heroAnim" style={{ animationDelay: "180ms" }}>
              Seguros pensados para proteger lo que más te importa.
            </h1>            
            <p className="heroText heroAnim" style={{ animationDelay: "450ms" }}>
              BigOrange te ayuda a entender qué cobertura necesitas, comparar
              opciones y tomar una decisión con respaldo profesional.
            </p>
            <div className="heroActions heroAnim" style={{ animationDelay: "600ms" }}>
              <a className="primaryButton" href="#cotizar">
                Solicitar asesoría
              </a>
              <a className="secondaryButton" href="#servicios">
                Ver pólizas
              </a>
            </div>
            <div className="heroProof heroAnim" style={{ animationDelay: "720ms" }}>
              <strong>20+</strong>
              <span>años de experiencia orientando decisiones de seguros.</span>
            </div>
          </div>

          <div className="heroVisual heroVisualAnim" aria-label="Asesora BigOrange">
            <div className="portraitFrame">
              <Image
                src="/img/Subject.png"
                alt="Asesora de seguros BigOrange"
                width={773}
                height={1138}
                priority
                sizes="(max-width: 768px) 78vw, 38vw"
              />
            </div>
          </div>
        </section>

        <section className="tracks sectionShell" aria-label="Rutas de protección">
          {protectionTracks.map((track, i) => (
            <a className="trackCard reveal" data-delay={i * 100} href={track.href} key={track.label}>
              <span>{track.label}</span>
              <h2>{track.title}</h2>
              <p>{track.text}</p>
            </a>
          ))}
        </section>

        <section className="sectionShell sectionBlock" id="servicios">
          <div className="sectionIntro split reveal">
            <div>
              <p className="eyebrow">Portafolio</p>
              <h2>Tres frentes de protección, una asesoría clara.</h2>
            </div>
            <p>
              No se trata de comprar cualquier póliza. Se trata de identificar
              la cobertura adecuada para tu etapa personal, operación empresarial
              o exposición profesional.
            </p>
          </div>

          <ServiceCards />
        </section>

        <section className="advisorBand sectionShell reveal" aria-label="Acompañamiento">
          <div className="advisorPortrait">
            <Image
              src="/img/logo-icon-navy-solid.png"
              alt=""
              width={180}
              height={180}
            />
          </div>
          <div className="advisorCopy">
            <p className="eyebrow">Cómo trabaja BigOrange</p>
            <h2>La diferencia está en entender el riesgo antes de recomendar una póliza.</h2>
            <p>
              Sulay acompaña cada caso con una mirada práctica: qué necesitas
              proteger, qué exige un contrato, qué puede afectar tu patrimonio y
              qué exclusiones debes conocer antes de firmar.
            </p>
          </div>
          <ul className="trustList">
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="processSection sectionShell">
          <div className="sectionIntro centered reveal">
            <p className="eyebrow">Proceso</p>
            <h2>Un proceso pensado para decidir con información.</h2>
            <p>
              Desde la primera conversación hasta la renovación, la asesoría
              mantiene el foco en claridad, respaldo y continuidad.
            </p>
          </div>
          <div className="processGrid">
            {process.map(([step, title, text], i) => (
              <article className="processCard reveal" data-delay={i * 80} key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <QuoteForm />

        <section className="adviceBand reveal" id="contacto">
          <div>
            <h2>¿Listo para proteger lo que más te importa?</h2>
            <p>
              Escríbele directamente a Sulay y recibe una primera orientación sin costo.
            </p>
          </div>
          <a className="lightButton" href={whatsappHref} target="_blank" rel="noreferrer">
            Hablar por WhatsApp
          </a>
        </section>

        <section className="contactSection sectionShell">
          <div className="contactCopy reveal">
            <h2>Hablemos de tu seguro.</h2>
            <p>
              Contacto directo con Sulay Muñoz Paz para resolver dudas y revisar alternativas.
            </p>
          </div>
          <div className="contactCards">
            <a className="reveal" data-delay="0" href={whatsappHref} target="_blank" rel="noreferrer">
              <span>WhatsApp</span>
              <strong>+{whatsappNumber}</strong>
            </a>
            <a className="reveal" data-delay="100" href="mailto:sulay.munoz@bigorangeseguros.com">
              <span>Correo</span>
              <strong>sulay.munoz@bigorangeseguros.com</strong>
            </a>
            <div className="reveal" data-delay="200">
              <span>Ubicacion</span>
              <strong>Cali, Valle del Cauca</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Logo />
        <a
          className="footerCredit"
          href="https://verticaltech.ai"
          target="_blank"
          rel="noreferrer"
        >
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
