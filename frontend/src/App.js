import { useEffect, useRef, useState } from "react";
import "@/App.css";
import {
  Instagram,
  Mail,
  MessageCircle,
  MapPin,
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Flame,
  Hammer,
  ShieldCheck,
  Sparkles,
  Wrench,
  Phone,
} from "lucide-react";

/* ---------------------------------------------------------
   BRAND CONFIG — edita aquí los datos reales del taller
--------------------------------------------------------- */
const BRAND = {
  name: "Valhalla Exhausts",
  tagline: "Escapes artesanales forjados como en el Valhalla",
  subtagline:
    "Diseño, soldadura TIG y acabados a medida. Cada línea, única como tu coche.",
  logo:
    "https://customer-assets.emergentagent.com/job_c9b8ec6f-9a41-4edb-b753-db8261ceacab/artifacts/qvgikphh_image.png",
  address: "Rúa Macal, 11 · 36213 Vigo, Pontevedra",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R%C3%BAa+Macal+11+36213+Vigo+Pontevedra",
  // Placeholders — reemplazar por los datos reales cuando el cliente los facilite
  whatsapp: {
    display: "+34 600 000 000",
    // international format, no + ni espacios
    href: "https://wa.me/34600000000?text=Hola%20Valhalla%20Exhausts%2C%20quiero%20pedir%20presupuesto%20para%20mi%20coche.",
  },
  instagram: {
    handle: "@valhalla.exhausts",
    href: "https://instagram.com/valhalla.exhausts",
  },
  email: {
    display: "info@valhallaexhausts.com",
    href: "mailto:info@valhallaexhausts.com",
  },
  artisan: "Artesano soldador · forjando en Vigo",
};

const SHOP = {
  front:
    "https://customer-assets.emergentagent.com/job_valhalla-exhausts/artifacts/g9o7uhds_image.png",
  welding:
    "https://customer-assets.emergentagent.com/job_valhalla-exhausts/artifacts/iv4ht20o_image.png",
  helmet:
    "https://customer-assets.emergentagent.com/job_valhalla-exhausts/artifacts/2w9afn1r_image.png",
};

/* ---------------------------------------------------------
   Hooks
--------------------------------------------------------- */
const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* ---------------------------------------------------------
   Header
--------------------------------------------------------- */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#artesano", label: "Artesano" },
    { href: "#proceso", label: "Proceso" },
    { href: "#galeria", label: "Galería" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-slate-800/70"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="header-logo-link"
          className="flex items-center gap-3 group"
        >
          <img
            src={BRAND.logo}
            alt="Valhalla Exhausts"
            className="h-11 w-11 object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg tracking-[0.22em] text-slate-100">
              VALHALLA
            </span>
            <span className="font-body text-[10px] tracking-[0.5em] text-slate-500">
              EXHAUSTS
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-[13px] tracking-[0.3em] uppercase text-slate-400 hover:text-white transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={BRAND.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="header-whatsapp-btn"
          className="hidden lg:inline-flex items-center gap-2 text-[12px] tracking-[0.3em] uppercase px-5 py-3 border border-slate-700 text-slate-200 hover:border-slate-300 hover:text-white transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          Presupuesto
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-slate-200 p-2"
          aria-label="Abrir menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-slate-800"
        >
          <div className="flex flex-col px-6 py-8 gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className="text-sm tracking-[0.3em] uppercase text-slate-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={BRAND.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-whatsapp-btn"
              className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase px-5 py-3 border border-slate-600 text-slate-100 self-start"
            >
              <MessageCircle className="w-4 h-4" />
              Presupuesto
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ---------------------------------------------------------
   Rune marquee divider
--------------------------------------------------------- */
const RuneMarquee = () => {
  const runes = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ";
  const line = `${runes}   ·   FORGED IN VIGO   ·   ${runes}   ·   STAINLESS STEEL   ·   ${runes}   ·   TIG WELDED   ·   `;
  return (
    <div
      data-testid="rune-marquee"
      className="relative border-y border-slate-800/80 bg-[#0a0c10] py-5 overflow-hidden"
    >
      <div className="flex whitespace-nowrap marquee-track text-slate-500 font-body text-[11px] tracking-[0.6em]">
        <span className="pr-12">{line}</span>
        <span className="pr-12">{line}</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0c10] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0c10] to-transparent" />
    </div>
  );
};

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden grain"
    >
      {/* Backdrop: real workshop shot + heavy black veil */}
      <div className="absolute inset-0">
        <img
          src={SHOP.front}
          alt=""
          className="w-full h-full object-cover steel-filter opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
      </div>

      {/* Frame */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center pt-32 pb-24">
          <div className="reveal">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-12 bg-slate-500" />
              <span className="rune-divider">ᚠᚱᚨᛗᛃᚨ · VIGO · GALICIA</span>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <img
              src={BRAND.logo}
              alt="Valhalla Exhausts"
              className="h-28 md:h-36 lg:h-44 w-auto mb-10 opacity-95"
              data-testid="hero-logo"
            />
          </div>

          <h1
            data-testid="hero-title"
            className="reveal font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight text-white max-w-5xl"
            style={{ transitionDelay: "220ms" }}
          >
            Escapes artesanales
            <br />
            <span className="italic text-slate-300">forjados</span> como en el{" "}
            <span className="text-slate-100">Valhalla.</span>
          </h1>

          <p
            className="reveal mt-10 max-w-xl text-slate-400 text-base md:text-lg leading-relaxed"
            style={{ transitionDelay: "320ms" }}
          >
            {BRAND.subtagline} Acero inoxidable cortado, doblado y soldado TIG a
            mano en Vigo. Sonido, rendimiento y presencia — una pieza única para
            cada guerrero.
          </p>

          <div
            className="reveal mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ transitionDelay: "420ms" }}
          >
            <a
              href={BRAND.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="pulse-ring inline-flex items-center gap-3 bg-slate-100 text-black px-8 py-5 text-sm tracking-[0.3em] uppercase font-medium hover:bg-white hover:gap-5 transition-all duration-500 group"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Pedir presupuesto
              <ArrowRight
                className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform"
                strokeWidth={2}
              />
            </a>

            <a
              href="#galeria"
              data-testid="hero-gallery-cta"
              className="inline-flex items-center gap-3 text-slate-300 text-sm tracking-[0.3em] uppercase px-8 py-5 border border-slate-700 hover:border-slate-300 hover:text-white transition-all duration-300"
            >
              Ver trabajos
              <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          {/* Stat strip */}
          <div
            className="reveal mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 max-w-3xl"
            style={{ transitionDelay: "520ms" }}
          >
            {[
              { k: "+200", v: "Escapes forjados" },
              { k: "100%", v: "Hecho a mano" },
              { k: "TIG", v: "Soldadura premium" },
              { k: "Vigo", v: "Taller propio" },
            ].map((s) => (
              <div key={s.v} className="border-l border-slate-800 pl-5">
                <div className="numeral text-3xl md:text-4xl">{s.k}</div>
                <div className="mt-2 text-[11px] tracking-[0.3em] uppercase text-slate-500">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex items-center gap-3 text-slate-500 pb-10">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
          <span className="text-[10px] tracking-[0.5em] uppercase">
            Desliza
          </span>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   Artisan
--------------------------------------------------------- */
const Artisan = () => (
  <section
    id="artesano"
    data-testid="artisan-section"
    className="relative py-28 md:py-36 lg:py-44 bg-[#050505] grain"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-6 reveal">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={SHOP.welding}
            alt="El artesano soldando un escape bajo un coche"
            className="absolute inset-0 w-full h-full object-cover steel-filter"
            data-testid="artisan-image"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-slate-800" />
          <div className="absolute bottom-5 left-5 right-5 flex justify-between text-[10px] tracking-[0.4em] uppercase text-slate-400">
            <span>Taller · Vigo</span>
            <span>Nº 001</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 reveal" style={{ transitionDelay: "120ms" }}>
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-slate-500" />
          <span className="rune-divider">01 · EL ARTESANO</span>
        </div>

        <h2
          data-testid="artisan-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-white"
        >
          Fuego, acero y
          <br />
          <span className="italic text-slate-300">mano firme.</span>
        </h2>

        <div className="mt-10 space-y-6 text-slate-400 leading-relaxed max-w-xl">
          <p>
            En Valhalla Exhausts cada escape nace de la misma obsesión: sonido
            profundo, acabado impecable y una línea pensada milímetro a
            milímetro para tu coche. Nada de catálogo, nada de serie.
          </p>
          <p className="text-slate-500">
            Soldadura TIG en acero inoxidable, colectores hechos a medida,
            dobleces limpios y salidas a tu estilo. Años de experiencia bajo
            coches aprendiendo que un buen escape se siente antes de verlo.
          </p>
        </div>

        {/* Signature block */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center gap-6">
          <div>
            <div className="font-display text-2xl text-slate-100">
              — {BRAND.artisan.split("·")[0].trim()}
            </div>
            <div className="text-[11px] tracking-[0.4em] uppercase text-slate-500 mt-1">
              {BRAND.artisan.split("·")[1]?.trim() || "Vigo, Galicia"}
            </div>
          </div>
          <a
            href="#contacto"
            data-testid="artisan-contact-link"
            className="ml-auto inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-slate-300 hover:text-white border-b border-slate-700 hover:border-white pb-1 transition-colors"
          >
            Hablar con él
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   Process
--------------------------------------------------------- */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Diseño",
    desc: "Medimos el coche, hablamos sonido, estética y potencia. Bocetamos la línea perfecta.",
    icon: Sparkles,
  },
  {
    n: "02",
    title: "Corte",
    desc: "Tubo de acero inoxidable cortado con precisión. Cada pieza lista para la forja.",
    icon: Wrench,
  },
  {
    n: "03",
    title: "Soldadura TIG",
    desc: "Cordón continuo, limpio, resistente. El oficio se nota en cada punto.",
    icon: Flame,
  },
  {
    n: "04",
    title: "Pulido",
    desc: "Acabado espejo o cepillado. Salidas y detalles al gusto del propietario.",
    icon: Hammer,
  },
  {
    n: "05",
    title: "Instalación",
    desc: "Montaje en taller, ajuste fino y entrega. Sonido revisado antes de salir.",
    icon: ShieldCheck,
  },
];

const Process = () => (
  <section
    id="proceso"
    data-testid="process-section"
    className="relative py-28 md:py-36 lg:py-44 bg-[#080a0e] border-y border-slate-900"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
        <div className="reveal max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-slate-500" />
            <span className="rune-divider">02 · PROCESO</span>
          </div>
          <h2
            data-testid="process-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-white"
          >
            De la chapa al rugido.
            <br />
            <span className="italic text-slate-300">Cinco pasos.</span>
          </h2>
        </div>
        <p
          className="reveal text-slate-400 max-w-md leading-relaxed"
          style={{ transitionDelay: "120ms" }}
        >
          Un escape de verdad no se compra en una estantería. Se piensa, se
          dobla y se suelda hasta que queda exactamente como tiene que sonar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-900">
        {PROCESS_STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.n}
              data-testid={`process-step-${s.n}`}
              className="tracing-card reveal bg-[#0b0d11] p-8 lg:p-9 min-h-[280px] flex flex-col justify-between hover:bg-[#0f1218] transition-colors duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="numeral text-4xl">{s.n}</span>
                  <Icon
                    className="w-5 h-5 text-slate-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </div>
              <div className="mt-8 text-[10px] tracking-[0.4em] uppercase text-slate-600">
                Paso {s.n} / 05
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   Gallery
--------------------------------------------------------- */
const Gallery = () => {
  const tiles = [
    {
      src: SHOP.front,
      label: "Escape inox · Banco de pruebas",
      tall: true,
    },
    {
      src: SHOP.helmet,
      label: "Doble salida 76mm · Pulido",
    },
    {
      src: SHOP.welding,
      label: "Montaje bajo coche · TIG",
      wide: true,
    },
    {
      src: "https://images.pexels.com/photos/6025956/pexels-photo-6025956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
      label: "Salida doble cromada",
    },
    {
      src: "https://images.pexels.com/photos/12920297/pexels-photo-12920297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
      label: "Nissan 350Z · Línea completa",
      wide: true,
    },
    {
      src: "https://images.pexels.com/photos/10827691/pexels-photo-10827691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
      label: "Twin chrome · Detalle",
      tall: true,
    },
  ];

  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="relative py-28 md:py-36 lg:py-44 bg-[#050505] grain"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-slate-500" />
              <span className="rune-divider">03 · GALERÍA</span>
            </div>
            <h2
              data-testid="gallery-title"
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-white"
            >
              Trabajos del
              <br />
              <span className="italic text-slate-300">taller.</span>
            </h2>
          </div>
          <p
            className="reveal text-slate-400 max-w-sm leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Piezas reales forjadas en Vigo. Clicka la foto para abrir en grande
            — o escríbeme por WhatsApp y te enseño más.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[240px] gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <figure
              key={i}
              data-testid={`gallery-tile-${i}`}
              className={`reveal relative overflow-hidden group bg-[#0b0d11] ${
                t.tall ? "row-span-2" : ""
              } ${t.wide ? "col-span-2" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={t.src}
                alt={t.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover steel-filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <span className="text-[11px] tracking-[0.25em] uppercase text-slate-200">
                  {t.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  0{i + 1}
                </span>
              </figcaption>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
            </figure>
          ))}
        </div>

        <div className="mt-14 flex justify-center reveal">
          <a
            href={BRAND.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="gallery-instagram-link"
            className="inline-flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-slate-300 px-8 py-5 border border-slate-700 hover:border-slate-300 hover:text-white transition-all duration-300"
          >
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   Testimonials
--------------------------------------------------------- */
const TESTIMONIALS = [
  {
    quote:
      "Trabajo impecable. El sonido del M3 quedó exactamente como soñaba — grave, limpio y con carácter. Se nota el oficio en cada soldadura.",
    name: "Álvaro R.",
    car: "BMW M3 E46",
  },
  {
    quote:
      "Línea completa a medida para el 350Z. Se curró el diseño hasta el último milímetro y el acabado pulido es una barbaridad. Recomendado 100%.",
    name: "Dani S.",
    car: "Nissan 350Z",
  },
  {
    quote:
      "Pasé por varios talleres y ninguno entendía lo que quería. Aquí te escuchan, te asesoran y te entregan una pieza única. El coche suena a bestia.",
    name: "Marcos L.",
    car: "Audi S3 8P",
  },
];

const Testimonials = () => (
  <section
    id="testimonios"
    data-testid="testimonials-section"
    className="relative py-28 md:py-36 lg:py-44 bg-[#080a0e] border-y border-slate-900"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="reveal mb-16 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-slate-500" />
          <span className="rune-divider">04 · TESTIMONIOS</span>
        </div>
        <h2
          data-testid="testimonials-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-white"
        >
          La palabra de los
          <br />
          <span className="italic text-slate-300">que ya rugen.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            data-testid={`testimonial-${i}`}
            className="reveal relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] p-8 lg:p-10 flex flex-col"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="font-display text-6xl leading-none text-slate-600 select-none">
              “
            </span>
            <blockquote className="mt-4 text-slate-200 text-[15px] md:text-base leading-relaxed flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 pt-6 border-t border-white/5">
              <div className="font-display text-xl text-white">{t.name}</div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-slate-500 mt-1">
                {t.car}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   Contact
--------------------------------------------------------- */
const Contact = () => {
  const channels = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      sub: BRAND.whatsapp.display,
      href: BRAND.whatsapp.href,
      icon: MessageCircle,
      cta: "Abrir chat",
    },
    {
      id: "instagram",
      label: "Instagram",
      sub: BRAND.instagram.handle,
      href: BRAND.instagram.href,
      icon: Instagram,
      cta: "Ver perfil",
    },
    {
      id: "email",
      label: "Email",
      sub: BRAND.email.display,
      href: BRAND.email.href,
      icon: Mail,
      cta: "Enviar correo",
    },
  ];

  return (
    <section
      id="contacto"
      data-testid="contact-section"
      className="relative py-28 md:py-36 lg:py-44 bg-[#050505] grain overflow-hidden"
    >
      {/* Ornament ghost text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[18vw] leading-none tracking-tighter text-slate-100/[0.025] whitespace-nowrap select-none"
      >
        VALHALLA
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="reveal max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-slate-500" />
            <span className="rune-divider">05 · CONTACTO</span>
          </div>
          <h2
            data-testid="contact-title"
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-white"
          >
            Cuéntame tu coche.
            <br />
            <span className="italic text-slate-300">
              Yo me encargo del rugido.
            </span>
          </h2>
          <p className="mt-8 text-slate-400 leading-relaxed max-w-xl">
            Respuesta rápida por WhatsApp. También me encuentras en Instagram y
            en el taller de Vigo.
          </p>
        </div>

        {/* Channel grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-4 lg:gap-5">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`contact-${c.id}-btn`}
                className="reveal group relative bg-[#0b0d11] border border-slate-800 hover:border-slate-300 p-8 lg:p-10 min-h-[260px] flex flex-col justify-between transition-all duration-500"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="w-8 h-8 text-slate-300 group-hover:text-white transition-colors"
                    strokeWidth={1.4}
                  />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-slate-600">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div className="font-display text-4xl text-white">
                    {c.label}
                  </div>
                  <div className="mt-3 text-slate-400 text-sm break-words">
                    {c.sub}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-slate-300 group-hover:text-white">
                    {c.cta}
                    <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            );
          })}
        </div>

        {/* Location card */}
        <a
          href={BRAND.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-address-link"
          className="reveal mt-6 bg-[#0b0d11] border border-slate-800 hover:border-slate-400 p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 group transition-colors duration-500"
        >
          <div className="flex items-center gap-4">
            <MapPin
              className="w-7 h-7 text-slate-300 group-hover:text-white transition-colors"
              strokeWidth={1.4}
            />
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-slate-500">
                Taller
              </div>
              <div className="font-display text-2xl md:text-3xl text-white mt-1">
                {BRAND.address}
              </div>
            </div>
          </div>
          <div className="md:ml-auto inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-slate-300 group-hover:text-white">
            Abrir en Google Maps
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */
const Footer = () => (
  <footer
    data-testid="site-footer"
    className="bg-black border-t border-slate-900 py-14"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <img src={BRAND.logo} alt="" className="h-9 w-9 object-contain" />
        <div className="flex flex-col leading-none">
          <span className="font-display text-base tracking-[0.22em] text-slate-200">
            VALHALLA
          </span>
          <span className="font-body text-[9px] tracking-[0.5em] text-slate-500">
            EXHAUSTS
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-[11px] tracking-[0.35em] uppercase text-slate-500">
        <a
          href={BRAND.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-whatsapp"
          className="hover:text-white inline-flex items-center gap-2"
        >
          <Phone className="w-3.5 h-3.5" /> WhatsApp
        </a>
        <a
          href={BRAND.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-instagram"
          className="hover:text-white inline-flex items-center gap-2"
        >
          <Instagram className="w-3.5 h-3.5" /> Instagram
        </a>
        <a
          href={BRAND.email.href}
          data-testid="footer-email"
          className="hover:text-white inline-flex items-center gap-2"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
      </div>

      <div className="text-[10px] tracking-[0.35em] uppercase text-slate-600">
        © {new Date().getFullYear()} Valhalla Exhausts · Vigo
      </div>
    </div>
  </footer>
);

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
function App() {
  useReveal();
  return (
    <div className="App bg-[#050505] text-white" data-testid="app-root">
      <Header />
      <main>
        <Hero />
        <RuneMarquee />
        <Artisan />
        <Process />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
