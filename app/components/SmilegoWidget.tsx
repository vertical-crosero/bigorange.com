"use client";

import Script from "next/script";

const TENANT_KEY = "69932";
const API_BASE = "https://embeddedapi.segurosmedicosinternacionales.com.co";
const WIDGET_ID = `smilego-widget-${TENANT_KEY}`;
const BUTTON_PLACEMENT = 'INLINE_TARGET'

export default function SmilegoWidget() {
  return (
    <section className="quoteSection sectionShell" id="cotizar">
      <div className="quoteIntro reveal">
        <p className="eyebrow">Cotización y asesoría</p>
        <h2 className="quoteTitle">Cuéntanos qué necesitas proteger.</h2>
        <p className="quoteSubtitle">
          Compara alternativas y recibe una orientación coherente con tu
          riesgo, presupuesto y momento de compra.
        </p>
        <div className="quoteAssurance">
          <span>Sin costo inicial</span>
          <span>Atención directa</span>
          <span>Opciones comparadas</span>
        </div>
      </div>

      <div className="quoteCard quoteWidget reveal" data-delay="120">
        <div id={WIDGET_ID} />
        <Script
          src="https://smilego.segurosmedicosinternacionales.com/smilego-widget.js"
          data-tenant-key={TENANT_KEY}
          data-api-base={API_BASE}
          data-target={`#${WIDGET_ID}`}
          strategy="afterInteractive"
        />
      </div>
    </section>
  );
}
