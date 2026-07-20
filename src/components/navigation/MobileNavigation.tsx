"use client";

import Link from "next/link";
import { companySectors, corporateServices, residentialItems } from "@/data/navigation";

type MobileNavigationProps = {
  open: boolean;
  onNavigate: () => void;
  onQuote: () => void;
};

export default function MobileNavigation({ open, onNavigate, onQuote }: MobileNavigationProps) {
  if (!open) return null;

  return (
    <nav
      className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-200 bg-white px-5 py-5 xl:hidden"
      aria-label="Navegação para dispositivos móveis"
    >
      <Link href="/" onClick={onNavigate} className="mobile-link">
        Início
      </Link>
      <NavigationGroup title="Residencial" items={residentialItems} onNavigate={onNavigate} />
      <NavigationGroup
        title="Serviços comerciais"
        items={corporateServices}
        onNavigate={onNavigate}
      />
      <NavigationGroup title="Comercial por setor" items={companySectors} onNavigate={onNavigate} />
      <Link href="/sobre" onClick={onNavigate} className="mobile-link">
        Sobre a NCF
      </Link>
      <button
        type="button"
        onClick={() => {
          onNavigate();
          onQuote();
        }}
        className="mt-4 w-full rounded-md bg-wm-gold px-5 py-3 font-extrabold text-wm-dark"
      >
        Solicitar atendimento
      </button>
    </nav>
  );
}

function NavigationGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: typeof residentialItems;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="mobile-heading">{title}</p>
      {items.map((item) => (
        <Link key={item.href} href={item.href} onClick={onNavigate} className="mobile-sub-link">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
