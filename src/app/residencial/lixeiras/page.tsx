import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { QuoteButton } from "@/components/SiteShell";
import binHero from "@/assets/images/02c - Lixeira 500 Lts.png";
import bin240 from "@/assets/images/01b - Lixeira 240 Lts.png";
import bin500 from "@/assets/images/02b - Lixeira 500 Lts.png";
import bin1000 from "@/assets/images/03b - Lixeira 1000 Lts.png";

export const metadata: Metadata = { title: "Opções de lixeiras" };
const bins = [
  { volume: "240 L", image: bin240, title: "Lixeira residencial", use: "Residências e pequenos pontos de geração", details: ["2 rodas", "Tampa articulada", "Fácil deslocamento"] },
  { volume: "500 L", image: bin500, title: "Lixeira coletiva", use: "Condomínios e áreas compartilhadas", details: ["4 rodas", "Maior capacidade diária", "Pontos de coleta organizados"] },
  { volume: "1.000 L", image: bin1000, title: "Lixeira coletiva reforçada", use: "Condomínios maiores e alta geração", details: ["4 rodas reforçadas", "Grande abertura", "Operação mecanizada"] },
];
export default function Page() { return <><PageHero eyebrow="Equipamentos residenciais" title="Opções de lixeiras para cada volume" description="Escolha o recipiente adequado para manter o descarte organizado, protegido e pronto para a coleta." image={binHero} imageAlt="Lixeiras NCF Ambiental de 500 e 240 litros" imageFit="contain" /><section className="section-shell py-20"><div className="mb-12 max-w-2xl"><span className="eyebrow">Modelos disponíveis</span><h2 className="section-title">Compare as capacidades</h2><p className="section-copy">A indicação final considera o número de usuários, a frequência de coleta e o espaço disponível.</p></div><div className="grid gap-6 lg:grid-cols-3">{bins.map((bin) => <BinCard key={bin.volume} {...bin} />)}</div></section></>; }
function BinCard({ volume, image, title, use, details }: { volume: string; image: StaticImageData; title: string; use: string; details: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="rounded-full bg-wm-gold px-3 py-1 text-xs font-black text-wm-dark">{volume}</span><Image src={image} alt={`${title} ${volume}`} className="scale-image mt-5" /><h2 className="mt-6 font-display text-2xl font-black text-wm-dark">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{use}</p><div className="mt-5 grid gap-2">{details.map((item) => <p key={item} className="check-line text-sm"><Check />{item}</p>)}</div><div className="mt-6"><QuoteButton className="secondary-cta w-full justify-center">Solicitar orçamento</QuoteButton></div></article>; }
