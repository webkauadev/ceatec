import { useState } from 'react';
import { ChevronDown, Award, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mainInstructor = {
  name: 'Eng. Claudevan Camargo',
  role: 'Instrutor / Coordenador Técnico',
  bio: 'Atuação prática no campo e foco em operação segura e regularizada. Mais de 5 anos formando pilotos de drones agrícolas.',
  chips: ['Instrutor credenciado DJI', 'Engenheiro Agrônomo', 'Eng. Segurança do Trabalho', 'CAAR', 'NR 31.7', 'DJI Academy'],
  allCredentials: [
    'Instrutor credenciado DJI Academy – Agriculture',
    'Engenheiro Agrônomo – CREA ativo',
    'Engenheiro de Segurança do Trabalho',
    'CAAR – Curso para Aplicação Aeroagrícola Remota',
    'NR 31.7 – Segurança no trabalho com defensivos agrícolas',
    'DJI Academy – Certificação oficial',
    'Experiência em operação de drones agrícolas DJI',
    'Planejamento de aplicação e mapeamento agrícola',
  ],
};

const teamAreas = [
  { title: 'Mapeamento Aéreo', desc: 'DJI Terra, RGB, NDVI e geoprocessamento' },
  { title: 'Operação de Campo', desc: 'Pulverização, regulagem de vazão e segurança' },
  { title: 'Legislação e Regularização', desc: 'ANAC, MAPA e responsabilidade técnica' },
];

const CredentialAccordion = ({ credentials }: { credentials: string[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-border mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Ver todas as certificações</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-[250ms] ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <ul className="pb-3 space-y-1.5">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <Award className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Instructors = () => (
  <section id="instrutores" className="section-padding bg-background">
    <div className="container-wide">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Instrutores e Credenciais
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Você aprende com profissionais que atuam no mercado real.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Main instructor — spans 3 cols */}
        <div className="lg:col-span-3 rounded-2xl border border-primary/30 bg-card p-8 flex flex-col transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1">
              Coordenador Técnico
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl text-muted-foreground font-bold select-none shrink-0">
              CC
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                {mainInstructor.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">{mainInstructor.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{mainInstructor.bio}</p>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5 mb-1">
            {mainInstructor.chips.map((chip) => (
              <Badge
                key={chip}
                variant="secondary"
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                  chip.toLowerCase().includes('dji') ? 'bg-primary/10 text-primary border border-primary/20' : ''
                }`}
              >
                {chip}
              </Badge>
            ))}
          </div>

          <div className="mt-auto">
            <CredentialAccordion credentials={mainInstructor.allCredentials} />
          </div>
        </div>

        {/* Team areas — spans 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-foreground">Equipe técnica especializada</h3>
              <p className="text-xs text-muted-foreground">Profissionais atuantes no agro</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {teamAreas.map((area) => (
              <div key={area.title} className="bg-muted/50 rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{area.title}</p>
                <p className="text-xs text-muted-foreground">{area.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6 italic">
            Instrutores adicionais confirmados conforme a turma e especialidade.
          </p>
        </div>
      </div>
    </div>
  </section>
);
