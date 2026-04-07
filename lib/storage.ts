import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir();
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDir();
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf8");
}

export type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  barber: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  createdAt: string;
};

export type Subscriber = {
  email: string;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

export const bookings = {
  list: () => readJson<Booking[]>("bookings.json", []),
  add: async (b: Booking) => {
    const all = await bookings.list();
    all.push(b);
    await writeJson("bookings.json", all);
  },
};

export const subscribers = {
  list: () => readJson<Subscriber[]>("subscribers.json", []),
  add: async (s: Subscriber) => {
    const all = await subscribers.list();
    if (all.find((x) => x.email === s.email)) return;
    all.push(s);
    await writeJson("subscribers.json", all);
  },
};

export const users = {
  list: () => readJson<User[]>("users.json", []),
  findByEmail: async (email: string) => {
    const all = await users.list();
    return all.find((u) => u.email === email);
  },
  add: async (u: User) => {
    const all = await users.list();
    all.push(u);
    await writeJson("users.json", all);
  },
};
