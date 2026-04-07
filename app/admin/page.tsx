import { bookings, subscribers, users } from "@/lib/storage";
import { SERVICES, BARBERS } from "@/lib/data";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [allBookings, allSubs, allUsers] = await Promise.all([
    bookings.list(),
    subscribers.list(),
    users.list(),
  ]);

  const sorted = [...allBookings].sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time)
  );

  const serviceName = (id: string) => SERVICES.find((s) => s.id === id)?.name ?? id;
  const barberName = (id: string) => BARBERS.find((b) => b.id === id)?.name ?? id;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-4xl">Panou Admin</h1>
      <p className="mt-2 text-neutral-400 text-sm">
        Programări, abonați newsletter și useri înregistrați.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <Stat label="Programări" value={allBookings.length} />
        <Stat label="Abonați newsletter" value={allSubs.length} />
        <Stat label="Useri înregistrați" value={allUsers.length} />
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl mb-4">Programări</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <Th>Data</Th><Th>Ora</Th><Th>Client</Th><Th>Telefon</Th>
                <Th>Serviciu</Th><Th>Frizer</Th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-neutral-500">Nicio programare încă.</td></tr>
              )}
              {sorted.map((b) => (
                <tr key={b.id} className="border-t border-neutral-800">
                  <Td>{b.date}</Td>
                  <Td>{b.time}</Td>
                  <Td>{b.name}</Td>
                  <Td>{b.phone}</Td>
                  <Td>{serviceName(b.service)}</Td>
                  <Td>{barberName(b.barber)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-serif text-2xl mb-4">Abonați newsletter</h2>
          <ul className="rounded-xl border border-neutral-800 divide-y divide-neutral-800">
            {allSubs.length === 0 && <li className="p-4 text-neutral-500 text-sm">Niciun abonat.</li>}
            {allSubs.map((s) => (
              <li key={s.email} className="p-4 text-sm flex justify-between">
                <span>{s.email}</span>
                <span className="text-neutral-500">{s.createdAt.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl mb-4">Useri înregistrați</h2>
          <ul className="rounded-xl border border-neutral-800 divide-y divide-neutral-800">
            {allUsers.length === 0 && <li className="p-4 text-neutral-500 text-sm">Niciun user.</li>}
            {allUsers.map((u) => (
              <li key={u.id} className="p-4 text-sm">
                <p>{u.name}</p>
                <p className="text-neutral-500">{u.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-14 text-xs text-neutral-600">
        ⚠ Acest panou nu este protejat. Adaugă autentificare înainte de producție.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-amber-400">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left font-normal px-4 py-3">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>;
}
