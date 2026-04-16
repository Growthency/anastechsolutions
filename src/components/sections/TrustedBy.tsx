import { MarqueeStrip } from "@/components/effects/MarqueeStrip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const clients = [
  "DigitalBD", "GreenLeaf Logistics", "Masjid Al-Noor", "ShopBD",
  "Lifeline Hospital", "AfriTech Solutions", "BuildCore BD", "EduVerse",
  "TechMart Asia", "CloudNet BD", "FinServe Pro", "MediCare Plus",
];

const ClientLogo = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 px-6 py-3 bg-paper-2 border border-border rounded-xl hover:border-brand-blue/30 transition-colors group">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-red/20 flex items-center justify-center text-xs font-bold text-brand-blue">
      {name[0]}
    </div>
    <span className="text-ink-soft group-hover:text-ink text-sm font-medium transition-colors whitespace-nowrap">
      {name}
    </span>
  </div>
);

export function TrustedBy() {
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <section className="py-16 bg-paper-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <ScrollReveal>
          <p className="text-center text-sm font-semibold text-ink-muted uppercase tracking-widest">
            Trusted by growing businesses worldwide
          </p>
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeStrip
          items={row1.map((name) => <ClientLogo key={name} name={name} />)}
          direction="left"
        />
        <MarqueeStrip
          items={row2.map((name) => <ClientLogo key={name} name={name} />)}
          direction="right"
        />
      </div>
    </section>
  );
}
