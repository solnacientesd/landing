export const WHATSAPP_NUMBER = "595981126769";
export const WHATSAPP_DISPLAY = "0981 126 769";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero ver una demo del Showroom Digital aplicada a uno de mis vehículos.",
)}`;

export const NAV_LINKS = [
  { id: "inicio", num: "00", label: "Inicio" },
  { id: "problema", num: "01", label: "El problema" },
  { id: "solucion", num: "02", label: "La solución" },
  { id: "resultado", num: "03", label: "Resultados" },
] as const;
