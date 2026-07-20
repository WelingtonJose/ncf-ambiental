"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import logo from "@/assets/images/logo.png";

export default function Header({ onQuote }: { onQuote: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex min-w-0 items-center gap-3"
          aria-label="Ir para o início"
        >
          <Image src={logo} alt="NCF Ambiental" className="h-11 w-auto sm:h-12" priority />
          <div className="hidden min-w-0 text-left sm:block">
            <strong className="block font-display text-lg leading-none text-wm-green">
              NCF Ambiental
            </strong>
            <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">
              Nosso compromisso é com o futuro
            </span>
          </div>
        </Link>

        <DesktopNavigation />

        <button
          type="button"
          onClick={onQuote}
          className="hidden rounded-md bg-wm-gold px-5 py-3 text-sm font-extrabold text-wm-dark transition hover:shadow-md xl:block"
        >
          Solicitar atendimento
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="rounded-md border border-slate-200 p-2 text-wm-green xl:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileNavigation open={mobileOpen} onNavigate={closeMobileMenu} onQuote={onQuote} />
    </header>
  );
}
