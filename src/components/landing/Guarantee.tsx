import { ShieldCheck, GraduationCap, Headphones, Award, Lock } from 'lucide-react';

const guarantees = [
  { icon: Lock, text: 'Checkout 100% seguro' },
  { icon: Award, text: 'Certificação reconhecida pelo MAPA' },
  { icon: GraduationCap, text: 'Certificações DJI Academy oficiais' },
  { icon: Headphones, text: 'Suporte via WhatsApp durante e após o curso' },
  { icon: ShieldCheck, text: 'Trilha completa de formação profissional' },
];

export const Guarantee = () => (
  <section className="section-padding bg-secondary">
    <div className="container-narrow text-center">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Garantia de segurança</h2>
      <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
        Sua vaga é protegida por:
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {guarantees.map((g) => (
          <div key={g.text} className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-4">
            <g.icon className="w-5 h-5 text-primary shrink-0" />
            <span className="font-medium text-foreground text-sm text-left">{g.text}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground italic">
        Você está investindo em qualificação profissional, não em promessa.
      </p>
    </div>
  </section>
);
