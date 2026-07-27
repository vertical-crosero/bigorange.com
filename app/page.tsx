import Image from "next/image";
import QuoteForm from "./components/QuoteForm";
import ServiceCards from "./components/ServiceCards";

const whatsappNumber = "573167650809";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hola Sulay, quisiera informacion sobre seguros."
)}`;

const delays = [0, 120, 240];

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="BigOrange inicio">
      <span className="logoMark" aria-hidden="true" />
      <span>
        Big<span>Orange</span>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="siteHeader">
        <nav className="navShell" aria-label="Principal">
          <Logo />
          <div className="navLinks">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#cotizar">Cotizar</a>
            <a href="#contacto">Contacto</a>
          </div>
          <a className="navCta" href={whatsappHref} target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </nav>
      </header>

      <main>
        <section className="hero sectionShell" id="inicio">
          <div className="heroOrb heroOrbAnim" aria-hidden="true" />
          <div className="heroCopy">
            <div className="heroBadge heroAnim" style={{ animationDelay: "0ms" }}>
              <span />
              20 años asesorando con confianza
            </div>
            <h1 className="heroAnim" style={{ animationDelay: "180ms" }}>
              Seguros pensados para proteger lo que más te importa.
            </h1>
            <p className="heroSlogan heroAnim" style={{ animationDelay: "320ms" }}>
              Protección real. Trato humano.
            </p>
            <p className="heroText heroAnim" style={{ animationDelay: "450ms" }}>
              Asesoría integral en seguros para personas y empresas, con el respaldo de
              Sulay Muñoz Paz y más de dos décadas de experiencia en el sector.
            </p>
            <div className="heroActions heroAnim" style={{ animationDelay: "600ms" }}>
              <a className="primaryButton" href="#cotizar">
                Cotiza en 2 minutos
              </a>
              <a className="secondaryButton" href="#servicios">
                Ver servicios →
              </a>
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

        <section className="founder sectionShell" id="fundadora">
          <div className="founderAvatar reveal">
            <Image
              src="/img/Subject.png"
              alt="Sulay Muñoz Paz"
              width={773}
              height={1138}
              sizes="96px"
            />
          </div>
          <div className="reveal" data-delay="100">
            <p className="eyebrow">La fundadora</p>
            <blockquote>
              "Fundé BigOrange para que asesorarse en seguros se sienta cercano, claro y
              honesto, sin letra pequeña ni promesas vacías."
            </blockquote>
            <h2>Sulay Mariam Muñoz Paz</h2>
            <p className="founderText">
              Especialista en seguros de automóviles y responsabilidad civil, con más de
              20 años acompañando a familias y empresas a proteger lo que construyen.
            </p>
            <div className="stats">
              <div>
                <strong>20+</strong>
                <span>años de experiencia</span>
              </div>
              <div>
                <strong>17</strong>
                <span>líneas de seguros</span>
              </div>
              <div>
                <strong>2</strong>
                <span>especialidades: autos y RC</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sectionShell sectionBlock" id="servicios">
          <div className="sectionIntro centered reveal">
            <p className="eyebrow">Portafolio</p>
            <h2>Un seguro para cada etapa de tu vida</h2>
            <p>
              17 productos organizados en tres frentes de protección, para personas,
              empresas y responsabilidad civil.
            </p>
          </div>

          <ServiceCards />
        </section>

        <section className="testimonials sectionShell" aria-label="Clientes">
          <div className="sectionIntro centered reveal">
            <p className="eyebrow">Clientes</p>
            <h2>Lo que dicen quienes confían en nosotros</h2>
          </div>
          <div className="testimonialGrid">
            {[1, 2, 3].map((item, i) => (
              <article className="testimonial reveal" data-delay={delays[i]} key={item}>
                <p>"Testimonio de cliente — reemplaza con una reseña real."</p>
                <div>
                  <span className="avatarDot" />
                  <span>
                    <strong>Nombre del cliente</strong>
                    <small>Seguro contratado</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <QuoteForm />

        <section className="adviceBand reveal" id="contacto">
          <div>
            <h2>¿Listo para proteger lo que más te importa?</h2>
            <p>
              Escríbele directamente a Sulay y recibe asesoría personalizada, sin costo.
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
