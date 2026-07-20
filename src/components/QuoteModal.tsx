"use client";

import { type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  if (!isOpen) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Olá! Gostaria de solicitar um orçamento com a NCF Ambiental.",
      "",
      `Nome/empresa: ${form.get("name")}`,
      `Telefone: ${form.get("phone")}`,
      `Cidade: ${form.get("city")}`,
      `Serviço: ${form.get("service")}`,
      `Detalhes: ${form.get("details") || "Não informado"}`,
    ].join("\n");

    window.location.href = `https://wa.me/556933221669?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041b10]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar atendimento"
    >
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-600"
          aria-label="Fechar"
        >
          <X />
        </button>
        <>
          <span className="eyebrow">Atendimento NCF</span>
          <h2 className="mt-3 pr-10 font-display text-3xl font-black text-wm-dark">
            Conte o que você precisa coletar
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Informe os dados básicos para avaliarmos o serviço, equipamento e frequência adequados.
          </p>
          <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="form-field sm:col-span-2">
              Nome ou empresa
              <input required name="name" placeholder="Como podemos chamar você?" />
            </label>
            <label className="form-field">
              Telefone
              <input required name="phone" placeholder="(00) 00000-0000" />
            </label>
            <label className="form-field">
              Cidade
              <input required name="city" placeholder="Sua cidade" />
            </label>
            <label className="form-field sm:col-span-2">
              Tipo de serviço
              <select required name="service" defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                <option>Coleta particular residencial</option>
                <option>Locação de lixeira</option>
                <option>Coleta de poda já separada</option>
                <option>Coleta de entulho de construção civil</option>
                <option>Coleta de volumosos</option>
                <option>Coleta comercial</option>
                <option>Resíduos industriais</option>
                <option>Contêiner Roll-On 31 m³</option>
                <option>Contêiner Roll-On 39 m³</option>
                <option>Disposição final de resíduos</option>
              </select>
            </label>
            <label className="form-field sm:col-span-2">
              Detalhes
              <textarea
                name="details"
                rows={4}
                placeholder="Tipo de resíduo, volume estimado e frequência desejada"
              />
            </label>
            <p className="sm:col-span-2 text-xs leading-5 text-slate-500">
              Ao continuar, você será direcionado ao WhatsApp da NCF Ambiental com os dados
              preenchidos.
            </p>
            <button
              type="submit"
              className="sm:col-span-2 flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 font-extrabold text-[#073b1b] hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Continuar no WhatsApp
            </button>
          </form>
        </>
      </div>
    </div>
  );
}
