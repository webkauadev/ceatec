import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, BookOpen, Users, ArrowRight } from 'lucide-react';
import { trackPurchase, trackEvent, captureUTMParams } from '@/lib/tracking';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
import logoCeatec from '@/assets/logo-ceatec.png';

interface OnboardingConfig {
  courseName: string;
  turmaLabel?: string;
  groupLink: string;
}

const onboardingPages: Record<string, OnboardingConfig> = {
  essencial: {
    courseName: 'Formação Online Essencial (ao vivo)',
    groupLink: 'https://chat.whatsapp.com/Ks6aytFHM89DEFgKTU3ned',
  },
  'profissional-vilhena': {
    courseName: 'Formação Profissional Certificada (Formação Completa)',
    turmaLabel: 'Vilhena — 24, 25 e 26 de abril',
    groupLink: 'https://chat.whatsapp.com/FBOsXgWxcXa0QektfhVlw3',
  },
  'profissional-jatai': {
    courseName: 'Formação Profissional Certificada (Formação Completa)',
    turmaLabel: 'Jataí — 01, 02 e 03 de maio',
    groupLink: 'https://chat.whatsapp.com/FK3pBBvi3oxDzUMtNnQnim',
  },
  'expert-vilhena': {
    courseName: 'Formação Expert (Mapeamento)',
    turmaLabel: 'Vilhena — 24, 25 e 26 de abril',
    groupLink: 'https://chat.whatsapp.com/Bb4F8Oyo4IEHKtjsLFKVUZ',
  },
  'expert-jatai': {
    courseName: 'Formação Expert (Mapeamento)',
    turmaLabel: 'Jataí — 01, 02 e 03 de maio',
    groupLink: 'https://chat.whatsapp.com/Kxwweq1wIMP8dSUqJkNhot',
  },
};

const Onboarding = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? onboardingPages[slug] : undefined;

  const getSupportUrl = () => {
    const curso = config?.courseName || 'Não identificado';
    const turma = config?.turmaLabel?.split(' — ')[0] || 'N/A';
    const msg = `Olá! Minha compra foi aprovada e preciso de ajuda no onboarding.\n\nCurso: ${curso}\nTurma: ${turma}\nPágina: ${window.location.href}`;
    return `https://wa.me/556993704145?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    trackPurchase({
      content_ids: [slug || 'unknown'],
      content_name: config?.courseName || 'Unknown Course',
      currency: 'BRL',
    });

    // Google Ads conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ads_conversion_purchase', {
        content_name: config?.courseName || 'Unknown Course',
        slug: slug || 'unknown',
      });
    }
  }, [slug, config]);

  // Error state
  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <img src={logoCeatec} alt="CEATEC" className="h-20 mx-auto brightness-0 invert" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Página não encontrada</h1>
            <p className="text-muted-foreground">Não foi possível identificar o curso. Entre em contato com o suporte.</p>
          </div>
          <Button asChild className="w-full" size="lg">
            <a href={getSupportUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com suporte
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const handleJoinGroup = () => {
    trackEvent('join_whatsapp_group', { slug, ...captureUTMParams() });
  };

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-12 space-y-8">
          <div className="text-center">
            <img src={logoCeatec} alt="CEATEC" className="h-20 mx-auto mb-8 brightness-0 invert" />
          </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Inscrição confirmada</h1>
            <p className="text-muted-foreground text-lg">
              Agora entre no grupo do WhatsApp para receber avisos, materiais e próximos passos.
            </p>
          </div>

          {/* Course & turma info */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Seu curso</p>
                <p className="font-semibold text-foreground">{config.courseName}</p>
              </div>
            </div>
            {config.turmaLabel && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Sua turma</p>
                  <p className="font-semibold text-foreground">{config.turmaLabel}</p>
                </div>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Próximos passos</p>
            <ol className="space-y-2">
              {[
                'Clique em "Entrar no grupo do WhatsApp"',
                'Leia a mensagem fixada no topo do grupo',
                'Envie "OK" para confirmar sua presença',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <Button asChild className="w-full h-14 text-base font-bold" size="lg" onClick={handleJoinGroup}>
              <a href={config.groupLink} target="_blank" rel="noopener noreferrer">
                Entrar no grupo do WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <a href={getSupportUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com suporte no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
