import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/images/logo.png";

export default function Footer() {
  return <footer className="border-t border-slate-200 bg-[#f7f9f6] text-slate-700">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-4 lg:px-10">
      <div>
        <Image src={logo} alt="NCF Ambiental" className="h-16 w-auto" />
        <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Soluções integradas para coleta, transporte, tratamento e disposição final de resíduos.</p>
      </div>
      <div>
        <h3 className="footer-title">Residencial</h3>
        <Link href="/residencial/coleta-residencial" className="footer-link">Coleta particular</Link>
        <Link href="/residencial/lixeiras" className="footer-link">Lixeiras disponíveis</Link>
        <Link href="/residencial/coleta-volumosos" className="footer-link">Coleta de volumosos</Link>
      </div>
      <div>
        <h3 className="footer-title">Comercial</h3>
        <Link href="/comercial/coleta-comercial" className="footer-link">Coleta comercial</Link>
        <Link href="/comercial/residuos-industriais" className="footer-link">Resíduos industriais</Link>
        <Link href="/comercial/conteineres-roll-on" className="footer-link">Contêineres Roll-On</Link>
        <Link href="/comercial/setores" className="footer-link">Soluções por setor</Link>
      </div>
      <div>
        <h3 className="footer-title">Fale com a NCF</h3>
        <p className="footer-contact"><MapPin /> Rondônia e Mato Grosso</p>
        <p className="footer-contact"><Phone /> (69) 3322-1669</p>
        <p className="footer-contact"><Mail /> comercial@ncfambiental.com.br</p>
      </div>
    </div>
    <div className="border-t border-slate-200 px-5 py-5 text-center text-xs text-slate-400">© 2026 NCF Ambiental. Todos os direitos reservados.</div>
  </footer>;
}
