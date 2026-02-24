

# Plano: Substituir imagens de IA por fotos reais da web

## Situacao

Posso buscar imagens da web e usa-las diretamente via URL no codigo, sem precisar que voce envie. Vou usar imagens de fontes publicas confiaves: **Unsplash** (licenca gratuita) e **Pexels** (licenca gratuita) para fotos genericas de drones agricolas, e imagens oficiais da **DJI** para produtos especificos.

## Estrategia

Em vez de importar arquivos locais `.jpg`, os componentes passam a usar URLs externas diretas. Isso elimina a necessidade de baixar e salvar cada imagem no repositorio.

## Imagens a substituir (9 no total)

| Imagem atual | Uso | Nova fonte |
|---|---|---|
| `hero-drone-spray.jpg` | Hero background | Unsplash: drone agricola pulverizando lavoura |
| `equip-spray-drone.jpg` | Equipment: pulverizacao | Unsplash/Pexels: drone spray em campo |
| `equip-controller.jpg` | Equipment: controle | Unsplash: controle remoto de drone |
| `equip-safety.jpg` | Equipment: seguranca | Pexels: operador com EPIs e drone |
| `equip-rgb-map.jpg` | Equipment: mapa RGB | Unsplash: vista aerea de lavoura (ortomosaico) |
| `equip-ndvi.jpg` | Equipment: NDVI | Imagem publica de mapa NDVI colorido |
| `equip-dji-terra.jpg` | Equipment: DJI Terra | Screenshot/imagem do software DJI Terra |
| `mapping-ortho.jpg` | MappingShowcase: ortomosaico | Unsplash: ortomosaico aereo de campo |
| `mapping-ndvi.jpg` | MappingShowcase: NDVI | Imagem publica de mapa NDVI |

## Mudancas tecnicas

### Arquivos modificados (3 arquivos)

1. **`src/components/landing/Hero.tsx`** -- Substituir `import heroImage from '@/assets/hero-drone-spray.jpg'` por uma constante com URL do Unsplash
2. **`src/components/landing/Equipment.tsx`** -- Substituir os 6 imports locais por URLs do Unsplash/Pexels
3. **`src/components/landing/MappingShowcase.tsx`** -- Substituir os 2 imports locais por URLs

### Abordagem no codigo

Trocar:
```ts
import heroImage from '@/assets/hero-drone-spray.jpg';
```
Por:
```ts
const heroImage = 'https://images.unsplash.com/photo-XXXXX?w=1920&q=80';
```

As URLs do Unsplash permitem parametros de largura (`w=`) e qualidade (`q=`) para otimizar carregamento.

## Ressalva importante

As imagens de bancos gratuitos serao de drones agricolas genericos -- podem nao ser especificamente modelos DJI Agras T40/T25. Se voce quiser imagens **exatamente** dos modelos DJI que a CEATEC usa, o ideal e enviar fotos proprias (da operacao real, do treinamento, etc). Fotos proprias tambem passam mais credibilidade para o cliente.

## Recomendacao

Posso implementar agora com imagens gratuitas de alta qualidade como placeholder profissional, e depois voce substitui pelas fotos reais da CEATEC quando tiver. Quer que eu va em frente?

