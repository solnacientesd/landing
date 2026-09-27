import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/Icons";
import { LogoBadge, Wordmark } from "@/components/Logo";
import { NAV_LINKS, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/constants";
import { cn } from "@/utils/cn";

const NAV_H = 64;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [active, setActive] = useState<string[]>(["inicio"]);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  /* Scroll state: background, logo, active sections, progress */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      setShowLogo(y > 150);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);

      // On desktop two panels share a row, so several sections can be active at once.
      const line = NAV_H + window.innerHeight * 0.25;
      const ids = NAV_LINKS.map((l) => l.id).filter((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      setActive((prev) => (ids.length && ids.join() !== prev.join() ? ids : prev));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Mobile menu: lock scroll, close on Escape / desktop resize */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const logoVisible = showLogo || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
        scrolled || open
          ? "border-line bg-ink/80 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-ink",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-5 sm:px-8 lg:px-10"
        aria-label="Navegación principal"
      >
        {/* Logo: fades in once the big hero logo scrolls away */}
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          aria-label="Sol Naciente — inicio"
          tabIndex={logoVisible ? 0 : -1}
          className={cn(
            "group flex items-center gap-2.5 transition-all duration-500 ease-out",
            logoVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <LogoBadge className="w-9 transition-transform duration-700 group-hover:rotate-[14deg]" />
          <Wordmark size="sm" />
        </a>

        {/* Desktop links */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active.includes(l.id);
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  <span className={cn("text-[0.72rem] font-semibold tabular-nums transition-colors", isActive ? "text-brand" : "text-white/35 group-hover:text-brand")}>
                    {l.num}
                  </span>
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-[2px] origin-left rounded-full bg-brand transition-transform duration-500 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    )}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-auto hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-[0.88rem] font-bold text-ink shadow-[0_10px_30px_-12px_rgba(255,214,10,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:inline-flex lg:ml-3"
        >
          <WhatsAppIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          Pedir demo
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:ml-0 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Scroll progress */}
      <span
        className="pointer-events-none absolute bottom-[-1px] left-0 h-[2px] origin-left bg-brand"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 flex flex-col bg-ink/95 px-6 pb-8 pt-6 backdrop-blur-xl transition-all duration-500 ease-out sm:px-8 lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((l, i) => {
            const isActive = active.includes(l.id);
            return (
              <li
                key={l.id}
                className={cn("border-b border-white/10 transition-all duration-500 ease-out", open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-baseline gap-4 py-5"
                >
                  <span className="text-[0.85rem] font-semibold tabular-nums text-brand">{l.num}</span>
                  <span className={cn("text-[1.75rem] font-extrabold tracking-tight transition-colors", isActive ? "text-brand" : "text-white group-hover:text-brand")}>
                    {l.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={cn(
            "mt-auto flex items-center gap-4 rounded-2xl bg-brand p-4 text-ink transition-all duration-500 ease-out",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
        >
          <WhatsAppIcon className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span className="block text-[1.05rem] font-bold">Pedí tu demo gratis</span>
            <span className="text-[0.9rem] font-medium opacity-80">{WHATSAPP_DISPLAY} · WhatsApp</span>
          </span>
        </a>
      </div>
    </header>
  );
}
