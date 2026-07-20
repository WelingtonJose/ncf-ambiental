export const sectors = [
  {
    slug: "comercios-e-mercados",
    title: "Comércios e mercados",
    summary: "Coleta recorrente para lojas, supermercados e estabelecimentos com geração diária.",
    needs: [
      "Rotina de coleta compatível com o horário de funcionamento",
      "Recipientes adequados ao volume",
      "Plano para períodos de maior movimento",
    ],
  },
  {
    slug: "escritorios-e-empresas",
    title: "Escritórios e empresas",
    summary: "Solução organizada para sedes, centros empresariais e unidades administrativas.",
    needs: [
      "Coleta programada",
      "Pontos de descarte organizados",
      "Baixa interferência na rotina da equipe",
    ],
  },
  {
    slug: "restaurantes-e-hoteis",
    title: "Restaurantes e hotéis",
    summary:
      "Atendimento para operações de alimentação e hospedagem, com frequência compatível com a geração.",
    needs: [
      "Frequência ajustada à produção",
      "Orientação de acondicionamento",
      "Planejamento para fins de semana e eventos",
    ],
  },
  {
    slug: "industrias",
    title: "Indústrias",
    summary: "Coleta, equipamentos e logística para operações industriais e grandes volumes.",
    needs: [
      "Caracterização de cada tipo de resíduo",
      "Equipamento compatível com peso e volume",
      "Retiradas pontuais ou recorrentes",
    ],
  },
  {
    slug: "obras-e-grandes-geradores",
    title: "Obras e grandes geradores",
    summary:
      "Estrutura de coleta para demandas concentradas, operações temporárias e grandes geradores.",
    needs: [
      "Dimensionamento do contêiner",
      "Verificação das condições de acesso",
      "Cronograma de troca e retirada",
    ],
  },
  {
    slug: "outros",
    title: "Outros",
    summary:
      "Uma solução personalizada para empresas que não se enquadram nas categorias anteriores.",
    needs: [
      "Levantamento do perfil de geração",
      "Definição do serviço e equipamento",
      "Proposta personalizada",
    ],
  },
] as const;

export type SectorSlug = (typeof sectors)[number]["slug"];
export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}
