import { useState } from 'react';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AccordionSection {
  title: string;
  items: string[];
}

interface Tier {
  badge: string;
  level: string;
  liveTag?: string;
  subtitle: string;
  audience: string;
  installment: string;
  pix: string;
  total: string;
  pixSavings?: string;
  upsellNote?: string;
  bullets: string[];
  chips: string[];
  accordion: AccordionSection[];
  cta: string;
  highlight: boolean;
}

const tiers: Tier[] = [
  {
    badge: '🔰',
    level: 'FORMAÇÃO ONLINE ESSENCIAL',
    liveTag: 'AO VIVO',
    subtitle: 'DJI Academy + CAAR – Regularização Completa',
    audience: 'Para começar regularizado no mercado.',
    installment: '222,34',
    pix: '1.997,00',
    total: '2.668,08',
    pixSavings: '671,08',
    bullets: [
      'DJI Academy – Agriculture',
      'CAAR (aplicação aeroagrícola remota)',
      'Aulas ao vivo 100% online',
      'Legislação + segurança operacional',
      'Dosagem e cálculo de vazão',
    ],
    chips: ['Regularizado', 'Certificado', 'Pronto para iniciar', 'Segurança operacional'],
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
    cta: 'QUERO CONFIRMAR MINHA VAGA',
    highlight: false,
  },
  {
    badge: '🚀',
    level: 'FORMAÇÃO PROFISSIONAL CERTIFICADA',
    subtitle: 'Essencial + 3 Dias Intensivos Presenciais',
    audience: 'Para sair pronto pro campo com prática real.',
    installment: '500,41',
    pix: '4.497,00',
    total: '5.581,08',
    pixSavings: '1.084,08',
    bullets: [
      'Tudo do Essencial',
      '3 dias intensivos presenciais',
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
    cta: 'QUERO CONFIRMAR MINHA VAGA',
    highlight: true,
  },
  {
    badge: '👑',
    level: 'FORMAÇÃO EXPERT',
    subtitle: 'Profissional + Especialização em Mapeamento Agrícola',
    audience: 'Para virar especialista e aumentar ticket.',
    installment: '544,99',
    pix: '4.897,00',
    total: '6.539,88',
    pixSavings: '1.642,88',
    upsellNote: 'Apenas +R$ 400 vs Profissional',
    bullets: [
      'Tudo do Profissional',
      'Mapeamento RGB e multispectral',
      'DJI Terra (processamento)',
      'Ortofoto/ortomosaico + NDVI',
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
    cta: 'QUERO CONFIRMAR MINHA VAGA',
    highlight: false,
  },
];

const CardAccordion = ({ sections }: { sections: AccordionSection[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-border mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Ver conteúdo completo</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-[250ms] ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="pb-4 space-y-4">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">{section.title}</p>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingTiers = () => {
  const navigateToPreCheckout = (tier: Tier) => {
    const slugMap: Record<string, string> = {
      'FORMAÇÃO ONLINE ESSENCIAL': '/pre-checkout/essencial',
      'FORMAÇÃO PROFISSIONAL CERTIFICADA': '/pre-checkout/profissional',
      'FORMAÇÃO EXPERT': '/pre-checkout/expert',
    };
    const path = slugMap[tier.level] || '/pre-checkout/essencial';
    window.location.href = path;
  };

  return (
    <section id="formacao" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Escolha sua formação
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.level}
              className={`relative rounded-2xl border bg-card flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? 'border-primary shadow-[0_0_30px_hsl(142_76%_50%/0.2)]'
                  : 'border-border shadow-sm hover:shadow-md hover:border-primary/30'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-5 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap neon-glow">
                  Mais escolhido
                </div>
              )}

              <div className="p-7 lg:p-9 flex flex-col flex-1">
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{tier.badge}</span>
                    <h3 className="text-base font-display font-bold text-foreground uppercase tracking-wide leading-tight">
                      {tier.level}
                    </h3>
                    {tier.liveTag && (
                      <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {tier.liveTag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
                </div>

                <div className="mb-5 pb-5 border-b border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground">12x de</span>
                    <span className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      R$ {tier.installment}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-primary mt-2">
                    Pix à vista: R$ {tier.pix}
                  </p>
                  {tier.pixSavings && (
                    <p className="text-xs font-medium text-primary/80 mt-0.5">
                      Economize R$ {tier.pixSavings} no Pix
                    </p>
                  )}
                  {tier.upsellNote && (
                    <p className="text-xs font-semibold text-primary mt-2 bg-primary/10 rounded-full px-3 py-1 inline-block">
                      {tier.upsellNote}
                    </p>
                  )}
                </div>

                <p className="text-sm font-medium text-foreground mb-4">{tier.audience}</p>

                <ul className="space-y-2.5 mb-5">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <CardAccordion sections={tier.accordion} />

                <div className="mt-5 mb-6">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Resultado ao concluir
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.chips.map((chip) => (
                      <Badge
                        key={chip}
                        variant="secondary"
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => navigateToPreCheckout(tier)}
                  size="lg"
                  className={`w-full gap-2 min-h-[48px] h-auto py-3 font-bold text-xs tracking-wide mt-auto whitespace-normal text-center leading-tight ${
                    tier.highlight
                      ? 'btn-primary neon-glow'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
