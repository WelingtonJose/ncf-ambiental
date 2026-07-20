import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { corporateServices, residentialItems } from "@/data/navigation";
import logo from "@/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f7f9f6] text-slate-700">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-4 lg:px-10">
        <div>
          <Image src={logo} alt="NCF Ambiental" className="h-16 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            Soluções integradas para coleta, transporte, tratamento e disposição final de resíduos.
          </p>
        </div>
        <div>
          <h3 className="footer-title">Residencial</h3>
          {residentialItems.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.footerLabel ?? item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="footer-title">Comercial</h3>
          {corporateServices.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
          <Link href="/comercial/setores" className="footer-link">
            Soluções por setor
          </Link>
        </div>
        <div>
          <h3 className="footer-title">Fale com a NCF</h3>
          <p className="footer-contact">
            <MapPin /> Rondônia e Mato Grosso
          </p>
          <p className="footer-contact">
            <Phone /> (69) 3322-1669
          </p>
          <p className="footer-contact">
            <Mail /> comercial@ncfambiental.com.br
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-5 text-center text-xs text-slate-400">
        © 2026 NCF Ambiental. Todos os direitos reservados.
      </div>
    </footer>
  );
}
