import { ArrowRight, CalendarDays } from 'lucide-react';
import logoDji from '@/assets/logo-dji-agriculture.png';
import logoMapa from '@/assets/logo-mapa.png';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-drone-spray.jpg';

export const Hero = () => {
  const scrollToPlans = () => {
    document.querySelector('#formacao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Drone agrícola em operação sobre lavoura"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      </div>

      <div className="container-wide relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/40 rounded-full px-4 py-1.5 mb-6 animate-slide-up">
              <img src={logoDji} alt="DJI" className="h-3 w-auto brightness-0 invert" />
              <span className="text-xs font-semibold text-primary">Centro DJI Academy Agriculture</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              Formação em <span className="text-neon">Drone</span>
              <br />
              <span className="text-neon">Agrícola</span> CEATEC
            </h1>

            <p className="text-lg text-white/75 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Saia regularizado, certificado pela DJI e pronto para faturar com drones agrícolas.
            </p>

            {/* Turmas */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold text-sm tracking-wide uppercase">Próximas turmas presenciais</span>
              </div>
              <div className="space-y-1.5 text-white/80 text-sm">
                <p><span className="font-bold text-white">Vilhena:</span> 24, 25 e 26 de abril</p>
                <p><span className="font-bold text-white">Jataí:</span> 01, 02 e 03 de maio</p>
              </div>
            </div>

            {/* CTA */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button
                onClick={scrollToPlans}
                size="lg"
                className="btn-primary neon-glow gap-2 text-base h-14 px-10"
              >
                Quero confirmar minha vaga
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-white/40 mt-3">
                Pagamento em até 12x sem juros no cartão. Pix disponível à vista.
              </p>
            </div>

            {/* Micro proof */}
            <div className="flex items-center gap-4 mt-6 animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <span className="text-xs text-white/40">+200 pilotos formados</span>
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              <img src={logoMapa} alt="MAPA" className="h-16" />
              <span className="text-xs text-white/40">Reconhecido pelo MAPA</span>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};
