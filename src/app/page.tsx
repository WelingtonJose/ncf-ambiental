import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CoverageSearch from "@/components/CoverageSearch";
import { CheckList } from "@/components/ContentBlocks";
import { QuoteButton } from "@/components/SiteShell";
import heroAerial from "@/assets/images/capa-ncf.png";
import truckCompactor from "@/assets/images/caminhao coletor balanca.jpeg";
import rollOnTruck from "@/assets/images/ROLL ON ROLL OFF.png";
import fleet from "@/assets/images/frota caminhoes.png";
import privateCollection from "@/assets/images/coleta-particular-residencial.png";
import bulkyWaste from "@/assets/images/coleta de residuos volumosos.png";

const services = [
  {
    image: privateCollection,
    title: "Coleta particular",
    text: "Retirada de resíduos já separados e locação de lixeiras para residências e terrenos.",
    href: "/residencial/coleta-residencial",
    cover: true,
  },
  {
    image: truckCompactor,
    title: "Coleta comercial",
    text: "Caminhão compactador e frequência ajustada ao volume do seu negócio.",
    href: "/comercial/coleta-comercial",
  },
  {
    image: rollOnTruck,
    title: "Resíduos industriais",
    text: "Contêineres e transporte Roll-On/Roll-Off para grandes volumes.",
    href: "/comercial/residuos-industriais",
  },
  {
    image: bulkyWaste,
    title: "Coleta de volumosos",
    text: "Retirada sob orçamento de sofás, geladeiras, fogões, armários e outros itens grandes.",
    href: "/residencial/coleta-volumosos",
    cover: true,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-[#f4f8f2]">
        <div className="section-shell py-10 sm:py-16">
          <span className="eyebrow mb-5">Soluções ambientais completas</span>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-wm-dark shadow-sm">
            <Image
              src={heroAerial}
              alt="Vista aérea da estrutura ambiental da NCF"
              priority
              className="h-auto w-full object-contain"
              sizes="(min-width: 1440px) 1360px, calc(100vw - 40px)"
            />
            <div className="bg-white p-5 sm:p-7 md:absolute md:inset-0 md:flex md:items-start md:bg-transparent md:p-10 lg:p-14">
              <div className="max-w-3xl bg-transparent p-0 md:p-7 md:[text-shadow:0_3px_12px_rgba(0,0,0,0.98),0_1px_2px_rgba(0,0,0,1)]">
                <h1 className="font-display text-3xl font-black leading-[1.05] text-wm-dark [text-shadow:none] sm:text-4xl md:text-5xl md:text-wm-gold md:[text-shadow:0_3px_12px_rgba(0,0,0,0.95),0_1px_2px_rgba(0,0,0,1)]">
                  Tem resíduos?
                  <br />
                  <span className="text-wm-gold">Nós cuidamos de tudo.</span>
                </h1>
                <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-700 md:text-white lg:text-lg lg:leading-8">
                  Da coleta ao destino final, a NCF Ambiental planeja, transporta e trata seus
                  resíduos com segurança, regularidade e responsabilidade ambiental.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <QuoteButton className="primary-cta justify-center">
              Solicitar atendimento <ArrowRight />
            </QuoteButton>
            <Link href="/sobre" className="secondary-cta text-center">
              Conheça a NCF
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-14 sm:py-20">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Área de atendimento</span>
            <h2 className="section-title">Veja se a NCF atende sua região</h2>
            <p className="section-copy max-w-xl">
              Informe o CEP da sua residência ou empresa. Para cidades sem unidade própria,
              indicamos a unidade de destinação NCF mais próxima.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
              <span className="rounded-full bg-[#edf4eb] px-4 py-2">Residencial</span>
              <span className="rounded-full bg-[#edf4eb] px-4 py-2">Comercial</span>
              <span className="rounded-full bg-[#edf4eb] px-4 py-2">Industrial</span>
            </div>
          </div>
          <CoverageSearch />
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceChoice key={service.href} {...service} />
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Gestão integrada</span>
            <h2 className="section-title">Da coleta à disposição final</h2>
            <p className="section-copy">
              Nossa operação conecta coleta planejada, transporte adequado, controle de recebimento,
              disposição controlada e tratamento de efluentes.
            </p>
            <CheckList
              items={[
                "Rotas e horários definidos",
                "Frota com manutenção preventiva",
                "Controle e inspeção de cargas",
                "Tratamento biológico e físico-químico",
              ]}
            />
          </div>
          <Image
            src={fleet}
            alt="Frota operacional da NCF Ambiental"
            className="h-64 w-full rounded-2xl border border-slate-200 object-cover sm:h-80 lg:h-[440px]"
          />
        </div>
      </section>
    </>
  );
}

function ServiceChoice({
  image,
  title,
  text,
  href,
  cover = false,
}: {
  image: StaticImageData;
  title: string;
  text: string;
  href: string;
  cover?: boolean;
}) {
  return (
    <article className="group flex min-h-[320px] flex-col border-b border-slate-200 p-5 last:border-0 sm:p-7 md:min-h-[340px] md:border-r xl:border-b-0">
      <Image
        src={image}
        alt={title}
        className={`h-40 w-full rounded-xl transition duration-500 group-hover:scale-[1.02] ${cover ? "object-cover" : "object-contain"}`}
      />
      <h2 className="mt-4 font-display text-2xl font-extrabold text-wm-dark">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{text}</p>
      <Link
        href={href}
        className="mt-4 flex items-center gap-2 text-sm font-extrabold text-wm-green"
      >
        Ver informações <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
