const mappingOrtho = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop';
const mappingNdvi = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80&auto=format&fit=crop';

export const MappingShowcase = () => (
  <section className="section-padding bg-secondary">
    <div className="container-wide">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-md">
          <p className="text-xs font-bold text-neon uppercase tracking-widest mb-3">
            Formação Expert
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
            Mapeamento agrícola com drones
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Você aprende a gerar, processar e interpretar mapas para apoiar decisões e pulverização de precisão.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors">
            <img src={mappingOrtho} alt="Exemplo de ortomosaico gerado com drone" loading="lazy" className="w-full h-full object-cover aspect-square" />
            <div className="p-3 bg-card">
              <p className="text-xs font-semibold text-foreground">Ortomosaico</p>
              <p className="text-[11px] text-muted-foreground">Imagem aérea de alta resolução</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors">
            <img src={mappingNdvi} alt="Exemplo de mapa NDVI de saúde da vegetação" loading="lazy" className="w-full h-full object-cover aspect-square" />
            <div className="p-3 bg-card">
              <p className="text-xs font-semibold text-foreground">Mapa NDVI</p>
              <p className="text-[11px] text-muted-foreground">Índice de saúde da vegetação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
