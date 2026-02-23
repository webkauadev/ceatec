import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  const scrollToPlans = () => document.querySelector('#formacao')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Você quer apenas regularizar, trabalhar profissionalmente ou se tornar especialista valorizado?
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Escolha seu nível e confirme sua vaga.
        </p>
        <Button onClick={scrollToPlans} size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 h-14 px-8">
          Quero confirmar minha vaga <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
