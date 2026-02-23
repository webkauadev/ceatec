import { AlertTriangle } from 'lucide-react';

const reasons = [
  'As aulas online são ao vivo e com interação direta',
  'O presencial exige acompanhamento técnico individual',
  'Quando as vagas fecham, a turma é encerrada',
];

export const LimitedSpots = () => (
  <section className="section-padding bg-background">
    <div className="container-narrow text-center">
      <div className="inline-flex items-center gap-2 bg-destructive/15 text-destructive px-4 py-2 rounded-full mb-6 border border-destructive/20">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-bold text-sm">Vagas limitadas</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
        As turmas são limitadas porque:
      </h2>

      <ul className="space-y-4 max-w-lg mx-auto text-left">
        {reasons.map((r) => (
          <li key={r} className="flex items-start gap-3 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
