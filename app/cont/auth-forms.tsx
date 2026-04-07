"use client";

import { useState, useTransition } from "react";
import { loginUser, registerUser } from "../actions";

export function AuthForms() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <div className="flex gap-2 mb-8 rounded-md bg-neutral-900 border border-neutral-800 p-1">
        <button
          onClick={() => { setMode("login"); setMsg(null); }}
          className={`flex-1 py-2 rounded text-sm ${mode === "login" ? "bg-amber-400 text-neutral-950" : "text-neutral-400"}`}
        >
          Autentificare
        </button>
        <button
          onClick={() => { setMode("register"); setMsg(null); }}
          className={`flex-1 py-2 rounded text-sm ${mode === "register" ? "bg-amber-400 text-neutral-950" : "text-neutral-400"}`}
        >
          Cont nou
        </button>
      </div>

      <form
        action={(fd) => {
          start(async () => {
            const res = mode === "login" ? await loginUser(fd) : await registerUser(fd);
            if (res.ok) {
              setMsg({
                ok: true,
                text: mode === "login" ? `Bun venit${"name" in res && res.name ? ", " + res.name : ""}!` : "Cont creat. Te poți autentifica.",
              });
            } else {
              setMsg({ ok: false, text: res.error ?? "Eroare." });
            }
          });
        }}
        className="grid gap-4"
      >
        {mode === "register" && (
          <input name="name" required placeholder="Nume complet" className={input} />
        )}
        <input name="email" required type="email" placeholder="Email" className={input} />
        <input name="password" required type="password" placeholder="Parolă" className={input} />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-amber-400 px-6 py-3 font-medium text-neutral-950 hover:bg-amber-300 disabled:opacity-50"
        >
          {pending ? "Se procesează..." : mode === "login" ? "Intră în cont" : "Creează cont"}
        </button>
        {msg && (
          <p className={`text-center text-sm ${msg.ok ? "text-emerald-400" : "text-rose-400"}`}>{msg.text}</p>
        )}
      </form>
    </div>
  );
}

const input =
  "w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm focus:border-amber-400 outline-none";
