"use client";

import { useState, type FormEvent } from "react";

const WA_NUMBER = "573167650809";

type Tab = "auto" | "vida" | "viaje";

interface AutoData {
  cedula: string;
  nombre: string;
  placa: string;
  fechaNac: string;
  zona: string;
  telefono: string;
  habeas: boolean;
}

interface VidaData {
  cedula: string;
  nombre: string;
  fechaNac: string;
  telefono: string;
  presupuesto: string;
  habeas: boolean;
}

interface ViajeData {
  nombre: string;
  telefono: string;
  edadViaje: string;
  salida: string;
  regreso: string;
  origen: string;
  destino: string;
  habeas: boolean;
}

const ZONES = [
  "Zona Urbana",
  "Zona Rural",
  "Urbana y Rural",
  "Zona de Alto Riesgo",
];

const BUDGETS = [
  "Menos de $50.000/mes",
  "$50.000 – $100.000/mes",
  "$100.000 – $200.000/mes",
  "Más de $200.000/mes",
];

const DESTINOS = [
  { value: "Asia, África y Oceanía", label: "Asia, África y Oceanía" },
  { value: "Colombia", label: "Colombia" },
  { value: "España (visado de estudio)", label: "España — solo para visados de estudio" },
  { value: "Europa", label: "Europa" },
  { value: "México, Caribe y Centro América", label: "México, Caribe y Centro América" },
  { value: "Múltiples destinos", label: "Múltiples destinos" },
  { value: "Norteamérica", label: "Norteamérica (EE.UU. y Canadá)" },
  { value: "Polonia (copago US$200)", label: "Polonia — copago US$200" },
  { value: "Suramérica", label: "Suramérica" },
];

const PAISES = [
  "Colombia",
  "— América del Sur —",
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Ecuador",
  "Paraguay",
  "Perú",
  "Uruguay",
  "Venezuela",
  "— América Central y Caribe —",
  "Costa Rica",
  "Cuba",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "República Dominicana",
  "— América del Norte —",
  "Canadá",
  "Estados Unidos",
  "— Europa —",
  "Alemania",
  "España",
  "Francia",
  "Italia",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "— Asia —",
  "China",
  "Corea del Sur",
  "India",
  "Japón",
  "Tailandia",
  "— África y Oceanía —",
  "Australia",
  "Sudáfrica",
];

const emptyAuto: AutoData = {
  cedula: "",
  nombre: "",
  placa: "",
  fechaNac: "",
  zona: "",
  telefono: "",
  habeas: false,
};

const emptyVida: VidaData = {
  cedula: "",
  nombre: "",
  fechaNac: "",
  telefono: "",
  presupuesto: "",
  habeas: false,
};

const emptyViaje: ViajeData = {
  nombre: "",
  telefono: "",
  edadViaje: "",
  salida: "",
  regreso: "",
  origen: "Colombia",
  destino: "",
  habeas: false,
};

const HABEAS_TEXT = (
  <span>
    Autorizo el tratamiento de mis datos personales conforme a la{" "}
    <strong>Ley 1581 de 2012 (Habeas Data)</strong> y la política de privacidad
    de BigOrange.
  </span>
);

export default function QuoteForm() {
  const [tab, setTab] = useState<Tab>("auto");
  const [auto, setAuto] = useState<AutoData>(emptyAuto);
  const [vida, setVida] = useState<VidaData>(emptyVida);
  const [viaje, setViaje] = useState<ViajeData>(emptyViaje);
  const [sent, setSent] = useState(false);

  function flash() {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  function switchTab(t: Tab) {
    setTab(t);
    setSent(false);
  }

  function handleAutoSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = [
      "Hola Sulay, quiero cotizar mi *seguro de auto*:",
      `• Cédula: ${auto.cedula}`,
      `• Nombre: ${auto.nombre}`,
      `• Placa: ${auto.placa.toUpperCase()}`,
      `• Fecha de nacimiento: ${auto.fechaNac}`,
      `• Zona de circulación: ${auto.zona}`,
      `• Teléfono: ${auto.telefono}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noreferrer");
    flash();
  }

  function handleVidaSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = [
      "Hola Sulay, quiero cotizar un *seguro de vida*:",
      `• Cédula: ${vida.cedula}`,
      `• Nombre: ${vida.nombre}`,
      `• Fecha de nacimiento: ${vida.fechaNac}`,
      `• Teléfono: ${vida.telefono}`,
      `• Presupuesto mensual: ${vida.presupuesto}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noreferrer");
    flash();
  }

  function handleViajeSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = [
      "Hola Sulay, quiero cotizar una *asistencia en viajes*:",
      `• Nombre: ${viaje.nombre}`,
      `• Teléfono: ${viaje.telefono}`,
      `• Edad al día del viaje: ${viaje.edadViaje} años`,
      `• Fecha de salida: ${viaje.salida}`,
      `• Fecha de regreso: ${viaje.regreso}`,
      `• País de origen: ${viaje.origen}`,
      `• Destino: ${viaje.destino}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noreferrer");
    flash();
  }

  const submitLabel = sent ? "¡Listo! Revisa WhatsApp →" : "Enviar cotización por WhatsApp →";

  return (
    <section className="quoteSection sectionShell" id="cotizar">
      <div className="quoteIntro reveal">
        <p className="eyebrow">Cotización rápida</p>
        <h2 className="quoteTitle">Tu cotización en menos de 2 minutos.</h2>
        <p className="quoteSubtitle">
          Llena los datos, te llega directo a WhatsApp y Sulay te responde con
          opciones reales — sin llamadas en frío ni formularios interminables.
        </p>
      </div>

      <div className="quoteCard reveal" data-delay="120">
        <div className="quoteTabs quoteTabs3" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "auto"}
            className={tab === "auto" ? "quoteTab quoteTabActive" : "quoteTab"}
            onClick={() => switchTab("auto")}
          >
            🚗 Seguro de Auto
          </button>
          <button
            role="tab"
            aria-selected={tab === "vida"}
            className={tab === "vida" ? "quoteTab quoteTabActive" : "quoteTab"}
            onClick={() => switchTab("vida")}
          >
            🛡️ Seguro de Vida
          </button>
          <button
            role="tab"
            aria-selected={tab === "viaje"}
            className={tab === "viaje" ? "quoteTab quoteTabActive" : "quoteTab"}
            onClick={() => switchTab("viaje")}
          >
            ✈️ Asistencia Viajes
          </button>
        </div>

        {tab === "auto" && (
          <form className="quoteForm" onSubmit={handleAutoSubmit}>
            <div className="quoteGrid">
              <div className="quoteField">
                <label htmlFor="auto-cedula">Cédula</label>
                <input
                  id="auto-cedula"
                  type="text"
                  inputMode="numeric"
                  placeholder="Número de cédula"
                  required
                  value={auto.cedula}
                  onChange={(e) => setAuto({ ...auto, cedula: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="auto-nombre">Nombre completo</label>
                <input
                  id="auto-nombre"
                  type="text"
                  placeholder="Como aparece en tu CC"
                  required
                  value={auto.nombre}
                  onChange={(e) => setAuto({ ...auto, nombre: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="auto-placa">Placa del vehículo</label>
                <input
                  id="auto-placa"
                  type="text"
                  placeholder="ABC123"
                  maxLength={6}
                  required
                  value={auto.placa}
                  onChange={(e) => setAuto({ ...auto, placa: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="auto-fecha">Fecha de nacimiento</label>
                <input
                  id="auto-fecha"
                  type="date"
                  required
                  value={auto.fechaNac}
                  onChange={(e) => setAuto({ ...auto, fechaNac: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="auto-zona">Zona de circulación</label>
                <select
                  id="auto-zona"
                  required
                  value={auto.zona}
                  onChange={(e) => setAuto({ ...auto, zona: e.target.value })}
                >
                  <option value="">Selecciona una zona</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <div className="quoteField">
                <label htmlFor="auto-tel">Teléfono</label>
                <input
                  id="auto-tel"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Cel o fijo"
                  required
                  value={auto.telefono}
                  onChange={(e) => setAuto({ ...auto, telefono: e.target.value })}
                />
              </div>
            </div>
            <label className="habeasLabel">
              <input
                type="checkbox"
                required
                checked={auto.habeas}
                onChange={(e) => setAuto({ ...auto, habeas: e.target.checked })}
              />
              {HABEAS_TEXT}
            </label>
            <button type="submit" className="quoteSubmit" disabled={sent}>
              {submitLabel}
            </button>
          </form>
        )}

        {tab === "vida" && (
          <form className="quoteForm" onSubmit={handleVidaSubmit}>
            <div className="quoteGrid">
              <div className="quoteField">
                <label htmlFor="vida-cedula">Cédula</label>
                <input
                  id="vida-cedula"
                  type="text"
                  inputMode="numeric"
                  placeholder="Número de cédula"
                  required
                  value={vida.cedula}
                  onChange={(e) => setVida({ ...vida, cedula: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="vida-nombre">Nombre completo</label>
                <input
                  id="vida-nombre"
                  type="text"
                  placeholder="Como aparece en tu CC"
                  required
                  value={vida.nombre}
                  onChange={(e) => setVida({ ...vida, nombre: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="vida-fecha">Fecha de nacimiento</label>
                <input
                  id="vida-fecha"
                  type="date"
                  required
                  value={vida.fechaNac}
                  onChange={(e) => setVida({ ...vida, fechaNac: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="vida-tel">Teléfono</label>
                <input
                  id="vida-tel"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Cel o fijo"
                  required
                  value={vida.telefono}
                  onChange={(e) => setVida({ ...vida, telefono: e.target.value })}
                />
              </div>
              <div className="quoteField quoteFieldFull">
                <label htmlFor="vida-presupuesto">Presupuesto mensual</label>
                <select
                  id="vida-presupuesto"
                  required
                  value={vida.presupuesto}
                  onChange={(e) => setVida({ ...vida, presupuesto: e.target.value })}
                >
                  <option value="">¿Cuánto puedes invertir?</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="habeasLabel">
              <input
                type="checkbox"
                required
                checked={vida.habeas}
                onChange={(e) => setVida({ ...vida, habeas: e.target.checked })}
              />
              {HABEAS_TEXT}
            </label>
            <button type="submit" className="quoteSubmit" disabled={sent}>
              {submitLabel}
            </button>
          </form>
        )}

        {tab === "viaje" && (
          <form className="quoteForm" onSubmit={handleViajeSubmit}>
            <div className="quoteGrid">
              <div className="quoteField">
                <label htmlFor="viaje-nombre">Nombre completo</label>
                <input
                  id="viaje-nombre"
                  type="text"
                  placeholder="Nombre del viajero"
                  required
                  value={viaje.nombre}
                  onChange={(e) => setViaje({ ...viaje, nombre: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="viaje-tel">Teléfono</label>
                <input
                  id="viaje-tel"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Cel o fijo"
                  required
                  value={viaje.telefono}
                  onChange={(e) => setViaje({ ...viaje, telefono: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="viaje-edad">Edad al día del viaje</label>
                <input
                  id="viaje-edad"
                  type="number"
                  inputMode="numeric"
                  placeholder="Ej. 35"
                  min={0}
                  max={120}
                  required
                  value={viaje.edadViaje}
                  onChange={(e) => setViaje({ ...viaje, edadViaje: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="viaje-origen">País de origen</label>
                <select
                  id="viaje-origen"
                  required
                  value={viaje.origen}
                  onChange={(e) => setViaje({ ...viaje, origen: e.target.value })}
                >
                  {PAISES.map((p) =>
                    p.startsWith("—") ? (
                      <option key={p} disabled value="">
                        {p}
                      </option>
                    ) : (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="quoteField">
                <label htmlFor="viaje-salida">Fecha de salida</label>
                <input
                  id="viaje-salida"
                  type="date"
                  required
                  value={viaje.salida}
                  onChange={(e) => setViaje({ ...viaje, salida: e.target.value })}
                />
              </div>
              <div className="quoteField">
                <label htmlFor="viaje-regreso">Fecha de regreso</label>
                <input
                  id="viaje-regreso"
                  type="date"
                  required
                  min={viaje.salida || undefined}
                  value={viaje.regreso}
                  onChange={(e) => setViaje({ ...viaje, regreso: e.target.value })}
                />
              </div>
              <div className="quoteField quoteFieldFull">
                <label htmlFor="viaje-destino">Destino del viaje</label>
                <select
                  id="viaje-destino"
                  required
                  value={viaje.destino}
                  onChange={(e) => setViaje({ ...viaje, destino: e.target.value })}
                >
                  <option value="">Selecciona tu destino</option>
                  {DESTINOS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {(viaje.destino === "España (visado de estudio)") && (
                  <p className="quoteFieldNote">
                    Esta cobertura aplica exclusivamente para viajes con visado de estudio.
                  </p>
                )}
                {(viaje.destino === "Polonia (copago US$200)") && (
                  <p className="quoteFieldNote quoteFieldNoteWarn">
                    Este destino tiene un copago de <strong>US$200</strong> en caso de siniestro.
                  </p>
                )}
              </div>
            </div>
            <label className="habeasLabel">
              <input
                type="checkbox"
                required
                checked={viaje.habeas}
                onChange={(e) => setViaje({ ...viaje, habeas: e.target.checked })}
              />
              {HABEAS_TEXT}
            </label>
            <button type="submit" className="quoteSubmit" disabled={sent}>
              {submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
