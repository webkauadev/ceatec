import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Preciso ter drone?', a: 'Não. Você pode fazer a formação antes de adquirir o equipamento. No presencial, todos os drones são fornecidos pela CEATEC.' },
  { q: 'Já posso trabalhar só com o Essencial?', a: 'Sim. Você sai com base de legislação e regularização para atuar conforme a legislação vigente.' },
  { q: 'O curso é gravado?', a: 'Não. As aulas são ao vivo com interação direta com os instrutores.' },
  { q: 'Vou operar drone no presencial?', a: 'Sim. No Profissional e no Expert você executa prática supervisionada com drones DJI Agras.' },
  { q: 'O mapeamento é prático?', a: 'Você aprende voo, processamento com DJI Terra e interpretação com foco técnico e aplicação no campo.' },
  { q: 'Posso parcelar em quantas vezes?', a: 'Até 12x sem juros no cartão de crédito. Também aceitamos Pix à vista com desconto.' },
  { q: 'Tem desconto para pagamento à vista?', a: 'Sim! O pagamento via Pix tem desconto em relação ao parcelamento. A economia varia por plano.' },
  { q: 'Qual o retorno financeiro de quem se forma?', a: 'Pilotos certificados podem faturar a partir de R$ 15–30/hectare. Com 150ha/mês, a formação se paga no primeiro mês de operação.' },
];

export const FAQ = () => (
  <section id="faq" className="section-padding bg-secondary">
    <div className="container-narrow">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Perguntas frequentes</h2>
      </div>
      <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-lg border border-border px-6 hover:border-primary/20 transition-colors">
            <AccordionTrigger className="text-left font-semibold hover:no-underline text-foreground">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
