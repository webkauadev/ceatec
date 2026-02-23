import { Award, Leaf, HardHat, Wrench, Mountain } from 'lucide-react';

const credentials = [
  { icon: Award, title: 'Instrutores credenciados DJI', desc: 'Certificação oficial DJI Academy' },
  { icon: Leaf, title: 'Engenheiros Agrônomos', desc: 'Orientação técnica agronômica' },
  { icon: HardHat, title: 'Engenheiro de Segurança do Trabalho', desc: 'NR 31.7 e segurança operacional' },
  { icon: Wrench, title: 'Especialistas em manutenção e operação', desc: 'Know-how prático de equipamento' },
  { icon: Mountain, title: 'Experiência real de campo', desc: 'Você aprende com quem vive o mercado' },
];

export const Trust = () => (
  <section id="credenciais" className="section-padding bg-secondary">
    <div className="container-narrow">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Por que confiar nesta formação
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((c) => (
          <div key={c.title} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="p-2 rounded-lg bg-primary/10">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
