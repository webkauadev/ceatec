// WhatsApp integration utilities

const WHATSAPP_NUMBER = '556993704145';

export interface LeadData {
  nome: string;
  whatsapp: string;
  cidade: string;
  estado: string;
  tipo_de_uso: string;
  hectares: number;
  ja_possui_drone: string;
  prazo_inicio: string;
  mensagem?: string;
}

export const generateWhatsAppMessage = (data: LeadData): string => {
  const message = `Olá! Vim pela CEATEC e quero indicação do drone ideal.
Uso: ${data.tipo_de_uso}
Área: ${data.hectares} ha
Cidade/UF: ${data.cidade}-${data.estado}
Prazo: ${data.prazo_inicio}
${data.mensagem ? `\nObservação: ${data.mensagem}` : ''}`;

  return encodeURIComponent(message);
};

export const getWhatsAppURL = (data?: LeadData): string => {
  if (data) {
    const message = generateWhatsAppMessage(data);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pela CEATEC e gostaria de saber mais sobre drones agrícolas.')}`;
};

export const openWhatsApp = (data?: LeadData): void => {
  const url = getWhatsAppURL(data);
  window.open(url, '_blank');
};
