import commerces from "@/assets/images/setor-comercios.png";
import offices from "@/assets/images/setor-escritorios.png";
import restaurantsHotels from "@/assets/images/setor-restaurantes-hoteis.png";
import industries from "@/assets/images/setor-industrias.png";
import construction from "@/assets/images/setor-obras.png";
import others from "@/assets/images/setor-outros.png";

export const sectorImages = {
  "comercios-e-mercados": {
    src: commerces,
    alt: "Coleta comercial programada em comércio e supermercado",
  },
  "escritorios-e-empresas": {
    src: offices,
    alt: "Coleta organizada em escritório e centro empresarial",
  },
  "restaurantes-e-hoteis": {
    src: restaurantsHotels,
    alt: "Coleta programada na área de serviço de hotel e restaurante",
  },
  industrias: { src: industries, alt: "Operação de contêiner para resíduos industriais" },
  "obras-e-grandes-geradores": {
    src: construction,
    alt: "Posicionamento de contêiner em obra de grande porte",
  },
  outros: { src: others, alt: "Planejamento personalizado de coleta para empresa" },
} as const;
