# Cotización con pestañas: Smilego (vida y salud internacional) vs. otros seguros

## Contexto

La sección "Cotización y asesoría" (`#cotizar`) hoy renderiza únicamente el
widget embebido de Smilego (`app/components/SmilegoWidget.tsx`), un partner
que solo cubre seguros médicos y de vida internacional. BigOrange vende
además vida nacional, hogar, autos, seguros empresariales y RC, que no pasan
por Smilego. Mostrar solo el widget de Smilego en la sección genérica de
cotización sugiere, incorrectamente, que cubre todo el portafolio.

Adicionalmente, el proveedor confirmó que el botón del widget se renderiza
flotante por defecto; el atributo `data-button-placement="INLINE_TARGET"`
hace que se renderice dentro del `div` indicado en `data-target`, en vez de
flotar sobre el sitio.

## Objetivo

Separar visualmente ambos flujos de cotización dentro de la misma sección
`#cotizar`, mediante dos pestañas:

1. **"Vida y salud internacional"** (activa por defecto): widget de Smilego,
   embebido inline (no flotante).
2. **"Otros seguros"**: el formulario genérico que existía antes de integrar
   Smilego (envío por WhatsApp a Sulay, con selector de tipo de póliza,
   tipo de cliente y urgencia).

## Fuera de alcance

- No se agrega el widget de Smilego en `/servicios/personas` ni en ninguna
  otra ruta.
- No hay lógica de negocio nueva, analytics, ni parámetros de URL para
  seleccionar la pestaña inicial.
- No se modifica el backend ni las integraciones de WhatsApp.

## Diseño

### Componente `QuoteSection.tsx`

Reemplaza a `app/components/SmilegoWidget.tsx` (se elimina este archivo).
Mismo wrapper `<section className="quoteSection sectionShell" id="cotizar">`
y misma columna izquierda (`quoteIntro`) que existe hoy, con el copy ajustado
según la pestaña activa (ver "Copy dinámico" abajo).

Estado local: `const [tab, setTab] = useState<"smilego" | "general">("smilego")`.

Columna derecha (`quoteCard`):

```
<div className="quoteCard reveal" data-delay="120">
  <div className="quoteTabs" role="tablist">
    <button role="tab" aria-selected={tab === "smilego"} onClick={() => setTab("smilego")}>
      Vida y salud internacional
    </button>
    <button role="tab" aria-selected={tab === "general"} onClick={() => setTab("general")}>
      Otros seguros
    </button>
  </div>

  {tab === "smilego" ? <SmilegoPanel /> : <GeneralQuotePanel />}
</div>
```

`SmilegoPanel` y `GeneralQuotePanel` viven como sub-componentes en el mismo
archivo (son pequeños y solo se usan aquí; no ameritan archivos separados).

### `SmilegoPanel`

Igual al `SmilegoWidget` actual, con un único cambio: se agrega
`data-button-placement="INLINE_TARGET"` al `<Script>`. Mantiene su propio
`<div id={WIDGET_ID} />` y el `next/script` con `strategy="afterInteractive"`.

Nota de implementación: el script de Smilego monta contra un `id` fijo en el
DOM. Si el usuario cambia de pestaña y vuelve, React desmonta y re-monta el
`div` (el `<Script>` con `afterInteractive` no se re-ejecuta en montajes
subsecuentes porque Next.js cachea la carga del script por `src`). Para
evitar que el panel quede vacío al volver a la pestaña Smilego, `SmilegoPanel`
se mantiene siempre montado en el DOM (oculto con CSS `hidden`/`display:none`
en vez de un `return null` condicional), igual que `GeneralQuotePanel`. Ambas
pestañas existen siempre en el DOM; solo cambia cuál es visible.

### `GeneralQuotePanel`

Recupera el `QuoteForm` que existía antes de Smilego (git show
`5e2a47b:app/components/QuoteForm.tsx`): formulario controlado con nombre,
teléfono, tipo de cliente, tipo de póliza, urgencia y contexto opcional, que
arma un mensaje y abre WhatsApp (`wa.me`) con el número existente
(`573167650809`). Se integra como sub-componente sin el `<section>` propio
que tenía originalmente (ese wrapper ahora vive en `QuoteSection`).

### Copy dinámico (columna izquierda)

- Pestaña Smilego: mantiene el copy actual ("Cuéntanos qué necesitas
  proteger", con el subtítulo orientado a comparar alternativas).
- Pestaña "Otros seguros": copy original pre-Smilego ("Sulay revisa tu caso,
  compara alternativas...").

El eyebrow ("Cotización y asesoría") y las tres badges de confianza (`Sin
costo inicial`, `Atención directa`, `Opciones comparadas`) se mantienen fijos
en ambas pestañas.

### Estilos (`globals.css`)

- Se mantienen `.quoteCard`, `.quoteWidget`, `.quoteForm` tal cual existen.
- Se agrega `.quoteTabs`: fila de dos botones estilo underline (consistente
  con el resto del sitio, sin nuevas dependencias visuales), con estado
  `aria-selected` para el subrayado activo.
- Se agrega una regla `[hidden] { display: none; }` (o se usa el atributo
  HTML `hidden` nativo) para ocultar el panel inactivo sin desmontarlo.

### Archivos afectados

- **Nuevo**: `app/components/QuoteSection.tsx`
- **Eliminado**: `app/components/SmilegoWidget.tsx`
- **Modificado**: `app/page.tsx` (import `SmilegoWidget` → `QuoteSection`,
  `<SmilegoWidget />` → `<QuoteSection />`)
- **Modificado**: `app/globals.css` (agrega `.quoteTabs` y regla `[hidden]`)

## Testing

- `npx tsc --noEmit` sin errores.
- Verificación manual en navegador (`npm run dev`): cambiar entre pestañas
  sin perder el render del widget de Smilego; confirmar que el botón se
  muestra dentro del `div` (no flotante) una vez desplegado, dado que
  `data-button-placement="INLINE_TARGET"` solo se puede validar en un
  entorno con CORS habilitado (`bigorangeseguros.com`).
