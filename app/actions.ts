"use server";

import { randomUUID, createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { bookings, subscribers, users } from "@/lib/storage";
import { SERVICES, BARBERS, TIME_SLOTS } from "@/lib/data";

function hash(pw: string) {
  return createHash("sha256").update(pw).digest("hex");
}

export async function createBooking(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "");
  const barber = String(formData.get("barber") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");

  if (!name || !phone || !service || !barber || !date || !time) {
    return { ok: false, error: "Completează toate câmpurile." };
  }
  if (!SERVICES.find((s) => s.id === service)) return { ok: false, error: "Serviciu invalid." };
  if (!BARBERS.find((b) => b.id === barber)) return { ok: false, error: "Frizer invalid." };
  if (!TIME_SLOTS.includes(time)) return { ok: false, error: "Oră invalidă." };

  const all = await bookings.list();
  if (all.find((b) => b.barber === barber && b.date === date && b.time === time)) {
    return { ok: false, error: "Acest interval este deja ocupat." };
  }

  await bookings.add({
    id: randomUUID(),
    name, phone, service, barber, date, time,
    createdAt: new Date().toISOString(),
  });
  revalidatePath("/admin");
  revalidatePath("/programare");
  return { ok: true };
}

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Email invalid." };
  }
  await subscribers.add({ email, createdAt: new Date().toISOString() });
  return { ok: true };
}

export async function registerUser(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 6) {
    return { ok: false, error: "Date invalide (parola minim 6 caractere)." };
  }
  if (await users.findByEmail(email)) {
    return { ok: false, error: "Există deja un cont cu acest email." };
  }
  await users.add({
    id: randomUUID(),
    name, email,
    passwordHash: hash(password),
    createdAt: new Date().toISOString(),
  });
  return { ok: true };
}

export async function loginUser(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const u = await users.findByEmail(email);
  if (!u || u.passwordHash !== hash(password)) {
    return { ok: false, error: "Email sau parolă incorectă." };
  }
  return { ok: true, name: u.name };
}
