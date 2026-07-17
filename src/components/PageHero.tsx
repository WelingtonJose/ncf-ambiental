import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { QuoteButton } from "./SiteShell";

export default function PageHero({ eyebrow, title, description, image, imageAlt, imageFit = "cover" }: { eyebrow: string; title: string; description: string; image: StaticImageData; imageAlt: string; imageFit?: "cover" | "contain" }) {
  return <section className="bg-[#f3f7f1]"><div className="section-shell grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-2"><div><span className="eyebrow">{eyebrow}</span><h1 className="section-title max-w-2xl">{title}</h1><p className="section-copy max-w-xl">{description}</p><div className="mt-8"><QuoteButton>Solicitar orçamento <ArrowRight /></QuoteButton></div></div><div className={`relative min-h-[340px] overflow-hidden rounded-2xl shadow-sm ${imageFit === "contain" ? "bg-white" : ""}`}><Image src={image} alt={imageAlt} fill priority className={imageFit === "contain" ? "object-contain p-5" : "object-cover"} sizes="(min-width: 1024px) 50vw, 100vw" /></div></div></section>;
}
