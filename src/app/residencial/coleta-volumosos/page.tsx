import type { Metadata } from "next";
import { Refrigerator, Sofa } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CheckList, Specs } from "@/components/ContentBlocks";
import bulkyWastePage from "@/assets/images/coleta-volumosos-pagina.png";

export const metadata: Metadata = { title: "Coleta de volumosos" };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Serviço sob orçamento"
        title="Coleta de resíduos volumosos"
        description="Retirada planejada de sofás, geladeiras, fogões, armários e outros itens grandes que não devem ser colocados na coleta residencial comum."
        image={bulkyWastePage}
        imageAlt="Equipe realizando a coleta programada de sofá, geladeira, colchão e armário"
      />
      <section className="section-shell py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Itens atendidos</span>
            <h2 className="section-title">Conte o que precisa retirar</h2>
            <p className="section-copy">
              A equipe avalia quantidade, dimensões, local de retirada e necessidade de mão de obra
              para preparar o orçamento.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#edf4eb] p-5">
                <Sofa className="text-wm-green" />
                <strong className="mt-3 block text-wm-dark">Móveis</strong>
                <p className="mt-1 text-sm text-slate-600">Sofás, armários, mesas e colchões.</p>
              </div>
              <div className="rounded-xl bg-[#edf4eb] p-5">
                <Refrigerator className="text-wm-green" />
                <strong className="mt-3 block text-wm-dark">Eletrodomésticos</strong>
                <p className="mt-1 text-sm text-slate-600">Geladeiras, fogões e itens similares.</p>
              </div>
            </div>
          </div>
          <div>
            <Specs
              items={[
                {
                  title: "Agendamento",
                  text: "A retirada é combinada após a aprovação do orçamento.",
                },
                { title: "Avaliação", text: "Informe fotos, quantidade, dimensões e endereço." },
                {
                  title: "Acesso",
                  text: "Condições de acesso e necessidade de desmontagem são avaliadas.",
                },
                { title: "Destinação", text: "Os materiais seguem para a destinação adequada." },
              ]}
            />
            <CheckList
              items={[
                "Não descarte o item na calçada sem agendamento",
                "Separe os itens que serão retirados",
                "Informe escadas, elevadores e restrições de acesso",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
