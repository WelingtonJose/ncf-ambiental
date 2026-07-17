import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CheckList, Specs } from "@/components/ContentBlocks";
import { QuoteButton } from "@/components/SiteShell";
import { getSector, sectors } from "@/lib/sectors";
import { sectorImages } from "@/lib/sector-images";

export function generateStaticParams() { return sectors.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const sector = getSector((await params).slug); return { title: sector?.title ?? "Solução comercial" }; }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const sector = getSector((await params).slug); if (!sector) notFound();
  const image = sectorImages[sector.slug];
  return <><section className="bg-[#f3f7f1]"><div className="section-shell grid min-h-[500px] items-center gap-10 py-16 lg:grid-cols-2"><div><span className="eyebrow">Solução por setor</span><h1 className="section-title">{sector.title}</h1><p className="section-copy max-w-xl">{sector.summary}</p><div className="mt-8"><QuoteButton>Solicitar orçamento <ArrowRight /></QuoteButton></div></div><div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-white shadow-sm"><Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div></div></section><section className="section-shell py-20"><div className="grid gap-12 lg:grid-cols-2"><div><span className="eyebrow">Necessidades do setor</span><h2 className="section-title">Uma operação dimensionada para sua empresa</h2><p className="section-copy">O orçamento é preparado após entendermos o volume, o tipo de resíduo, a frequência e as condições de acesso.</p><CheckList items={[...sector.needs]} /></div><Specs items={[{ title: "Diagnóstico", text: "Levantamento do perfil de geração e da rotina do local." }, { title: "Frequência", text: "Atendimento pontual ou recorrente conforme necessidade." }, { title: "Equipamentos", text: "Lixeiras, contêineres e veículos definidos após avaliação." }, { title: "Proposta", text: "Escopo e valores personalizados para a operação." }]} /></div><div className="mt-16 border-t border-slate-200 pt-8"><Link href="/comercial/setores" className="font-bold text-wm-green">← Ver todas as soluções por setor</Link></div></section></>;
}
