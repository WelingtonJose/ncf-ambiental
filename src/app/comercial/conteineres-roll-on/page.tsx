import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import PageHero from "@/components/PageHero";
import { QuoteButton } from "@/components/SiteShell";
import rollOn from "@/assets/images/ROLL ON ROLL OFF.png";
import container31 from "@/assets/images/04b - Roll On 31 metros.png";
import container39 from "@/assets/images/05b - Roll On 39 metros.png";

export const metadata: Metadata = { title: "Contêineres Roll-On" };
export default function Page() { return <><PageHero eyebrow="Equipamentos industriais" title="Contêineres Roll-On de 31 m³ e 39 m³" description="Locação de contêineres para grandes geradores, com retirada e transporte por caminhão Roll-On/Roll-Off." image={rollOn} imageAlt="Operação com caminhão Roll-On/Roll-Off" /><section className="section-shell py-20"><div className="mb-12 max-w-2xl"><span className="eyebrow">Capacidades disponíveis</span><h2 className="section-title">Escolha após o dimensionamento</h2><p className="section-copy">A capacidade ideal depende do tipo, densidade e volume do resíduo, além das condições de acesso ao local.</p></div><div className="grid gap-7 lg:grid-cols-2"><Container image={container31} volume="31 m³" text="Opção para operações com grande geração e ciclos de retirada programados." /><Container image={container39} volume="39 m³" text="Maior capacidade volumétrica para materiais compatíveis e de menor densidade." /></div></section></>; }
function Container({ image, volume, text }: { image: StaticImageData; volume: string; text: string }) { return <article className="rounded-2xl border border-slate-200 bg-[#f7f9f6] p-7"><Image src={image} alt={`Contêiner Roll-On de ${volume}`} className="scale-image" /><h2 className="mt-6 font-display text-3xl font-black text-wm-dark">Roll-On {volume}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p><p className="mt-4 text-xs font-bold uppercase tracking-[.1em] text-wm-green">Sujeito à avaliação do resíduo, peso e acesso</p><div className="mt-6"><QuoteButton className="secondary-cta">Solicitar orçamento</QuoteButton></div></article>; }
