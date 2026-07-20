import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import hero from "@/assets/images/DJI_0360.jpg";
import fleet from "@/assets/images/frota caminhoes.png";
import compactor from "@/assets/images/caminhao coletor balanca.jpeg";
import containerTruck from "@/assets/images/caminhao conteiner balanca.jpeg";
import rollOn from "@/assets/images/ROLL ON ROLL OFF.png";
import landfill from "@/assets/images/celula de disposicao.jpg";
import landfill2 from "@/assets/images/celula de disposição 2.jpg";
import effluent from "@/assets/images/tratamento de efluentes.jpg";
import buildings from "@/assets/images/edificações.jpg";
import buildingsEffluent from "@/assets/images/edicicaoes + efluente.jpg";

export const metadata: Metadata = { title: "Sobre a NCF" };
const gallery: { src: StaticImageData; alt: string; label: string }[] = [
  { src: fleet, alt: "Frota da NCF Ambiental", label: "Frota operacional" }, { src: compactor, alt: "Caminhão compactador", label: "Coleta com compactador" }, { src: containerTruck, alt: "Caminhão de contêiner", label: "Transporte de contêineres" }, { src: rollOn, alt: "Caminhão Roll-On/Roll-Off", label: "Operação Roll-On/Roll-Off" }, { src: landfill, alt: "Célula de disposição final", label: "Disposição final" }, { src: landfill2, alt: "Célula em operação", label: "Célula em operação" }, { src: effluent, alt: "Tratamento de efluentes", label: "Tratamento de efluentes" }, { src: buildings, alt: "Edificações da unidade", label: "Infraestrutura" }, { src: buildingsEffluent, alt: "Unidade operacional", label: "Unidade operacional" },
];
export default function Page() { return <><PageHero eyebrow="Sobre a NCF" title="Engenharia e operação a serviço do meio ambiente" description="Atuamos na coleta, no transporte, no tratamento e na disposição final de resíduos, com estrutura operacional em Rondônia e Mato Grosso." image={hero} imageAlt="Vista aérea da estrutura da NCF Ambiental" /><section className="section-shell py-20"><div className="grid gap-6 md:grid-cols-3"><Value icon={ShieldCheck} title="Segurança" text="Procedimentos, equipes e equipamentos voltados à operação responsável." /><Value icon={Leaf} title="Responsabilidade ambiental" text="Controle operacional e destinação adequada em todas as etapas." /><Value icon={Truck} title="Capacidade operacional" text="Frota e estrutura para demandas residenciais, comerciais e industriais." /></div></section><section className="bg-[#f7f9f6] py-20"><div className="section-shell"><span className="eyebrow">Nossa operação em imagens</span><h2 className="section-title">Estrutura, frota e unidades</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{gallery.map((item) => <article key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><Image src={item.src} alt={item.alt} className="h-64 w-full object-cover" /><h3 className="p-5 font-bold text-wm-dark">{item.label}</h3></article>)}</div></div></section></>; }
function Value({ icon: Icon, title, text }: { icon: typeof Leaf; title: string; text: string }) { return <article className="rounded-2xl border border-slate-200 bg-white p-7"><Icon className="h-9 w-9 text-wm-green" /><h2 className="mt-5 font-display text-2xl font-black text-wm-dark">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>; }
