# Pasta de Assets

Esta pasta contém os arquivos de mídia (imagens, logos, etc.) usados no projeto.

## Estrutura

- `images/` - Imagens de itens, produtos, etc.
- `logos/` - Logos e marcas

## Como usar

Para usar uma imagem em um componente, importe-a assim:

```typescript
import logoImage from '/assets/logos/gowork-logo.png';
import itemImage from '/assets/images/item-example.jpg';
```

Ou use diretamente no src de uma tag img:

```tsx
<img src="/assets/logos/gowork-logo.png" alt="Logo" />
```

## Formato recomendado

- **Imagens de itens**: JPG ou PNG, preferencialmente 400x400px ou maior
- **Logos**: SVG (preferencial) ou PNG com fundo transparente
- **Ícones**: SVG


