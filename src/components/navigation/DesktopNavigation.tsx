"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  companySectors,
  corporateServices,
  residentialItems,
  type NavigationItem,
} from "@/data/navigation";

type OpenMenu = "residencial" | "comercial" | null;

export default function DesktopNavigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

  const closeMenu = () => setOpenMenu(null);
  const closeWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
  };

  return (
    <nav className="hidden items-stretch gap-1 xl:flex" aria-label="Navegação principal">
      <Link href="/" className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}>
        Início
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setOpenMenu("residencial")}
        onMouseLeave={closeMenu}
        onBlur={closeWhenFocusLeaves}
        onKeyDown={(event) => event.key === "Escape" && closeMenu()}
      >
        <MenuButton
          label="Residencial"
          active={pathname.startsWith("/residencial")}
          open={openMenu === "residencial"}
          onClick={() => setOpenMenu(openMenu === "residencial" ? null : "residencial")}
        />
        {openMenu === "residencial" && (
          <div className="dropdown-wrap w-[min(390px,calc(100vw-2rem))]">
            <div className="dropdown-card">
              {residentialItems.map((item) => (
                <DropdownItem key={item.href} item={item} onClick={closeMenu} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setOpenMenu("comercial")}
        onMouseLeave={closeMenu}
        onBlur={closeWhenFocusLeaves}
        onKeyDown={(event) => event.key === "Escape" && closeMenu()}
      >
        <MenuButton
          label="Comercial"
          active={pathname.startsWith("/comercial")}
          open={openMenu === "comercial"}
          onClick={() => setOpenMenu(openMenu === "comercial" ? null : "comercial")}
        />
        {openMenu === "comercial" && (
          <div className="dropdown-wrap w-[min(700px,calc(100vw-2rem))] -translate-x-[48%]">
            <div className="dropdown-card grid grid-cols-2 gap-6 p-5">
              <div>
                <DropdownHeading label="Serviços corporativos" />
                {corporateServices.map((item) => (
                  <DropdownItem key={item.href} item={item} onClick={closeMenu} />
                ))}
              </div>
              <div>
                <DropdownHeading label="Soluções por setor" gold />
                {companySectors.map((item) => (
                  <DropdownItem key={item.href} item={item} onClick={closeMenu} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Link href="/sobre" className={`nav-link ${pathname === "/sobre" ? "nav-link-active" : ""}`}>
        Sobre a NCF
      </Link>
    </nav>
  );
}

function MenuButton({
  label,
  active,
  open,
  onClick,
}: {
  label: string;
  active: boolean;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-haspopup="true"
      className={`nav-link flex items-center gap-1 ${active ? "nav-link-active" : ""}`}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

function DropdownHeading({ label, gold = false }: { label: string; gold?: boolean }) {
  return (
    <p
      className={`mb-2 rounded-md px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] ${gold ? "bg-[#fff8e5] text-[#947000]" : "bg-[#edf4eb] text-wm-green"}`}
    >
      {label}
    </p>
  );
}

function DropdownItem({ item, onClick }: { item: NavigationItem; onClick: () => void }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition hover:bg-[#f7f9f6] focus-visible:bg-[#f7f9f6] focus-visible:outline-none"
    >
      <span className="rounded-md bg-[#edf4eb] p-2 text-wm-green">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <strong className="block text-sm text-wm-dark">{item.label}</strong>
        <small className="mt-1 block text-xs leading-4 text-slate-500">{item.description}</small>
      </span>
    </Link>
  );
}
