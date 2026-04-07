export const SERVICES = [
  { id: "tuns-clasic", name: "Tuns clasic", duration: 30, price: 60 },
  { id: "tuns-barba", name: "Tuns + barbă", duration: 45, price: 90 },
  { id: "barba", name: "Aranjat barbă", duration: 20, price: 40 },
  { id: "tuns-copil", name: "Tuns copil", duration: 25, price: 45 },
  { id: "ras-clasic", name: "Ras clasic cu brici", duration: 30, price: 70 },
  { id: "pachet-complet", name: "Pachet complet (tuns + barbă + styling)", duration: 60, price: 130 },
] as const;

export const BARBERS = [
  { id: "andrei", name: "Andrei" },
  { id: "mihai", name: "Mihai" },
  { id: "razvan", name: "Răzvan" },
] as const;

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
];

export const SHOP = {
  name: "Barber's Den",
  tagline: "Frizerie clasică. Stil modern.",
  address: "Str. Exemplu nr. 12, București",
  phone: "+40 712 345 678",
  hours: "Luni–Sâmbătă: 09:00–19:00",
};
