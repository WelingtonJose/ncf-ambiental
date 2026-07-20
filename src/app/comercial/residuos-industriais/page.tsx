import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CheckList, Specs } from "@/components/ContentBlocks";
import rollOn from "@/assets/images/ROLL ON ROLL OFF.png";

export const metadata: Metadata = { title: "Resíduos industriais" };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Operação industrial"
        title="Coleta e transporte de resíduos industriais"
        description="Solução para grandes volumes com caminhão Roll-On/Roll-Off, equipamentos compatíveis e destinação definida após avaliação técnica do material."
        image={rollOn}
        imageAlt="Caminhão Roll-On/Roll-Off da NCF Ambiental"
      />
      <section className="section-shell py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Avaliação técnica</span>
            <h2 className="section-title">Cada resíduo exige uma especificação</h2>
            <p className="section-copy">
              Antes da coleta, identificamos o tipo de material, classificação, volume,
              acondicionamento e destino aplicável.
            </p>
            <CheckList
              items={[
                "Caracterização do resíduo",
                "Definição do equipamento",
                "Planejamento de retirada",
                "Transporte e destinação compatíveis",
              ]}
            />
          </div>
          <Specs
            items={[
              {
                title: "Informações necessárias",
                text: "Origem, composição, volume estimado e frequência de geração.",
              },
              {
                title: "Equipamento",
                text: "Contêiner e veículo definidos conforme peso, volume e acesso.",
              },
              {
                title: "Aceite",
                text: "Sujeito à avaliação técnica e às condições da unidade receptora.",
              },
              {
                title: "Orçamento",
                text: "Calculado conforme logística, equipamento e destinação.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
