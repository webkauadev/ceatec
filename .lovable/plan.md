

# Restyle CEATEC Landing Page -- Estetica Dark + Green Agressiva

Inspirado no visual de pilotoderaca.com.br, vamos transformar toda a landing page para um visual escuro, premium e agressivo, mantendo todo o conteudo e funcionalidade da CEATEC.

---

## O que muda (resumo visual)

- **Fundo geral**: de branco para preto/cinza escuro
- **Tipografia**: mais bold, mais grande, com destaques em verde neon
- **Botoes CTA**: verde brilhante com glow neon
- **Cards**: fundo escuro com bordas sutis, hover com brilho verde
- **Secoes alternando**: tons de preto (#0a0a0a, #111, #161616)
- **Linhas decorativas**: linhas diagonais verdes como no site referencia

---

## Etapas de implementacao

### 1. CSS Global (src/index.css)
- Inverter o tema base para escuro (background preto, foreground branco)
- Ajustar `--primary` para um verde neon mais vibrante (142 76% 50%)
- Ajustar `--card`, `--secondary`, `--muted` para tons escuros
- Adicionar estilos de glow mais agressivos nos botoes
- Adicionar classe utilitaria para linhas decorativas diagonais verdes

### 2. Header (Header.tsx)
- Fundo transparente/preto com blur
- Logo claro sobre fundo escuro
- Links de navegacao em branco/cinza claro
- CTA verde neon com glow

### 3. Hero (Hero.tsx)
- Manter imagem de fundo com overlay mais escuro
- Titulo maior e mais bold com palavras-chave destacadas em verde neon
- Badge DJI Academy com borda verde brilhante
- Botao CTA com efeito glow verde forte
- Card de turmas com fundo glass escuro

### 4. SocialProof (SocialProof.tsx)
- Fundo preto com numeros em verde neon
- Icones com glow sutil

### 5. PricingTiers (PricingTiers.tsx)
- Cards com fundo escuro (#111) e borda cinza escuro
- Card destacado com borda verde neon e shadow glow
- Badge "Mais escolhido" em verde neon
- Precos em branco, destaques em verde
- Botoes CTA verdes com glow

### 6. Trust (Trust.tsx)
- Cards escuros com icones verdes
- Texto branco/cinza claro

### 7. Equipment (Equipment.tsx)
- Fundo escuro, cards com borda escura
- Hover com brilho verde na borda
- Chips em verde escuro com texto verde claro

### 8. MappingShowcase (MappingShowcase.tsx)
- Fundo section escuro alternado
- Texto verde no label "Formacao Expert"
- Cards de imagem com borda escura

### 9. Instructors (Instructors.tsx)
- Cards escuros, badges verdes
- Avatar com borda verde

### 10. Guarantee (Guarantee.tsx)
- Fundo escuro, icones verdes
- Cards com fundo glass escuro

### 11. LimitedSpots (LimitedSpots.tsx)
- Fundo escuro, badge de urgencia em vermelho sobre fundo escuro
- Bullets com pontos verdes

### 12. FAQ (FAQ.tsx)
- Accordion escuro com bordas sutis
- Triggers em branco, conteudo em cinza claro

### 13. FinalCTA (FinalCTA.tsx)
- Fundo verde escuro com gradiente
- Botao branco sobre verde

### 14. Footer (Footer.tsx)
- Fundo preto puro, texto cinza

---

## Detalhes tecnicos

### Mudancas no index.css (arquivo principal)
As variaveis CSS do `:root` serao invertidas para tema escuro por padrao:

```text
--background: 0 0% 4%        (quase preto)
--foreground: 0 0% 95%       (branco suave)
--card: 0 0% 7%              (cinza muito escuro)
--secondary: 0 0% 10%        (cinza escuro)
--muted: 0 0% 15%            (cinza medio-escuro)
--muted-foreground: 0 0% 60% (cinza claro)
--border: 0 0% 15%           (borda sutil)
--primary: 142 76% 50%       (verde neon mais vibrante)
```

Adicionar novos utilitarios:
- `.neon-glow` -- box-shadow verde neon para botoes
- `.text-neon` -- text-shadow verde para titulos destacados
- `.diagonal-line` -- pseudo-elemento para linhas diagonais decorativas

### Mudancas nos componentes
Todas as classes que usam `bg-background`, `text-foreground`, `bg-card`, etc. ja vao herdar o tema escuro automaticamente pelas variaveis CSS. Ajustes pontuais:

- **Header**: `bg-background/80 backdrop-blur-lg` em vez de `bg-background`
- **Hero**: overlay mais forte, texto com `text-neon` nas palavras-chave
- **PricingTiers**: card highlight com `shadow-[0_0_30px_hsl(142_76%_50%/0.2)]`
- **Botoes CTA**: adicionar classe `neon-glow` em hover
- **Equipment cards**: `hover:border-primary/50` para glow verde no hover

### Arquivos modificados (11 arquivos)
1. `src/index.css` -- variaveis de tema + utilitarios
2. `src/components/landing/Header.tsx` -- fundo transparente blur
3. `src/components/landing/Hero.tsx` -- destaques neon, overlay
4. `src/components/landing/SocialProof.tsx` -- numeros neon
5. `src/components/landing/PricingTiers.tsx` -- cards escuros, glow
6. `src/components/landing/Trust.tsx` -- ajustes de cor
7. `src/components/landing/Equipment.tsx` -- hover verde
8. `src/components/landing/MappingShowcase.tsx` -- fundo escuro
9. `src/components/landing/Instructors.tsx` -- cards escuros
10. `src/components/landing/Guarantee.tsx` -- fundo escuro
11. `src/components/landing/FAQ.tsx` -- accordion escuro
12. `src/components/landing/FinalCTA.tsx` -- gradiente verde
13. `src/components/landing/LimitedSpots.tsx` -- ajustes
14. `src/components/landing/Footer.tsx` -- ajustes menores

### Nenhum pacote novo necessario
Tudo sera feito com Tailwind CSS e as variaveis CSS existentes.

