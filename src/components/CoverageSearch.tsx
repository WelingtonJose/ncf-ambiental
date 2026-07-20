"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import { searchCoverageByCep } from "@/services/coverage";
import type { CoverageResult } from "@/lib/coverage";
import { QuoteButton } from "./SiteShell";

export default function CoverageSearch() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<CoverageResult>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    setResult(undefined);
    setError("");

    if (digits.length !== 8) {
      setError("Digite um CEP válido com 8 números.");
      return;
    }

    setLoading(true);
    try {
      setResult(await searchCoverageByCep(digits));
    } catch {
      setError("Não foi possível localizar este CEP. Confira os números e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 border-t-4 border-t-wm-green bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-black text-wm-dark sm:text-2xl">
            Consulte sua região
          </h2>
          <p className="mt-1 text-xs font-bold text-slate-500">
            Confira a cobertura operacional da NCF
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-[#edf4eb] p-3 text-wm-green">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label
          htmlFor="coverage-cep"
          className="text-xs font-black uppercase tracking-[.08em] text-wm-green"
        >
          Digite o CEP da sua residência ou empresa
        </label>
        <div className="relative mt-2">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="coverage-cep"
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            required
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            placeholder="Ex.: 76980-000"
            className="w-full rounded-md border border-slate-300 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-wm-green focus:ring-2 focus:ring-wm-green/10"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-md bg-wm-gold px-4 py-3.5 text-sm font-extrabold text-wm-dark disabled:opacity-70 sm:px-5"
        >
          {loading ? "Consultando localidade..." : "Verificar cobertura operacional"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700"
        >
          {error}
        </div>
      )}

      {result && <CoverageResultCard result={result} />}
    </div>
  );
}

function CoverageResultCard({ result }: { result: CoverageResult }) {
  return (
    <div className="mt-5 rounded-xl border border-wm-green/15 bg-[#f2f7f1] p-4">
      <p className="text-xs font-black uppercase tracking-[.12em] text-wm-green">
        Localidade consultada
      </p>
      <h3 className="mt-1 font-display text-xl font-black text-wm-dark">
        {result.locality} – {result.state}
      </h3>
      <div className="mt-4 rounded-lg border border-wm-green/10 bg-white p-3">
        <p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-500">
          Unidade de destinação indicada
        </p>
        <p className="mt-1 text-sm font-extrabold text-wm-dark">{result.unit.name}</p>
        {result.distanceKm !== undefined && (
          <p className="mt-1 text-[11px] text-slate-500">
            Unidade NCF mais próxima da localidade consultada.
          </p>
        )}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        Consulte nossa equipe para confirmar disponibilidade, coleta e condições de atendimento.
      </p>
      <QuoteButton className="mt-2 text-sm font-extrabold text-wm-green">
        Solicitar atendimento →
      </QuoteButton>
    </div>
  );
}
