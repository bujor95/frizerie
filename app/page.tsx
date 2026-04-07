import Link from "next/link";
import { SERVICES, SHOP } from "@/lib/data";
import { NewsletterForm } from "./newsletter-form";

export default function Home() {
  const featured = SERVICES.slice(0, 3);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">
          <p className="text-amber-400 uppercase tracking-[0.3em] text-xs">Since 2014</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl font-bold">
            {SHOP.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            {SHOP.tagline} Tuns, barbă și ras clasic, într-o atmosferă autentică de frizerie.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/programare" className="rounded-full bg-amber-400 px-8 py-4 font-medium text-neutral-950 hover:bg-amber-300">
              Fă o programare
            </Link>
            <Link href="/servicii" className="rounded-full border border-neutral-700 px-8 py-4 font-medium hover:border-amber-400">
              Vezi prețurile
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-center">Servicii populare</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {featured.map((s) => (
            <div key={s.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 hover:border-amber-400 transition">
              <h3 className="font-serif text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-neutral-400">{s.duration} minute</p>
              <p className="mt-6 text-3xl font-bold text-amber-400">{s.price} <span className="text-base text-neutral-400">lei</span></p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/servicii" className="text-amber-400 hover:underline">Vezi toate serviciile →</Link>
        </div>
      </section>

      {/* About */}
      <section className="border-y border-neutral-800 bg-neutral-900/50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Despre noi</h2>
          <p className="mt-6 text-neutral-300 leading-relaxed">
            La {SHOP.name} combinăm tehnicile clasice de bărbierit cu stilul modern.
            Echipa noastră de frizeri profesioniști îți oferă o experiență completă,
            de la tuns și barbă până la rasul clasic cu brici, într-un spațiu gândit
            pentru bărbații care prețuiesc detaliile.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-10 md:p-14">
          <h2 className="font-serif text-3xl">Rămâi la curent</h2>
          <p className="mt-3 text-neutral-400 max-w-xl">
            Abonează-te la newsletter și primești oferte, noutăți și sfaturi de styling direct pe email.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
