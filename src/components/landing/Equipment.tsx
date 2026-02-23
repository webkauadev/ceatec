import { Badge } from '@/components/ui/badge';
import equipSpray from '@/assets/equip-spray-drone.jpg';
import equipController from '@/assets/equip-controller.jpg';
import equipSafety from '@/assets/equip-safety.jpg';
import equipRgb from '@/assets/equip-rgb-map.jpg';
import equipNdvi from '@/assets/equip-ndvi.jpg';
import equipTerra from '@/assets/equip-dji-terra.jpg';

const items = [
  {
    image: equipSpray,
    title: 'Pulverização com drone agrícola',
    chips: ['Prática supervisionada', 'Em campo'],
  },
  {
    image: equipController,
    title: 'Controle e telemetria',
    chips: ['Operação real', 'Dados de voo'],
  },
  {
    image: equipSafety,
    title: 'Segurança operacional',
    chips: ['NR 31.7', 'EPIs'],
  },
  {
    image: equipRgb,
    title: 'Mapeamento RGB',
    chips: ['Ortomosaico', 'DJI Mini 3 / Air 2S'],
  },
  {
    image: equipNdvi,
    title: 'Mapeamento multispectral',
    chips: ['NDVI', 'Mavic 3 Multispectral'],
  },
  {
    image: equipTerra,
    title: 'Processamento no DJI Terra',
    chips: ['DJI Terra', 'Relatórios técnicos'],
  },
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
            className="group rounded-xl border border-border bg-background overflow-hidden transition-shadow duration-300 hover:shadow-md"
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
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
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
