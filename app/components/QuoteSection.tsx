"use client";

import { useState, type FormEvent } from "react";
import Script from "next/script";

const WA_NUMBER = "573167650809";
const TENANT_KEY = "69932";
const API_BASE = "https://embeddedapi.segurosmedicosinternacionales.com.co";
const WIDGET_ID = `smilego-widget-${TENANT_KEY}`;

const PRODUCT_OPTIONS = [
  "Seguro de vida",
  "Salud nacional o internacional",
  "Hogar",
  "Automoviles / SOAT",
  "Accidentes personales",
  "Poliza empresarial",
  "Transporte de mercancias",
  "Cumplimiento",
  "Todo riesgo empresarial",
  "Responsabilidad civil",
  "RC profesional medica",
  "RC para clinicas y hospitales",
  "No estoy seguro, necesito asesoria",
];

const CLIENT_TYPES = [
  "Persona natural",
  "Empresa",
  "Profesional independiente",
  "Institucion de salud",
  "Propietario / arrendador",
];

const URGENCY_OPTIONS = [
  "Estoy comparando opciones",
  "La necesito este mes",
  "Necesito renovar una poliza",
  "Tengo una exigencia contractual",
];

interface QuoteData {
  name: string;
  phone: string;
  clientType: string;
  product: string;
  urgency: string;
  detail: string;
  habeas: boolean;
}

const emptyQuote: QuoteData = {
  name: "",
  phone: "",
  clientType: "",
  product: "",
  urgency: "",
  detail: "",
  habeas: false,
};

type QuoteTab = "smilego" | "general";

const TAB_SUBTITLE: Record<QuoteTab, string> = {
  smilego:
    "Compara alternativas y recibe una orientación coherente con tu riesgo, presupuesto y momento de compra.",
  general:
    "Sulay revisa tu caso, compara alternativas y te orienta hacia una poliza coherente con tu riesgo, presupuesto y momento de compra.",
};

export default function QuoteSection() {
  const [tab, setTab] = useState<QuoteTab>("smilego");

  return (
    <section className="quoteSection sectionShell" id="cotizar">
      <div className="quoteIntro reveal">
        <p className="eyebrow">Cotización y asesoría</p>
        <h2 className="quoteTitle">Cuéntanos qué necesitas proteger.</h2>
        <p className="quoteSubtitle">{TAB_SUBTITLE[tab]}</p>
        <div className="quoteAssurance">
          <span>Sin costo inicial</span>
          <span>Atención directa</span>
          <span>Opciones comparadas</span>
        </div>
      </div>

      <div className="quoteCard reveal" data-delay="120">
        <div className="quoteTabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "smilego"}
            onClick={() => setTab("smilego")}
          >
            Vida y salud internacional
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "general"}
            onClick={() => setTab("general")}
          >
            Otros seguros
          </button>
        </div>

        <div className="quoteWidget" hidden={tab !== "smilego"}>
          <div id={WIDGET_ID} />
          <Script
            src="https://smilego.segurosmedicosinternacionales.com/smilego-widget.js"
            data-tenant-key={TENANT_KEY}
            data-api-base={API_BASE}
            data-target={`#${WIDGET_ID}`}
            data-button-placement="INLINE_TARGET"
            strategy="afterInteractive"
          />
        </div>

        <GeneralQuoteForm hidden={tab !== "general"} />
      </div>
    </section>
  );
}

function GeneralQuoteForm({ hidden }: { hidden: boolean }) {
  const [quote, setQuote] = useState<QuoteData>(emptyQuote);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const msg = [
      "Hola Sulay, quiero recibir asesoria para una poliza:",
      `- Nombre: ${quote.name}`,
      `- Telefono: ${quote.phone}`,
      `- Tipo de cliente: ${quote.clientType}`,
      `- Poliza de interes: ${quote.product}`,
      `- Momento de compra: ${quote.urgency}`,
      quote.detail ? `- Contexto: ${quote.detail}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const submitLabel = sent ? "Mensaje preparado en WhatsApp" : "Solicitar asesoria por WhatsApp";

  return (
    <form className="quoteForm" hidden={hidden} onSubmit={handleSubmit}>
      <div className="quoteGrid">
        <div className="quoteField">
          <label htmlFor="quote-name">Nombre completo</label>
          <input
            id="quote-name"
            type="text"
            placeholder="Tu nombre"
            required
            value={quote.name}
            onChange={(e) => setQuote({ ...quote, name: e.target.value })}
          />
        </div>
        <div className="quoteField">
          <label htmlFor="quote-phone">Teléfono</label>
          <input
            id="quote-phone"
            type="tel"
            inputMode="numeric"
            placeholder="Celular o fijo"
            required
            value={quote.phone}
            onChange={(e) => setQuote({ ...quote, phone: e.target.value })}
          />
        </div>
        <div className="quoteField">
          <label htmlFor="quote-client">Tipo de cliente</label>
          <select
            id="quote-client"
            required
            value={quote.clientType}
            onChange={(e) => setQuote({ ...quote, clientType: e.target.value })}
          >
            <option value="">Selecciona una opción</option>
            {CLIENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="quoteField">
          <label htmlFor="quote-product">Póliza de interés</label>
          <select
            id="quote-product"
            required
            value={quote.product}
            onChange={(e) => setQuote({ ...quote, product: e.target.value })}
          >
            <option value="">Selecciona una póliza</option>
            {PRODUCT_OPTIONS.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="quoteField quoteFieldFull">
          <label htmlFor="quote-urgency">Momento de compra</label>
          <select
            id="quote-urgency"
            required
            value={quote.urgency}
            onChange={(e) => setQuote({ ...quote, urgency: e.target.value })}
          >
            <option value="">Selecciona una opción</option>
            {URGENCY_OPTIONS.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
          </select>
        </div>
        <div className="quoteField quoteFieldFull">
          <label htmlFor="quote-detail">Contexto opcional</label>
          <textarea
            id="quote-detail"
            placeholder="Ej. Tengo una empresa de transporte, necesito una póliza para contrato, quiero proteger a mi familia..."
            value={quote.detail}
            onChange={(e) => setQuote({ ...quote, detail: e.target.value })}
          />
        </div>
      </div>

      <label className="habeasLabel">
        <input
          type="checkbox"
          required
          checked={quote.habeas}
          onChange={(e) => setQuote({ ...quote, habeas: e.target.checked })}
        />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <strong>Ley 1581 de 2012 (Habeas Data)</strong> y la política de
          privacidad de BigOrange.
        </span>
      </label>

      <button type="submit" className="quoteSubmit" disabled={sent}>
        {submitLabel}
      </button>
    </form>
  );
}
