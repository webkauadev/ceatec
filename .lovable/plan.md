

# Analise da Landing Page CEATEC -- Pontos de Melhoria

## Resumo da Analise

A LP tem uma estrutura solida de funil (Hero > Equipamentos > Pricing > Mapeamento > Trust > Instrutores > Garantia > Escassez > FAQ > CTA Final > Footer), mas apresenta oportunidades claras de melhoria em conversao, credibilidade e UX.

---

## 1. HERO -- Melhorias de Impacto

**Problema:** O subtitulo "Regularize, opere e evolua ate o nivel especialista em pulverizacao e mapeamento" e generico e nao comunica o diferencial competitivo.

**Ajuste proposto:**
- Adicionar um **badge de prova social** acima do titulo (ex: "+200 pilotos formados" ou "Unico centro DJI Academy Agriculture da regiao Norte")
- Subtitulo mais orientado a beneficio: "Saia regularizado, certificado pela DJI e pronto para faturar com drones agricolas"
- Adicionar **micro-prova social** abaixo do CTA (ex: logos de parceiros, ou "Reconhecido pelo Ministerio da Agricultura")

---

## 2. SECAO DE EQUIPAMENTOS -- Ajuste de Posicionamento

**Problema:** A secao "Equipamentos e pratica em campo" aparece ANTES do pricing. Isso atrasa o usuario de ver os precos e tomar a decisao.

**Ajuste proposto:**
- **Mover a secao de Equipamentos para DEPOIS do Pricing**, ou transformar em uma faixa mais compacta dentro do hero/trust
- A ordem ideal seria: Hero > Pricing > Trust/Credenciais > Equipamentos > Mapeamento > Instrutores > Garantia > FAQ > CTA

---

## 3. PRICING CARDS -- Melhorias de Conversao

**Problemas identificados:**
- A diferenca de preco entre Profissional (R$ 4.497) e Expert (R$ 4.897) e de apenas R$ 400, mas isso nao esta destacado -- perda de upsell
- O card "Mais escolhido" nao tem contraste visual forte o suficiente
- Falta **ancoragem de preco** (mostrar economia do Pix vs credito de forma mais evidente)

**Ajustes propostos:**
- Adicionar um callout no card Expert: "Apenas +R$ 400 vs Profissional" para incentivar upgrade
- Aumentar contraste do card destacado (fundo levemente diferente, borda mais grossa)
- Mostrar **economia em reais** ao lado do preco Pix (ex: "Economize R$ 481,48")

---

## 4. INSTRUTORES -- Problema de Credibilidade

**Problema critico:** 2 dos 3 instrutores aparecem como **"Instrutor a definir"** com avatar de iniciais genericas. Isso prejudica seriamente a credibilidade da formacao.

**Ajustes propostos:**
- **Remover os instrutores indefinidos** e manter apenas o Eng. Claudevan Camargo com destaque
- Ou substituir por um formato tipo "Equipe tecnica" sem cards individuais vazios
- Adicionar foto real do instrutor confirmado

---

## 5. SECAO DE GARANTIA -- Fraca

**Problema:** A secao "Garantia de seguranca" so mostra 3 itens genericos (Checkout seguro, Certificacoes, Suporte). Nao ha garantia de satisfacao ou reembolso.

**Ajuste proposto:**
- Se ha politica de reembolso, incluir explicitamente
- Adicionar "Certificado reconhecido pelo Ministerio da Agricultura" como item de garantia
- Incluir selo ou badge visual de seguranca

---

## 6. FAQ -- Adicionar Perguntas Estrategicas

**Problema:** Faltam perguntas que removem objecoes financeiras.

**Perguntas a adicionar:**
- "Posso parcelar em quantas vezes?" (reforcar 12x sem juros)
- "Tem desconto para pagamento a vista?" (reforcar economia no Pix)
- "Qual o retorno financeiro de quem se forma?" (prova de ROI)

---

## 7. PROVA SOCIAL -- Ausente

**Problema grave:** Nao ha nenhum depoimento, numero de alunos formados, ou resultado concreto em toda a LP.

**Ajuste proposto:**
- Adicionar secao de **depoimentos/resultados** entre Trust e Instrutores
- Ou pelo menos um **banner de numeros** (ex: "+200 pilotos formados", "15 turmas realizadas", "2 estados atendidos")

---

## 8. MOBILE UX -- Verificacao

**Problema potencial:** Os 3 pricing cards empilhados no mobile podem ficar muito longos. O usuario precisa fazer muito scroll para comparar.

**Ajuste proposto:**
- Considerar tabs ou swipe para os cards no mobile
- Ou um modo de comparacao simplificado

---

## 9. BUGS E DETALHES TECNICOS

- **Bug no PreCheckout.tsx (linha 184):** `window.location.href = finalUrl;` esta **duplicado** (aparece 2x seguidas)
- **Tracking incompleto:** Os IDs do Meta Pixel e Google Ads estao com placeholders ("AW-CONVERSION_ID") -- nenhum tracking real esta funcionando
- **whatsapp.ts (linha 2):** Comentario "FALTA DEFINIR" ainda presente, mas o numero ja esta correto -- limpar comentario
- **tracking.ts (linha 2):** Comentario "FALTA DEFINIR" ainda presente

---

## 10. FOOTER -- Ajustes Menores

- Links "Politica de Privacidade" e "Termos de Uso" apontam para "#" (nao funcionam)
- Considerar adicionar CNPJ da empresa para mais credibilidade

---

## Secao Tecnica -- Implementacao

### Arquivos a modificar:
1. `src/components/landing/Hero.tsx` -- badge de prova social, subtitulo melhorado
2. `src/components/landing/PricingTiers.tsx` -- callout de upsell Expert, economia Pix
3. `src/components/landing/Instructors.tsx` -- remover instrutores indefinidos
4. `src/components/landing/Guarantee.tsx` -- itens mais fortes
5. `src/components/landing/FAQ.tsx` -- perguntas adicionais
6. `src/pages/Index.tsx` -- reordenar secoes (Equipment depois de Pricing)
7. `src/pages/PreCheckout.tsx` -- remover linha duplicada (184)
8. `src/lib/tracking.ts` -- limpar comentarios placeholder
9. `src/lib/whatsapp.ts` -- limpar comentario placeholder
10. **Novo componente:** `src/components/landing/SocialProof.tsx` -- numeros/depoimentos

### Ordem de implementacao:
1. Corrigir bugs (duplicata PreCheckout, comentarios)
2. Remover instrutores indefinidos
3. Adicionar prova social (numeros)
4. Melhorar Hero (badge + subtitulo)
5. Ajustar pricing (upsell + economia)
6. Reordenar secoes
7. Expandir FAQ
8. Fortalecer garantia

