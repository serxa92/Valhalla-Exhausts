# Valhalla Exhausts — Landing Page

## Problem Statement (original, ES)
> Construyeme una landing de Valhalla Exhausts, te paso el logo, estética vikinga, es un chico que hace escapes artesanales para coches, a ver que puedes hacer :)

## User choices (recogido en `ask_human`)
- Secciones: Hero + Sobre el artesano + Galería + Proceso artesanal + Testimonios + Contacto
- Contacto: **sólo botones** (WhatsApp / Instagram / Email), sin formulario ni backend
- Idioma: Español
- Estética: Muy oscuro + acentos plateados / acero frío (nada de naranja/fuego)
- Dirección real facilitada: **Rúa Macal, 11 · 36213 Vigo, Pontevedra**
- Fotos reales del taller facilitadas (3 imágenes con logo en pared, artesano soldando, cascos + escape doble pulido)

## User personas
- **Entusiasta del motor gallego (Vigo y alrededores)** que busca sonido + presencia y valora trabajo artesanal
- **Cliente recomendado** (vía Instagram / WhatsApp) que llega a la web a verificar calidad antes de contactar
- **Preparadores / tuners** que quieren una línea completa a medida

## Architecture
- **Frontend único** (React + Tailwind) — landing estática en una sola página con scroll por anclas.
- **Backend intacto** (template FastAPI + Mongo sin cambios). No se usa porque el contacto es directo vía deep-links (wa.me, mailto, instagram.com/…). Nada de formularios, nada de tracking de leads.
- Fuentes: Cormorant Garamond (display, títulos) + Manrope (body). Cargadas vía Google Fonts en `index.html`.
- Iconos: `lucide-react`.
- Animaciones: IntersectionObserver para reveal on scroll (CSS puro, sin librerías extra). Marquee rúnico con keyframes.

## What's been implemented (2025-12)
- [x] Header sticky con logo, nav y CTA WhatsApp + menú mobile.
- [x] Hero fullscreen con foto real del taller + logo + H1 display + 2 CTAs + stat strip (escapes forjados, hecho a mano, TIG, Vigo).
- [x] Marquee rúnico (runas Futhark + claims: FORGED IN VIGO / STAINLESS STEEL / TIG WELDED).
- [x] Sección Artesano: foto real (artesano soldando bajo coche) + copy en ES + firma.
- [x] Proceso artesanal 5 pasos: Diseño → Corte → Soldadura TIG → Pulido → Instalación, cards con iconos + numerales plata.
- [x] Galería Bento Grid: 3 fotos reales del taller + 3 fotos de stock desaturadas (BMW 350Z / salidas cromadas / detalles).
- [x] Testimonios (3 glassmorphism cards, BMW M3 E46 / Nissan 350Z / Audi S3 8P).
- [x] Contacto: 3 botones grandes (WhatsApp, Instagram, Email) + bloque de dirección con link a Google Maps.
- [x] Footer con logo, accesos directos y copyright.
- [x] `data-testid` en todos los elementos interactivos.
- [x] Todas las imágenes con filtro grayscale / steel.

## Config / placeholders a editar
Todo centralizado en la constante `BRAND` en `/app/frontend/src/App.js`:
- `whatsapp.href` y `whatsapp.display` → **placeholder `+34 600 000 000`**, sustituir por número real.
- `instagram.handle` y `instagram.href` → placeholder `@valhalla.exhausts`.
- `email.display` y `email.href` → placeholder `info@valhallaexhausts.com`.
- `artisan` → placeholder "Artesano soldador · forjando en Vigo" (sustituir por nombre real).

## Prioritized backlog
- **P1** — Reemplazar placeholders de contacto por los datos reales del artesano (WhatsApp, IG, email, nombre).
- **P1** — Añadir más fotos reales cuando el cliente las facilite (ahora hay 3 reales + 3 de stock).
- **P2** — Embeder mapa de Google (iframe) debajo del bloque de dirección.
- **P2** — Meter un formulario simple "Pide presupuesto" con datos del coche si el cliente cambia de opinión (se guardaría en MongoDB y mandaría email).
- **P2** — Sustituir testimonios placeholder por reviews reales (capturas de IG o texto + coche real).
- **P3** — Multi-idioma ES/EN con toggle.
- **P3** — Sección "FAQ" (homologación, tiempos, garantía) y "Marcas/coches con los que trabajo".
- **P3** — SEO: OpenGraph, favicon con el logo, sitemap.xml.
