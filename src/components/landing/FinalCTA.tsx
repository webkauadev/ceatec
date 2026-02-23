import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  const scrollToPlans = () => document.querySelector('#formacao')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section-padding bg-gradient-to-br from-primary/20 via-primary/10 to-background border-y border-primary/20">
      <div className="container-narrow text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Você quer apenas regularizar, trabalhar profissionalmente ou se tornar especialista valorizado?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Escolha seu nível e confirme sua vaga.
        </p>
        <Button onClick={scrollToPlans} size="lg" className="btn-primary neon-glow gap-2 h-14 px-8">
          Quero confirmar minha vaga <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
