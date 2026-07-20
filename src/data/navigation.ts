import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleEllipsis,
  Factory,
  HardHat,
  Home,
  Hotel,
  Recycle,
  ShoppingCart,
  Sofa,
  Truck,
  Warehouse,
} from "lucide-react";
import { sectors, type SectorSlug } from "@/lib/sectors";

export type NavigationItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  footerLabel?: string;
};

export const residentialItems: NavigationItem[] = [
  {
    label: "Coleta particular",
    description: "Retirada de resíduos e locação de lixeiras.",
    icon: Home,
    href: "/residencial/coleta-residencial",
  },
  {
    label: "Opções de lixeiras",
    description: "Modelos de 240, 500 e 1.000 litros.",
    icon: Recycle,
    href: "/residencial/lixeiras",
    footerLabel: "Lixeiras disponíveis",
  },
  {
    label: "Coleta de volumosos",
    description: "Sofás, geladeiras, fogões e armários.",
    icon: Sofa,
    href: "/residencial/coleta-volumosos",
  },
];

export const corporateServices: NavigationItem[] = [
  {
    label: "Coleta comercial",
    description: "Compactador e frequência programada.",
    icon: Building2,
    href: "/comercial/coleta-comercial",
  },
  {
    label: "Resíduos industriais",
    description: "Transporte para grandes volumes.",
    icon: Factory,
    href: "/comercial/residuos-industriais",
  },
  {
    label: "Contêineres Roll-On",
    description: "Opções de 31 m³ e 39 m³.",
    icon: Truck,
    href: "/comercial/conteineres-roll-on",
  },
];

const sectorNavigationDetails: Record<SectorSlug, Pick<NavigationItem, "description" | "icon">> = {
  "comercios-e-mercados": {
    description: "Coleta recorrente para estabelecimentos.",
    icon: ShoppingCart,
  },
  "escritorios-e-empresas": {
    description: "Sedes e centros empresariais.",
    icon: Building2,
  },
  "restaurantes-e-hoteis": {
    description: "Alimentação e hospedagem.",
    icon: Hotel,
  },
  industrias: {
    description: "Operação especializada para grandes volumes.",
    icon: Warehouse,
  },
  "obras-e-grandes-geradores": {
    description: "Atendimento pontual ou recorrente.",
    icon: HardHat,
  },
  outros: {
    description: "Solução personalizada para sua empresa.",
    icon: CircleEllipsis,
  },
};

export const companySectors: NavigationItem[] = sectors.map((sector) => ({
  label: sector.title,
  href: `/comercial/setores/${sector.slug}`,
  ...sectorNavigationDetails[sector.slug],
}));
