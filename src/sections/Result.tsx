import { Clock, Eye, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import resultImg from "@/assets/images/result-x6.jpg";
import { WhatsAppIcon } from "@/components/Icons";
import { LogoLockup } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Feature, Headline, SectionLabel, Y } from "@/components/ui";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/constants";

const BENEFITS = [
  {
    icon: Eye,
    text: (
      <>
        Tu marca se ve profesional
        <br />
        <Y>y confiable.</Y>
      </>
    ),
  },
  {
    icon: Users,
    text: (
      <>
        <Y>El cliente llega con más</Y>
        <br />
        información y decisión.
      </>
    ),
  },
  {
    icon: Clock,
    text: (
      <>
        Tu equipo comercial
        <br />
        <Y>recibe leads más calificados.</Y>
      </>
    ),
  },
];

const PAD = "px-6 @sm:px-9 @xl:px-12 @3xl:px-14";

export function Result() {
  return (
    <section id="resultado" className="@container relative isolate flex flex-col overflow-hidden bg-panel" aria-labelledby="resultado-title">
      {/* ---------------------------------------------------------------- */}
      {/* Benefits over dealership photo                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="grain relative isolate flex-1">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={resultImg} alt="" loading="lazy" className="h-full w-full object-cover object-[68%_60%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/85 via-30% to-panel/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-panel via-panel/20 via-35% to-panel" />
        </div>

        <div className={`${PAD} pb-12 pt-6 @sm:pt-9 @xl:pb-14 @xl:pt-12 @3xl:pt-14`}>
          <Reveal>
            <SectionLabel num="03" text="El resultado" />
          </Reveal>

          <Reveal delay={80}>
            <Headline className="mt-4 @xl:mt-5">
              <span id="resultado-title">
                Más claridad.
                <br />
                <Y>Más consultas calificadas.</Y>
                <br />
                Mejor seguimiento.
              </span>
            </Headline>
          </Reveal>

          <ul className="mt-7 space-y-4 @xl:mt-9 @xl:space-y-5" aria-label="Beneficios">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" key={i} delay={200 + i * 110} from="left">
                <Feature icon={b.icon} ringClassName="h-12 w-12 @xl:h-14 @xl:w-14 @3xl:h-[3.75rem] @3xl:w-[3.75rem]">
                  {b.text}
                </Feature>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <hr className="mx-6 border-white/10 @sm:mx-9 @xl:mx-12 @3xl:mx-14" />

      {/* ---------------------------------------------------------------- */}
      {/* Contact CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div id="contacto" className={`${PAD} py-8 @xl:py-10`}>
        {/* CTA bar */}
        <Reveal delay={80} from="scale">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-2xl bg-brand p-3.5 text-ink shadow-[0_24px_60px_-24px_rgba(255,214,10,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-[0_30px_70px_-24px_rgba(255,214,10,0.7)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 @xl:flex-row @xl:items-center @xl:gap-5 @xl:p-4"
          >
            <span className="flex flex-1 items-center gap-3.5 pl-1 @xl:gap-4">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center @xl:h-14 @xl:w-14">
                <span className="absolute inset-1 rounded-full border-2 border-ink/25 animate-pulse-ring" aria-hidden="true" />
                <WhatsAppIcon className="h-10 w-10 @xl:h-12 @xl:w-12" />
              </span>
              <span className="text-[0.95rem] font-bold leading-[1.25] @xl:text-[1.08rem] @3xl:text-[1.15rem]">
                ¿Querés que te muestre
                <br className="hidden @xl:inline" /> una demo aplicada a uno de
                <br className="hidden @xl:inline" /> tus vehículos?
              </span>
            </span>

            <span className="flex items-center gap-3 rounded-xl bg-ink p-2.5 text-white transition-transform duration-300 group-hover:scale-[1.02] @xl:gap-4 @xl:p-3">
              <span className="shrink-0 rounded-md bg-ink p-0.5">
                <QRCodeSVG
                  value={WHATSAPP_URL}
                  size={64}
                  level="M"
                  bgColor="transparent"
                  fgColor="#ffffff"
                  className="h-16 w-16 @xl:h-[4.5rem] @xl:w-[4.5rem]"
                  aria-label="Código QR para escribir por WhatsApp"
                />
              </span>
              <span className="flex items-center gap-2.5 pr-2">
                <WhatsAppIcon className="h-6 w-6 shrink-0 text-white @xl:h-7 @xl:w-7" />
                <span className="leading-none">
                  <span className="block text-[1.15rem] font-bold tracking-tight text-brand @xl:text-[1.3rem]">{WHATSAPP_DISPLAY}</span>
                  <span className="mt-1.5 block text-[0.68rem] font-medium text-white/85 @xl:text-[0.74rem]">Escribinos por WhatsApp</span>
                </span>
              </span>
            </span>
          </a>
        </Reveal>
      </div>

      <hr className="mx-6 border-white/10 @sm:mx-9 @xl:mx-12 @3xl:mx-14" />

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className={`${PAD} mt-auto flex flex-col gap-5 py-7 @lg:flex-row @lg:items-center @lg:justify-between @xl:py-9`}>
        <Reveal>
          <LogoLockup size="sm" />
        </Reveal>
        <Reveal delay={100} className="flex items-center gap-5">
          <span className="hidden h-10 w-px bg-white/15 @lg:block" aria-hidden="true" />
          <p className="text-[0.85rem] font-medium leading-[1.6] text-white/85 @xl:text-[0.95rem]">
            Diseño <span className="mx-1 text-brand">+</span> Estrategia <span className="mx-1 text-brand">+</span> Tecnología
            <br />
            <span className="mr-2 text-brand">=</span>
            <span className="font-bold text-white">Más ventas</span>
          </p>
        </Reveal>
      </footer>
    </section>
  );
}
