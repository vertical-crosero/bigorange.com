# Quote Section Tabs (Smilego vs. General) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the "Cotización y asesoría" section (`#cotizar`) into two tabs — "Vida y salud internacional" (Smilego widget, embedded inline instead of floating) and "Otros seguros" (the pre-Smilego WhatsApp quote form) — so the Smilego partner widget stops implying it covers BigOrange's whole insurance portfolio.

**Architecture:** Replace `app/components/SmilegoWidget.tsx` with `app/components/QuoteSection.tsx`, a single client component owning tab state (`useState<"smilego" | "general">`). Both panels render permanently in the DOM and are toggled with the native `hidden` attribute (not conditional rendering), because Next.js dedupes `<Script strategy="afterInteractive">` injection by `src` — if the Smilego panel were unmounted and remounted on tab switch, the script would not re-fire and the widget would never re-render. The general quote form is restored verbatim from git history (commit `5e2a47b`, pre-Smilego) as a `GeneralQuoteForm` sub-component in the same file.

**Tech Stack:** Next.js 16 App Router, static export (`output: "export"`), React `useState`, `next/script`, plain CSS (`app/globals.css`, no CSS modules/Tailwind). No test runner is configured in this repo (`package.json` has no test script) — verification is `npx tsc --noEmit`, `npm run build`, `npm run lint`, and a manual `npm run dev` check in the browser.

**Spec:** `docs/superpowers/specs/2026-08-21-quote-section-tabs-design.md`

---

### Task 1: Create `QuoteSection.tsx` (not yet wired into the page)

**Files:**
- Create: `app/components/QuoteSection.tsx`

- [ ] **Step 1: Write the new component**

```tsx
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0. (The file is not imported anywhere yet, so this only validates the new file compiles on its own.)

- [ ] **Step 3: Commit**

```bash
git add app/components/QuoteSection.tsx
git commit -m "feat: add QuoteSection with Smilego and general quote tabs"
```

---

### Task 2: Add tab and hidden-panel styles to `globals.css`

**Files:**
- Modify: `app/globals.css` (append at end of file, after line 1211; also modify the mobile block at `app/globals.css:1149-1153`)

- [ ] **Step 1: Append new rules at the end of `app/globals.css`**

```css

.quoteTabs {
  display: flex;
  gap: 4px;
  padding: 22px 34px 0;
  border-bottom: 1px solid var(--line);
}

.quoteTabs button {
  padding: 0 2px 14px;
  border: none;
  background: none;
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.quoteTabs button[aria-selected="true"] {
  color: var(--ink);
  border-color: var(--orange);
}

.quoteTabs button:hover {
  color: var(--ink);
}

[hidden] {
  display: none;
}
```

This must be appended at the **end** of the file — `[hidden]` and `.quoteForm { display: flex }` (line 906) have equal CSS specificity (one class selector, one attribute selector), so whichever is declared later in the cascade wins. Appending last guarantees the hidden panel actually disappears instead of staying visible as a flex container.

- [ ] **Step 2: Add `.quoteTabs` to the mobile padding override**

Find this block at `app/globals.css:1149-1153`:

```css
  .advisorBand,
  .adviceBand,
  .quoteForm,
  .quoteWidget {
    padding: 28px 22px;
  }
```

Leave it untouched, and add a new dedicated rule directly after it in the same `@media (max-width: 780px)` block:

```css

  .quoteTabs {
    padding: 18px 22px 0;
  }
```

(A dedicated rule, not added to the list above, because the tabs need `0` bottom padding to keep the underline flush against the tab labels — the shared rule sets padding on all four sides.)

- [ ] **Step 3: Typecheck (no behavior change expected, just confirming nothing broke)**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: add tab and hidden-panel styles for quote section"
```

---

### Task 3: Wire `QuoteSection` into the page and remove `SmilegoWidget`

**Files:**
- Modify: `app/page.tsx:2` (import) and `app/page.tsx:168` (usage)
- Delete: `app/components/SmilegoWidget.tsx`

- [ ] **Step 1: Update the import in `app/page.tsx`**

Change:
```tsx
import SmilegoWidget from "./components/SmilegoWidget";
```
to:
```tsx
import QuoteSection from "./components/QuoteSection";
```

- [ ] **Step 2: Update the usage in `app/page.tsx`**

Change:
```tsx
        <SmilegoWidget />
```
to:
```tsx
        <QuoteSection />
```

- [ ] **Step 3: Delete the old component**

```bash
rm app/components/SmilegoWidget.tsx
```

This must happen in the same step as Steps 1–2 above (not a separate commit) — `page.tsx` cannot reference a deleted file, and the deleted file cannot be left dangling while still imported. Committing them together keeps `main` buildable at every commit.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds, `out/` directory produced, no errors about missing `SmilegoWidget` import.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git rm app/components/SmilegoWidget.tsx
git commit -m "feat: replace Smilego-only quote section with tabbed quote section"
```

---

### Task 4: Manual verification

**Files:** none (verification only, no code changes)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev` (note the port it picks, e.g. 3000 or 3001 if 3000 is busy)

- [ ] **Step 3: Visually check the tab switcher**

Open `http://localhost:<port>/#cotizar` in a browser and confirm:
- "Vida y salud internacional" tab is active by default and shows the Smilego widget's mount point (the widget itself may show a CORS error in the console when tested from `localhost` — that's expected and unrelated to this change; see the CORS whitelist history in project notes).
- Clicking "Otros seguros" shows the WhatsApp quote form (name, phone, tipo de cliente, póliza de interés, momento de compra, contexto, habeas data checkbox, submit button) and hides the Smilego panel.
- Clicking back to "Vida y salud internacional" shows the Smilego panel again instantly (no flash of a re-injected script, since it stayed mounted).
- Submitting the "Otros seguros" form with all required fields filled opens a `wa.me` link in a new tab with the expected message.

- [ ] **Step 4: Check responsive layout**

Resize the browser to a mobile width (< 780px) and confirm the tabs still sit with reasonable padding and don't overflow the card.

- [ ] **Step 5: Stop the dev server**

No commit for this task — it's verification only. If any visual issue is found, fix it in a follow-up step before considering the plan complete.
