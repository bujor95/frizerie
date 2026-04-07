"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "./actions";

export function NewsletterForm() {
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => {
        start(async () => {
          const res = await subscribeNewsletter(fd);
          setOk(res.ok);
          setMsg(res.ok ? "Te-ai abonat. Îți mulțumim!" : res.error ?? "Eroare.");
        });
      }}
      className="flex flex-col sm:flex-row gap-3 max-w-lg"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="email@exemplu.ro"
        className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm focus:border-amber-400 outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-amber-400 px-5 py-3 text-sm font-medium text-neutral-950 hover:bg-amber-300 disabled:opacity-50"
      >
        {pending ? "Se trimite..." : "Abonează-te"}
      </button>
      {msg && (
        <p className={`text-sm self-center ${ok ? "text-emerald-400" : "text-rose-400"}`}>{msg}</p>
      )}
    </form>
  );
}
