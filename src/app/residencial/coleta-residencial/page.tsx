import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CheckList, Specs } from "@/components/ContentBlocks";
import privateCollection from "@/assets/images/coleta-particular-residencial.png";

export const metadata: Metadata = { title: "Coleta particular e locação de lixeiras" };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Serviço residencial sob orçamento"
        title="Coleta particular e locação de lixeiras"
        description="Para resíduos de poda, varrição, limpeza de quintais ou terrenos e pequenos volumes de construção civil que já estejam separados e prontos para retirada."
        image={privateCollection}
        imageAlt="Equipe coletando resíduos já separados em uma residência brasileira"
      />
      <section className="section-shell py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">O que a NCF realiza</span>
            <h2 className="section-title">Retirada do resíduo e fornecimento do recipiente</h2>
            <p className="section-copy">
              A NCF não executa poda, varrição, limpeza de quintais, limpeza de terrenos ou obras. O
              cliente entrega o material já gerado, separado e acessível para que nossa equipe faça
              a coleta e a destinação adequada.
            </p>
            <CheckList
              items={[
                "Coleta de galhos e resíduos de poda já separados",
                "Coleta de resíduos provenientes de varrição e limpeza",
                "Retirada de entulho de construção civil sob avaliação",
                "Locação de lixeiras conforme o volume e o tipo de material",
              ]}
            />
          </div>
          <Specs
            items={[
              {
                title: "Preparação",
                text: "O resíduo deve estar separado, organizado e disponível em local com acesso seguro.",
              },
              {
                title: "Locação",
                text: "A equipe indica a lixeira ou o recipiente adequado após avaliar material e volume.",
              },
              {
                title: "Agendamento",
                text: "A retirada ou entrega do recipiente é combinada após a aprovação do orçamento.",
              },
              {
                title: "Destinação",
                text: "Cada material coletado segue para a destinação compatível e autorizada.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
