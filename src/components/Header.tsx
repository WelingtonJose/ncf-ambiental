"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ChevronDown, CircleEllipsis, Factory, HardHat, Home, Hotel, Menu, Recycle, ShoppingCart, Sofa, Truck, Warehouse, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

const residentialItems = [
  { label: "Coleta particular", description: "Retirada de resíduos e locação de lixeiras.", icon: Home, href: "/residencial/coleta-residencial" },
  { label: "Opções de lixeiras", description: "Modelos de 240, 500 e 1.000 litros.", icon: Recycle, href: "/residencial/lixeiras" },
  { label: "Coleta de volumosos", description: "Sofás, geladeiras, fogões e armários.", icon: Sofa, href: "/residencial/coleta-volumosos" },
];

const corporateServices = [
  { label: "Coleta comercial", description: "Compactador e frequência programada.", icon: Building2, href: "/comercial/coleta-comercial" },
  { label: "Resíduos industriais", description: "Transporte para grandes volumes.", icon: Factory, href: "/comercial/residuos-industriais" },
  { label: "Contêineres Roll-On", description: "Opções de 31 m³ e 39 m³.", icon: Truck, href: "/comercial/conteineres-roll-on" },
];

const companySectors = [
  { slug: "comercios-e-mercados", label: "Comércios e mercados", description: "Coleta recorrente para estabelecimentos.", icon: ShoppingCart },
  { slug: "escritorios-e-empresas", label: "Escritórios e empresas", description: "Sedes e centros empresariais.", icon: Building2 },
  { slug: "restaurantes-e-hoteis", label: "Restaurantes e hotéis", description: "Alimentação e hospedagem.", icon: Hotel },
  { slug: "industrias", label: "Indústrias", description: "Operação especializada para grandes volumes.", icon: Warehouse },
  { slug: "obras-e-grandes-geradores", label: "Obras e grandes geradores", description: "Atendimento pontual ou recorrente.", icon: HardHat },
  { slug: "outros", label: "Outros", description: "Solução personalizada para sua empresa.", icon: CircleEllipsis },
].map((item) => ({ ...item, href: `/comercial/setores/${item.slug}` }));

export default function Header({ onQuote }: { onQuote: () => void }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"residencial" | "comercial" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => { setOpenMenu(null); setMobileOpen(false); };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link href="/" onClick={close} className="flex items-center gap-3" aria-label="Ir para o início">
          <Image src={logo} alt="NCF Ambiental" className="h-12 w-auto" priority />
          <div className="hidden text-left sm:block"><strong className="block font-display text-lg leading-none text-wm-green">NCF Ambiental</strong><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">Nosso compromisso é com o futuro</span></div>
        </Link>

        <nav className="hidden items-stretch gap-1 lg:flex" aria-label="Navegação principal">
          <Link href="/" className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}>Início</Link>
          <div className="relative" onMouseEnter={() => setOpenMenu("residencial")} onMouseLeave={() => setOpenMenu(null)}>
            <MenuLabel label="Residencial" active={pathname.startsWith("/residencial")} open={openMenu === "residencial"} />
            {openMenu === "residencial" && <div className="dropdown-wrap w-[390px]"><div className="dropdown-card">{residentialItems.map((item) => <DropdownItem key={item.href} item={item} onClick={close} />)}</div></div>}
          </div>
          <div className="relative" onMouseEnter={() => setOpenMenu("comercial")} onMouseLeave={() => setOpenMenu(null)}>
            <MenuLabel label="Comercial" active={pathname.startsWith("/comercial")} open={openMenu === "comercial"} />
            {openMenu === "comercial" && <div className="dropdown-wrap w-[700px] -translate-x-[48%]"><div className="dropdown-card grid grid-cols-2 gap-6 p-5"><div><DropdownHeading label="Serviços corporativos" />{corporateServices.map((item) => <DropdownItem key={item.href} item={item} onClick={close} />)}</div><div><DropdownHeading label="Soluções por setor" gold />{companySectors.map((item) => <DropdownItem key={item.href} item={item} onClick={close} />)}</div></div></div>}
          </div>
          <Link href="/sobre" className={`nav-link ${pathname === "/sobre" ? "nav-link-active" : ""}`}>Sobre a NCF</Link>
        </nav>

        <button onClick={onQuote} className="hidden rounded-md bg-wm-gold px-5 py-3 text-sm font-extrabold text-wm-dark transition hover:shadow-md lg:block">Solicitar atendimento</button>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md border border-slate-200 p-2 text-wm-green lg:hidden" aria-label="Abrir menu">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && <div className="max-h-[calc(100vh-76px)] overflow-auto border-t border-slate-200 bg-white px-5 py-5 lg:hidden"><Link href="/" onClick={close} className="mobile-link">Início</Link><p className="mobile-heading">Residencial</p>{residentialItems.map((item) => <Link key={item.href} href={item.href} onClick={close} className="mobile-sub-link">{item.label}</Link>)}<p className="mobile-heading">Serviços comerciais</p>{corporateServices.map((item) => <Link key={item.href} href={item.href} onClick={close} className="mobile-sub-link">{item.label}</Link>)}<p className="mobile-heading">Comercial por setor</p>{companySectors.map((item) => <Link key={item.href} href={item.href} onClick={close} className="mobile-sub-link">{item.label}</Link>)}<Link href="/sobre" onClick={close} className="mobile-link">Sobre a NCF</Link><button onClick={() => { close(); onQuote(); }} className="mt-4 w-full rounded-md bg-wm-gold px-5 py-3 font-extrabold text-wm-dark">Solicitar atendimento</button></div>}
    </header>
  );
}

function MenuLabel({ label, active, open }: { label: string; active: boolean; open: boolean }) { return <span className={`nav-link flex items-center gap-1 ${active ? "nav-link-active" : ""}`}>{label}<ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} /></span>; }
function DropdownHeading({ label, gold = false }: { label: string; gold?: boolean }) { return <p className={`mb-2 rounded-md px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] ${gold ? "bg-[#fff8e5] text-[#947000]" : "bg-[#edf4eb] text-wm-green"}`}>{label}</p>; }
function DropdownItem({ item, onClick }: { item: { label: string; description: string; icon: typeof Home; href: string }; onClick: () => void }) { const Icon = item.icon; return <Link href={item.href} onClick={onClick} className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition hover:bg-[#f7f9f6]"><span className="rounded-md bg-[#edf4eb] p-2 text-wm-green"><Icon className="h-4 w-4" /></span><span><strong className="block text-sm text-wm-dark">{item.label}</strong><small className="mt-1 block text-xs leading-4 text-slate-500">{item.description}</small></span></Link>; }
