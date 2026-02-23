import { Users, GraduationCap, MapPin, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '+500', label: 'Pilotos formados' },
  { icon: GraduationCap, value: '40+', label: 'Turmas realizadas' },
  { icon: MapPin, value: '12', label: 'Estados atendidos' },
  { icon: Award, value: '+50mil', label: 'Hectares pulverizados pelos alunos' },
];

export const SocialProof = () => (
  <section className="py-12 bg-primary">
    <div className="container-wide">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-primary-foreground/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
