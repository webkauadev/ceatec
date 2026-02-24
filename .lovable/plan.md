

# Plano: Substituir imagens de drone e controle por fotos reais DJI

## Imagens a substituir

Agora são **3 imagens** que precisam ser substituídas por fotos reais de alta qualidade:

| Imagem atual | Componente | Conteúdo | Substituição |
|---|---|---|---|
| `hero-drone-spray.jpg` | Hero (fundo) | Drone pulverizando lavoura | Foto real de DJI Agras T40/T25 em operação |
| `equip-spray-drone.jpg` | Equipment (1º card) | Drone agrícola | Foto real de drone DJI Agriculture em campo |
| `equip-controller.jpg` | Equipment (2º card) | Controle remoto genérico/IA | Foto real de controle DJI (ex: DJI RC Plus / RC Pro Enterprise) |

As demais 6 imagens (safety, RGB map, NDVI, DJI Terra, mapping) **não contêm drones nem controles** e permanecem como estão.

## Implementação

Buscar URLs de fotos reais de alta qualidade (Unsplash, Pexels, ou fontes oficiais DJI) e atualizar os componentes para usar essas URLs em vez dos arquivos locais de IA.

### Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/components/landing/Hero.tsx` | Trocar import `heroImage` por URL de foto real de drone DJI Agras |
| `src/components/landing/Equipment.tsx` | Trocar imports `equipSpray` e `equipController` por URLs de fotos reais (drone + controle DJI) |

### Detalhes técnicos
- Usar `src={url}` diretamente em vez de imports locais para as 3 imagens substituídas
- Manter `object-cover`, aspect ratios e classes de hover existentes
- Imagens de alta resolução (1200px+) para boa qualidade em telas grandes

