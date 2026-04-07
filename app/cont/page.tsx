import { AuthForms } from "./auth-forms";

export const metadata = { title: "Cont" };

export default function ContPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-serif text-4xl text-center">Contul tău</h1>
      <p className="mt-4 text-center text-neutral-400 text-sm">
        Autentifică-te sau creează un cont pentru a-ți gestiona programările.
      </p>
      <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <AuthForms />
      </div>
    </div>
  );
}
