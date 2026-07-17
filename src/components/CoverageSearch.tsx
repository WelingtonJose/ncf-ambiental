"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import { QuoteButton } from "./SiteShell";

type Unit = { id: string; name: string; city: string; state: string; latitude: number; longitude: number };
type Result = { locality: string; state: string; unit: Unit; distanceKm?: number };

const units: Unit[] = [
  { id: "vilhena", name: "Aterro Sanitário NCF Ambiental – Vilhena/RO", city: "Vilhena", state: "RO", latitude: -12.7406, longitude: -60.1458 },
  { id: "cacoal", name: "Aterro Sanitário NCF Ambiental – Cacoal/RO", city: "Cacoal", state: "RO", latitude: -11.4343, longitude: -61.4562 },
  { id: "ji-parana", name: "Aterro Sanitário NCF Ambiental – Ji-Paraná/RO", city: "Ji-Paraná", state: "RO", latitude: -10.8777, longitude: -61.9322 },
  { id: "tangara", name: "Aterro Sanitário NCF Ambiental – Tangará da Serra/MT", city: "Tangará da Serra", state: "MT", latitude: -14.6229, longitude: -57.4933 },
  { id: "juina", name: "Aterro Sanitário NCF Ambiental – Juína/MT", city: "Juína", state: "MT", latitude: -11.3728, longitude: -58.7483 },
  { id: "campo-novo", name: "Aterro Sanitário NCF Ambiental – Campo Novo do Parecis/MT", city: "Campo Novo do Parecis", state: "MT", latitude: -13.6587, longitude: -57.8907 },
  { id: "pontes-lacerda", name: "Aterro Sanitário NCF Ambiental – Pontes e Lacerda/MT", city: "Pontes e Lacerda", state: "MT", latitude: -15.2261, longitude: -59.3353 },
];

const overrides: Record<string, string> = {
  "rolim de moura|RO": "cacoal",
  "pimenta bueno|RO": "cacoal",
  "colorado do oeste|RO": "vilhena",
};

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function CoverageSearch() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<Result>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchCoverage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    setResult(undefined); setError("");
    if (digits.length !== 8) { setError("Digite um CEP válido com 8 números."); return; }
    setLoading(true);
    try {
      let locality = ""; let state = ""; let latitude: number | undefined; let longitude: number | undefined;
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${digits}`);
        if (!response.ok) throw new Error();
        const data = await response.json() as { city?: string; state?: string; location?: { coordinates?: { latitude?: string | number; longitude?: string | number } } };
        if (!data.city || !data.state) throw new Error();
        locality = data.city; state = data.state;
        const lat = Number(data.location?.coordinates?.latitude); const lon = Number(data.location?.coordinates?.longitude);
        if (Number.isFinite(lat) && Number.isFinite(lon) && (lat !== 0 || lon !== 0)) { latitude = lat; longitude = lon; }
      } catch {
        const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await response.json() as { localidade?: string; uf?: string; erro?: boolean };
        if (!response.ok || data.erro || !data.localidade || !data.uf) throw new Error();
        locality = data.localidade; state = data.uf;
      }

      const place = normalize(locality);
      let unit = units.find((item) => normalize(item.city) === place && item.state === state.toUpperCase());
      const override = overrides[`${place}|${state.toUpperCase()}`];
      if (!unit && override) unit = units.find((item) => item.id === override);

      if (!unit && (latitude === undefined || longitude === undefined)) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${locality}, ${state}, Brasil`)}&format=jsonv2&limit=1`);
          const places = await response.json() as Array<{ lat?: string; lon?: string }>;
          const lat = Number(places[0]?.lat); const lon = Number(places[0]?.lon);
          if (Number.isFinite(lat) && Number.isFinite(lon)) { latitude = lat; longitude = lon; }
        } catch { /* O CEP continua válido mesmo sem coordenadas. */ }
      }

      let distanceKm: number | undefined;
      if (!unit && latitude !== undefined && longitude !== undefined) {
        const sameState = units.filter((item) => item.state === state.toUpperCase());
        const candidates = sameState.length ? sameState : units;
        const closest = candidates.map((item) => ({ item, distance: distanceBetween(latitude!, longitude!, item.latitude, item.longitude) })).sort((a, b) => a.distance - b.distance)[0];
        unit = closest?.item; distanceKm = closest?.distance;
      }
      if (!unit) throw new Error();
      setResult({ locality, state, unit, distanceKm });
    } catch { setError("Não foi possível localizar este CEP. Confira os números e tente novamente."); }
    finally { setLoading(false); }
  }

  return <div className="rounded-2xl border border-slate-200 border-t-4 border-t-wm-green bg-white p-7 shadow-sm"><div className="flex items-start justify-between"><div><h2 className="font-display text-2xl font-black text-wm-dark">Consulte sua região</h2><p className="mt-1 text-xs font-bold text-slate-500">Confira a cobertura operacional da NCF</p></div><span className="rounded-lg bg-[#edf4eb] p-3 text-wm-green"><MapPin className="h-5 w-5" /></span></div><form onSubmit={searchCoverage} className="mt-6"><label className="text-xs font-black uppercase tracking-[.08em] text-wm-green">Digite o CEP da sua residência ou empresa</label><div className="relative mt-2"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={cep} onChange={(event) => setCep(event.target.value)} required inputMode="numeric" maxLength={9} placeholder="Ex.: 76980-000" className="w-full rounded-md border border-slate-300 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-wm-green focus:ring-2 focus:ring-wm-green/10" /></div><button type="submit" disabled={loading} className="mt-4 w-full rounded-md bg-wm-gold px-5 py-3.5 text-sm font-extrabold text-wm-dark disabled:opacity-70">{loading ? "Consultando localidade..." : "Verificar cobertura operacional"}</button></form>{error && <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</div>}{result && <div className="mt-5 rounded-xl border border-wm-green/15 bg-[#f2f7f1] p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-wm-green">Localidade consultada</p><h3 className="mt-1 font-display text-xl font-black text-wm-dark">{result.locality} – {result.state}</h3><div className="mt-4 rounded-lg border border-wm-green/10 bg-white p-3"><p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-500">Unidade de destinação indicada</p><p className="mt-1 text-sm font-extrabold text-wm-dark">{result.unit.name}</p>{result.distanceKm !== undefined && <p className="mt-1 text-[11px] text-slate-500">Unidade NCF mais próxima da localidade consultada.</p>}</div><p className="mt-3 text-xs leading-5 text-slate-600">Consulte nossa equipe para confirmar disponibilidade, coleta e condições de atendimento.</p><QuoteButton className="mt-2 text-sm font-extrabold text-wm-green">Solicitar atendimento →</QuoteButton></div>}</div>;
}

function distanceBetween(lat1: number, lon1: number, lat2: number, lon2: number) { const rad = (value: number) => value * Math.PI / 180; const dLat = rad(lat2 - lat1); const dLon = rad(lon2 - lon1); const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); }
