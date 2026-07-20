import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/lib/sectors";
import { sectorImages } from "@/lib/sector-images";

export const metadata: Metadata = { title: "Soluções comerciais por setor" };
export default function Page() {
  return (
    <>
      <section className="bg-[#f3f7f1] py-20">
        <div className="section-shell">
          <span className="eyebrow">Soluções comerciais</span>
          <h1 className="section-title max-w-3xl">Serviços pensados para cada tipo de empresa</h1>
          <p className="section-copy max-w-2xl">
            Selecione o seu setor para ver as necessidades atendidas e solicitar uma proposta
            compatível com a operação.
          </p>
        </div>
      </section>
      <section className="section-shell py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const image = sectorImages[sector.slug];
            return (
              <Link
                key={sector.slug}
                href={`/comercial/setores/${sector.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-wm-green/40 hover:shadow-md"
              >
                <Image src={image.src} alt={image.alt} className="h-52 w-full object-cover" />
                <div className="p-7">
                  <h2 className="font-display text-2xl font-black text-wm-dark">{sector.title}</h2>
                  <p className="mt-3 min-h-18 text-sm leading-6 text-slate-600">{sector.summary}</p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-extrabold text-wm-green">
                    Ver solução <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
