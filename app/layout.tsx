import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SHOP } from "@/lib/data";

export const metadata: Metadata = {
  title: `${SHOP.name} — ${SHOP.tagline}`,
  description: "Frizerie clasică cu programări online, servicii premium și stil modern.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-50">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl tracking-wide">
              <span className="text-amber-400">✂</span> {SHOP.name}
            </Link>
            <ul className="hidden md:flex gap-8 text-sm">
              <li><Link href="/" className="hover:text-amber-400">Acasă</Link></li>
              <li><Link href="/servicii" className="hover:text-amber-400">Servicii & Prețuri</Link></li>
              <li><Link href="/programare" className="hover:text-amber-400">Programare</Link></li>
              <li><Link href="/cont" className="hover:text-amber-400">Cont</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400">Admin</Link></li>
            </ul>
            <Link href="/programare" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-300">
              Programează-te
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-8 text-sm text-neutral-400">
            <div>
              <p className="font-serif text-lg text-neutral-100">{SHOP.name}</p>
              <p className="mt-2">{SHOP.tagline}</p>
            </div>
            <div>
              <p className="text-neutral-200 font-medium">Contact</p>
              <p className="mt-2">{SHOP.address}</p>
              <p>{SHOP.phone}</p>
              <p>{SHOP.hours}</p>
            </div>
            <div>
              <p className="text-neutral-200 font-medium">Navigare</p>
              <ul className="mt-2 space-y-1">
                <li><Link href="/servicii" className="hover:text-amber-400">Servicii</Link></li>
                <li><Link href="/programare" className="hover:text-amber-400">Programare</Link></li>
                <li><Link href="/cont" className="hover:text-amber-400">Cont</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-neutral-600 pb-6">© {new Date().getFullYear()} {SHOP.name}. Toate drepturile rezervate.</p>
        </footer>
      </body>
    </html>
  );
}
