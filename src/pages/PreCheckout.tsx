import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChevronDown, ArrowRight, ShieldCheck, MessageCircle, Clock, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { courses, type CourseData } from '@/lib/preCheckoutData';
import { trackViewContent, trackInitiateCheckout, trackContact, trackEvent, captureUTMParams } from '@/lib/tracking';
import logoCeatec from '@/assets/logo-ceatec.png';

const WHATSAPP_NUMBER = '556993704145';

const preCheckoutFaqs = [
  { q: 'Preciso ter drone?', a: 'Não. Você pode iniciar sua formação mesmo sem drone. No presencial, fornecemos os equipamentos para prática.' },
  { q: 'O curso é ao vivo?', a: 'Sim! As aulas online são 100% ao vivo com interação direta com os instrutores.' },
  { q: 'Como funciona o presencial?', a: '3 dias de prática intensiva em campo, com equipamentos reais e instrutores certificados.' },
  { q: 'Posso pagar com Pix ou cartão?', a: 'Sim! Aceitamos Pix à vista ou até 12x sem juros no cartão de crédito.' },
  { q: 'Como recebo a confirmação?', a: 'Após o pagamento, você receberá um e-mail com os acessos e instruções por WhatsApp.' },
];

const DetailAccordion = ({ sections }: { sections: { title: string; items: string[] }[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Ver detalhes</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-[250ms] ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="pb-4 space-y-4">
            {sections.map((s) => (
              <div key={s.title}>
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">{s.title}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructorCard = () => {
  const [open, setOpen] = useState(false);
  const chips = ['Instrutor credenciado DJI', 'Engenheiro Agrônomo', 'Eng. Segurança do Trabalho', 'CAAR', 'NR 31.7', 'DJI Academy'];
  const allCreds = [
    'Instrutor credenciado DJI',
    'Engenheiro Agrônomo – CREA ativo',
    'Engenheiro de Segurança do Trabalho',
    'CAAR – Aplicação Aeroagrícola Remota',
    'NR 31.7 – Segurança com defensivos',
    'DJI Academy – Agriculture',
    'Especialista em mapeamento multispectral',
    'Atuação em campo há mais de 5 anos',
  ];

  return (
    <div className="border border-border rounded-xl p-6 bg-background">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0">
          CC
        </div>
        <div>
          <p className="font-bold text-foreground text-sm">Eng. Claudevan Camargo</p>
          <p className="text-xs text-muted-foreground">Instrutor / Coordenador Técnico</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {chips.map((c) => (
          <Badge key={c} variant="secondary" className={`text-[10px] px-2 py-0.5 rounded-full ${c.toLowerCase().includes('dji') ? 'bg-primary/10 text-primary' : ''}`}>
            {c}
          </Badge>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
        Ver todas as credenciais
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5">
          {allCreds.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {preCheckoutFaqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-lg">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-sm font-medium text-foreground"
          >
            {faq.q}
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`grid transition-all duration-200 ${openIdx === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PreCheckout = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = courses[slug || ''] as CourseData | undefined;

  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix'>('cartao');
  const [turma, setTurma] = useState<string>('');
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    if (!course) return;
    const totalCredito = parseFloat(course.totalCredito.replace(/\./g, '').replace(',', '.'));
    trackViewContent({
      content_ids: [course.slug],
      content_name: course.name,
      content_type: 'product',
      value: totalCredito,
      currency: 'BRL',
    });
  }, [course]);

  // Abandonment recovery
  useEffect(() => {
    const timer = setTimeout(() => setShowRecovery(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-4">Curso não encontrado</p>
          <Button onClick={() => navigate('/')}>Voltar à página inicial</Button>
        </div>
      </div>
    );
  }

  const canProceed = !course.requiresTurma || turma !== '';

  const buildWhatsAppUrl = () => {
    const turmaLabel = course.turmas.find((t) => t.id === turma)?.label || '';
    const msg = `Olá! Quero tirar uma dúvida e/ou confirmar minha inscrição.\n\nCurso: ${course.name}\nPagamento: ${paymentMethod === 'cartao' ? 'Cartão' : 'Pix'}\n${course.requiresTurma ? `Turma: ${turmaLabel}\n` : ''}Link da página: ${window.location.href}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleCheckout = () => {
    const totalCredito = parseFloat(course.totalCredito.replace(/\./g, '').replace(',', '.'));
    trackInitiateCheckout({
      content_ids: [course.slug],
      content_name: course.name,
      value: totalCredito,
      currency: 'BRL',
      num_items: 1,
    });

    const utmParams = captureUTMParams();
    const turmaLinks = turma && course.links.byTurma?.[turma];
    const baseUrl = turmaLinks ? turmaLinks[paymentMethod] : course.links[paymentMethod];
    const params = new URLSearchParams(utmParams);
    if (turma) params.set('turma', turma);
    const separator = baseUrl.includes('?') ? '&' : '?';
    const finalUrl = `${baseUrl}${params.toString() ? separator + params.toString() : ''}`;
    window.location.href = finalUrl;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
          <img src={logoCeatec} alt="CEATEC" className="h-16 brightness-0 invert" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Você selecionou: {course.name}
          </h1>
          <p className="text-muted-foreground">{course.subtitle}</p>
          <p className="text-sm text-muted-foreground">Escolha a forma de pagamento para seguir para o checkout seguro.</p>
        </div>

        {/* Main Card */}
        <div className="bg-background border border-border rounded-2xl p-6 md:p-8 space-y-6">
          {/* Turma Selector */}
          {course.requiresTurma && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-foreground">Escolha sua turma</p>
              <RadioGroup value={turma} onValueChange={(v) => {
                setTurma(v);
                trackEvent('select_turma', { turma: v, course: course.slug });
              }}>
                {course.turmas.map((t) => (
                  <div key={t.id} className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${turma === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'}`}>
                    <RadioGroupItem value={t.id} id={`turma-${t.id}`} />
                    <Label htmlFor={`turma-${t.id}`} className="cursor-pointer flex-1">
                      <span className="font-semibold text-foreground">{t.label}</span>
                      <span className="text-sm text-muted-foreground ml-2">| {t.dates}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {!turma && <p className="text-xs text-destructive">Selecione uma turma para continuar.</p>}
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-foreground">Forma de pagamento</p>
            <div className="grid grid-cols-2 gap-3">
              {(['cartao', 'pix'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setPaymentMethod(method);
                    trackEvent('select_payment_method', { method, course: course.slug });
                  }}
                  className={`border rounded-xl p-4 text-center transition-all duration-200 ${
                    paymentMethod === method
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <p className="font-bold text-foreground text-sm">
                    {method === 'cartao' ? 'Cartão' : 'Pix'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {method === 'cartao' ? 'até 12x no cartão' : 'à vista'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-muted/50 rounded-xl p-5 text-center space-y-1">
            {paymentMethod === 'cartao' ? (
              <>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">12x de</span>
                  <span className="text-3xl md:text-4xl font-bold text-foreground">R$ {course.installment}</span>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">Pix à vista</p>
                <span className="text-3xl md:text-4xl font-bold text-primary">R$ {course.pixPrice}</span>
              </div>
            )}
          </div>

          {/* Bullets */}
          <ul className="space-y-2.5">
            {course.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Accordion */}
          <DetailAccordion sections={course.accordion} />

          {/* Chips */}
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Resultado ao concluir</p>
            <div className="flex flex-wrap gap-1.5">
              {course.chips.map((chip) => (
                <Badge key={chip} variant="secondary" className="text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleCheckout}
            disabled={!canProceed}
            size="lg"
            className="w-full btn-primary gap-2 min-h-[52px] h-auto py-3 font-bold text-sm tracking-wide"
          >
            Ir para pagamento seguro
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Button>
        </div>

        {/* Instructor */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-display font-bold text-foreground">Instrutores e Credenciais</h2>
            <p className="text-sm text-muted-foreground">Você aprende com profissionais que atuam no mercado real.</p>
          </div>
          <InstructorCard />
        </div>

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> Checkout seguro (EasyFlow)</span>
          <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-primary" /> Suporte via WhatsApp</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Turmas com vagas limitadas</span>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-foreground text-center">Dúvidas frequentes</h2>
          <FaqSection />
        </div>
      </main>

      {/* Abandonment Recovery */}
      {showRecovery && (
        <div className="fixed bottom-6 right-6 z-50 bg-background border border-border rounded-xl shadow-lg p-5 max-w-xs animate-in slide-in-from-bottom-4 duration-300">
          <button onClick={() => setShowRecovery(false)} className="absolute top-2 right-3 text-muted-foreground hover:text-foreground text-lg">×</button>
          <p className="text-sm font-medium text-foreground mb-3">Quer falar com a equipe agora no WhatsApp?</p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="w-full gap-2 btn-primary">
              <MessageCircle className="w-4 h-4" />
              Chamar no WhatsApp
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default PreCheckout;
