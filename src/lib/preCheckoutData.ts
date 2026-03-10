export interface TurmaOption {
  id: string;
  label: string;
  dates: string;
}

export interface CourseData {
  slug: string;
  name: string;
  subtitle: string;
  installment: string;
  pixPrice: string;
  totalCredito: string;
  bullets: string[];
  chips: string[];
  accordion: { title: string; items: string[] }[];
  requiresTurma: boolean;
  turmas: TurmaOption[];
  links: {
    cartao: string;
    pix: string;
    byTurma?: Record<string, { cartao: string; pix: string }>;
  };
}

const turmas: TurmaOption[] = [
  { id: 'vilhena', label: 'Vilhena', dates: '24, 25 e 26 de abril' },
  { id: 'jatai', label: 'Jataí', dates: '01, 02 e 03 de maio' },
];

export const courses: Record<string, CourseData> = {
  essencial: {
    slug: 'essencial',
    name: 'FORMAÇÃO ONLINE ESSENCIAL (AO VIVO)',
    subtitle: 'DJI Academy + CAAR – Regularização Completa',
    installment: '222,34',
    pixPrice: '1.997,00',
    totalCredito: '2.668,08',
    bullets: [
      'DJI Academy – Agriculture',
      'CAAR (aplicação aeroagrícola remota)',
      'Aulas ao vivo 100% online',
      'Legislação + segurança operacional',
      'Dosagem e cálculo de vazão',
    ],
    chips: ['Regularizado', 'Certificado', 'Apto a atuar', 'Segurança operacional'],
    accordion: [
      {
        title: 'Certificações e Regularização',
        items: [
          'Certificação oficial DJI Academy – Agriculture',
          'CAAR – Curso para Aplicação Aeroagrícola Remota',
          'Reconhecimento pelo Ministério da Agricultura e Pecuária',
        ],
      },
      {
        title: 'Conteúdo técnico',
        items: [
          'Aulas 100% online e AO VIVO',
          'Interação direta com instrutores credenciados pela DJI',
          'Material didático atualizado',
          'Base completa de legislação aplicada',
          'Dosagem e cálculo de vazão',
          'Planejamento de aplicação',
          'Responsabilidade técnica',
          'Segurança operacional',
        ],
      },
    ],
    requiresTurma: false,
    turmas: [],
    links: {
      cartao: 'https://pay.easyflow.digital/checkouts/offer/6d8cdda9-f427-44f1-a3e9-154c647c59c6',
      pix: 'https://pay.easyflow.digital/checkouts/offer/014772ad-aeb4-4c33-a71d-8c5ce3a38e8a',
      byTurma: {
        jatai: {
          cartao: 'https://pay.easyflow.digital/checkouts/offer/b633de71-6171-42f2-8f49-f74d0bdf555e',
          pix: 'https://pay.easyflow.digital/checkouts/offer/961e6fc8-9dab-4804-8f81-409c64397634',
        },
      },
    },
  },
  profissional: {
    slug: 'profissional',
    name: 'FORMAÇÃO PROFISSIONAL CERTIFICADA',
    subtitle: 'Essencial + 3 Dias Intensivos Presenciais',
    installment: '465,09',
    pixPrice: '4.497,00',
    totalCredito: '5.581,08',
    bullets: [
      'Tudo do Essencial',
      '3 dias de prática em campo',
      'Operação real supervisionada',
      'Regulagem prática de vazão',
      'NR 31.7',
    ],
    chips: ['Regularizado', 'Prática real', 'Confiança para prestar serviço', 'Segurança'],
    accordion: [
      {
        title: 'Certificações e Regularização',
        items: [
          'Certificação oficial DJI Academy – Agriculture',
          'CAAR – Curso para Aplicação Aeroagrícola Remota',
          'Reconhecimento pelo Ministério da Agricultura e Pecuária',
        ],
      },
      {
        title: 'Conteúdo técnico',
        items: [
          'Aulas 100% online e AO VIVO',
          'Interação com instrutores credenciados pela DJI',
          'Legislação aplicada',
          'Dosagem e cálculo de vazão',
          'Planejamento de aplicação',
        ],
      },
      {
        title: 'Presencial',
        items: [
          '3 dias de prática intensiva em campo',
          'Operação real com drone de pulverização',
          'Regulagem prática de vazão',
          'Ajuste técnico de equipamento',
          'Planejamento de aplicação em cenário real',
          'Correção de erros operacionais',
          'NR 31.7 – Segurança no trabalho com defensivos',
          'Orientação prática de segurança operacional',
          'Networking com profissionais do setor',
        ],
      },
    ],
    requiresTurma: true,
    turmas,
    links: {
      cartao: 'https://pay.easyflow.digital/checkouts/offer/ea4e6104-6088-4419-8c4e-4774cc42d5f9',
      pix: 'https://pay.easyflow.digital/checkouts/offer/d73e9af1-58dd-4569-a09c-a574566ba691',
      byTurma: {
        vilhena: {
          cartao: 'https://pay.easyflow.digital/checkouts/offer/ea4e6104-6088-4419-8c4e-4774cc42d5f9',
          pix: 'https://pay.easyflow.digital/checkouts/offer/d73e9af1-58dd-4569-a09c-a574566ba691',
        },
        jatai: {
          cartao: 'https://pay.easyflow.digital/checkouts/offer/89124207-108d-4e91-a4e9-50b90486d229',
          pix: 'https://pay.easyflow.digital/checkouts/offer/de4ac845-4511-4269-bae7-078f6237e9bd',
        },
      },
    },
  },
  expert: {
    slug: 'expert',
    name: 'FORMAÇÃO EXPERT',
    subtitle: 'Profissional + Especialização em Mapeamento Agrícola',
    installment: '506,46',
    pixPrice: '4.897,00',
    totalCredito: '6.077,52',
    bullets: [
      'Tudo do Profissional',
      'Mapeamento RGB e multispectral',
      'DJI Terra (processamento)',
      'Ortomosaico + NDVI',
      'Relatórios técnicos',
    ],
    chips: ['Regularizado', 'Operador prático', 'Diagnóstico técnico', 'Pronto para aumentar ticket'],
    accordion: [
      {
        title: 'Certificações e Regularização',
        items: [
          'Certificação oficial DJI Academy – Agriculture',
          'CAAR – Curso para Aplicação Aeroagrícola Remota',
        ],
      },
      {
        title: 'Presencial',
        items: [
          '3 dias de prática intensiva em campo',
          'Operação real com drone de pulverização',
          'Regulagem prática de vazão',
          'Ajuste técnico de equipamento',
          'NR 31.7 – Segurança no trabalho com defensivos',
        ],
      },
      {
        title: 'Mapeamento',
        items: [
          'DJI Mini 3 – mapeamento RGB',
          'DJI Air 2S – mapeamento RGB avançado',
          'DJI Mavic 3 Multispectral – mapeamento multispectral profissional',
          'DJI Terra',
          'Geração de ortomosaico',
          'Mapas NDVI',
          'Interpretação técnica de dados',
          'Planejamento de pulverização de precisão',
          'Geração de relatórios técnicos',
        ],
      },
    ],
    requiresTurma: true,
    turmas,
    links: {
      cartao: 'https://pay.easyflow.digital/checkouts/offer/b6329587-cb71-4157-8035-16148879efd2',
      pix: 'https://pay.easyflow.digital/checkouts/offer/5ad96609-d892-48e0-8d71-6526fa386208',
      byTurma: {
        vilhena: {
          cartao: 'https://pay.easyflow.digital/checkouts/offer/b6329587-cb71-4157-8035-16148879efd2',
          pix: 'https://pay.easyflow.digital/checkouts/offer/5ad96609-d892-48e0-8d71-6526fa386208',
        },
        jatai: {
          cartao: 'https://pay.easyflow.digital/checkouts/offer/fbd995a2-e377-4d97-8e1c-8ef6a9a54419',
          pix: 'https://pay.easyflow.digital/checkouts/offer/364edbcc-defe-4a43-a2ec-881b2e770288',
        },
      },
    },
  },
};
