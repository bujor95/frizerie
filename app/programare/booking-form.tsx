"use client";

import { useState, useTransition } from "react";
import { createBooking } from "../actions";
import { SERVICES, BARBERS, TIME_SLOTS } from "@/lib/data";

export function BookingForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={(fd) => {
        start(async () => {
          const res = await createBooking(fd);
          if (res.ok) {
            setMsg({ ok: true, text: "Programare confirmată! Te așteptăm." });
          } else {
            setMsg({ ok: false, text: res.error ?? "Eroare." });
          }
        });
      }}
      className="grid gap-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nume complet">
          <input name="name" required className={input} placeholder="Ion Popescu" />
        </Field>
        <Field label="Telefon">
          <input name="phone" required type="tel" className={input} placeholder="07xx xxx xxx" />
        </Field>
      </div>

      <Field label="Serviciu">
        <select name="service" required defaultValue="" className={input}>
          <option value="" disabled>Alege serviciul...</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>{s.name} — {s.price} lei</option>
          ))}
        </select>
      </Field>

      <Field label="Frizer">
        <select name="barber" required defaultValue="" className={input}>
          <option value="" disabled>Alege frizerul...</option>
          {BARBERS.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Data">
          <input name="date" type="date" required min={today} className={input} />
        </Field>
        <Field label="Ora">
          <select name="time" required defaultValue="" className={input}>
            <option value="" disabled>Alege ora...</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-amber-400 px-6 py-4 font-medium text-neutral-950 hover:bg-amber-300 disabled:opacity-50"
      >
        {pending ? "Se trimite..." : "Confirmă programarea"}
      </button>

      {msg && (
        <p className={`text-center text-sm ${msg.ok ? "text-emerald-400" : "text-rose-400"}`}>
          {msg.text}
        </p>
      )}
    </form>
  );
}

const input =
  "w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm focus:border-amber-400 outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-neutral-300">{label}</span>
      {children}
    </label>
  );
}
