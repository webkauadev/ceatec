

# Plano: Adicionar logo DJI Agriculture + Substituir imagens por fotos reais de drones DJI

## Resumo

Duas mudancas principais:
1. Adicionar a logo "DJI Agriculture" ao lado da logo CEATEC no Header, Footer e Hero
2. Substituir todas as 8 imagens de placeholder/IA por fotos reais de drones DJI Agriculture

---

## Parte 1: Logo DJI Agriculture

### Arquivo de imagem
- Copiar o upload `user-uploads://46689835-25dd-4c0e-92d0-94dee3c438ad_removalai_preview.png` para `src/assets/logo-dji-agriculture.png`
- A segunda imagem (Ministerio da Agricultura) sera guardada para uso futuro se necessario: `src/assets/logo-mapa.png`

### Header (Header.tsx)
- Importar `logoDji` de `@/assets/logo-dji-agriculture.png`
- Ao lado da logo CEATEC, adicionar um separador vertical fino (`|` ou `border-l`) e a logo DJI Agriculture
- Layout: `[CEATEC logo] | [DJI Agriculture logo]` alinhados horizontalmente
- A logo DJI recebe `brightness-0 invert` igual a CEATEC para ficar branca no tema escuro
- Altura da DJI: `h-8 md:h-10` (menor que a CEATEC para hierarquia visual)

### Footer (Footer.tsx)
- Mesmo padrao: adicionar logo DJI Agriculture ao lado da CEATEC
- Layout horizontal com separador

### Hero (Hero.tsx)
- No badge existente "Centro DJI Academy Agriculture", substituir o icone Shield pela logo DJI Agriculture em miniatura (`h-4`)
- Ou: adicionar uma barra de logos abaixo do micro proof com CEATEC + DJI Agriculture + MAPA

---

## Parte 2: Substituir imagens por fotos reais

### Imagens atuais (todas provavelmente geradas por IA)
1. `hero-drone-spray.jpg` -- Hero background (drone pulverizando)
2. `equip-spray-drone.jpg` -- Equipment: pulverizacao
3. `equip-controller.jpg` -- Equipment: controle
4. `equip-safety.jpg` -- Equipment: seguranca
5. `equip-rgb-map.jpg` -- Equipment: mapa RGB
6. `equip-ndvi.jpg` -- Equipment: NDVI
7. `equip-dji-terra.jpg` -- Equipment: DJI Terra
8. `mapping-ortho.jpg` -- MappingShowcase: ortomosaico
9. `mapping-ndvi.jpg` -- MappingShowcase: NDVI

### Estrategia para imagens reais
Como o usuario nao forneceu as fotos reais, ha duas opcoes:

**Opcao A (recomendada):** O usuario fornece as fotos reais dos drones DJI (ex: DJI Agras T40, T25, Mavic 3 Multispectral) e eu substituo cada arquivo mantendo os mesmos nomes.

**Opcao B:** Uso imagens de alta qualidade de fontes livres (Unsplash, Pexels) de drones agricolas reais DJI. Porem a qualidade e autenticidade pode variar.

### Arquivos modificados
- Nenhuma mudanca de codigo necessaria se as novas imagens mantiverem os mesmos nomes de arquivo
- Basta substituir os 9 arquivos `.jpg` em `src/assets/`

---

## Arquivos modificados

| Arquivo | Mudanca |
|---------|---------|
| `src/assets/logo-dji-agriculture.png` | Novo -- logo DJI Agriculture (do upload) |
| `src/assets/logo-mapa.png` | Novo -- logo MAPA (do upload) |
| `src/components/landing/Header.tsx` | Adicionar logo DJI ao lado da CEATEC |
| `src/components/landing/Footer.tsx` | Adicionar logo DJI ao lado da CEATEC |
| `src/components/landing/Hero.tsx` | Atualizar badge com logo DJI |
| `src/assets/*.jpg` (9 arquivos) | Substituir por fotos reais (pendente envio pelo usuario) |

---

## Detalhes tecnicos

### Header -- layout das logos
```text
[CEATEC h-14] [border-l border-white/20 h-8] [DJI Agriculture h-8]
```
Ambas dentro do mesmo `<a>` ou em `<div className="flex items-center gap-3">`.

### Prerequisito para as imagens
O usuario precisa enviar as 9 fotos reais de drones DJI. Sem elas, posso:
- Implementar apenas a parte das logos agora
- Aguardar as fotos para a substituicao

