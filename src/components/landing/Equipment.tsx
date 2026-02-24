import { Badge } from '@/components/ui/badge';

const equipSpray = 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80&auto=format&fit=crop';
const equipController = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80&auto=format&fit=crop';
const equipSafety = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop';
const equipRgb = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop';
const equipNdvi = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80&auto=format&fit=crop';
const equipTerra = 'https://images.unsplash.com/photo-1586771107445-b3e7eb4f1b67?w=800&q=80&auto=format&fit=crop';

const items = [
  { image: equipSpray, title: 'Pulverização com drone agrícola', chips: ['Prática supervisionada', 'Em campo'] },
  { image: equipController, title: 'Controle e telemetria', chips: ['Operação real', 'Dados de voo'] },
  { image: equipSafety, title: 'Segurança operacional', chips: ['NR 31.7', 'EPIs'] },
  { image: equipRgb, title: 'Mapeamento RGB', chips: ['Ortomosaico', 'DJI Mini 3 / Air 2S'] },
  { image: equipNdvi, title: 'Mapeamento multispectral', chips: ['NDVI', 'Mavic 3 Multispectral'] },
  { image: equipTerra, title: 'Processamento no DJI Terra', chips: ['DJI Terra', 'Relatórios técnicos'] },
];

export const Equipment = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Equipamentos e prática em campo
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Você aprende com equipamentos reais e cenário real de operação.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.title}
            className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(142_76%_50%/0.1)]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-display font-bold text-foreground mb-2 uppercase tracking-wide">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <Badge
                    key={chip}
                    variant="secondary"
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
