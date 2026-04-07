import Link from "next/link";
import { SERVICES } from "@/lib/data";

export const metadata = { title: "Servicii & Prețuri" };

export default function ServiciiPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-center">Servicii & Prețuri</h1>
      <p className="mt-4 text-center text-neutral-400">
        Toate serviciile noastre, cu durată estimată și preț.
      </p>

      <div className="mt-14 divide-y divide-neutral-800 border-y border-neutral-800">
        {SERVICES.map((s) => (
          <div key={s.id} className="flex items-center justify-between py-6 gap-6">
            <div>
              <h3 className="font-serif text-xl">{s.name}</h3>
              <p className="text-sm text-neutral-500">{s.duration} minute</p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-2xl font-bold text-amber-400 whitespace-nowrap">{s.price} lei</p>
              <Link href="/programare" className="hidden sm:inline-block rounded-full border border-neutral-700 px-5 py-2 text-sm hover:border-amber-400">
                Rezervă
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-neutral-500">
        * Prețurile pot varia în funcție de lungimea părului și complexitatea serviciului.
      </p>
    </div>
  );
}
