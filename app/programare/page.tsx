import { BookingForm } from "./booking-form";

export const metadata = { title: "Programare" };

export default function ProgramarePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-center">Fă o programare</h1>
      <p className="mt-4 text-center text-neutral-400">
        Alege serviciul, frizerul și ora preferată. Îți confirmăm imediat.
      </p>
      <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <BookingForm />
      </div>
    </div>
  );
}
