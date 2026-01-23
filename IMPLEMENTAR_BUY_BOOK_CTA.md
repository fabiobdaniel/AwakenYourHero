# Implementar Buy Book CTA na Página /contact

## 📋 Resumo

Este documento descreve como integrar o botão "Buy Book" na seção "Take your Next step" da página `/contact`, seguindo os princípios SOLID e mantendo consistência visual.

## 📁 Arquivos Criados

### 1. Configuração Centralizada
- **`src/config/cta.ts`** - Constantes para links e labels de CTAs

### 2. Componente CTA
- **`src/components/cta/BuyBookCTA.tsx`** - Componente reutilizável do botão
- **`src/components/cta/index.ts`** - Barrel export

## 🔧 Passos para Integração

### Passo 1: Localizar a Página Contact

Encontre o arquivo da página de contato. Pode estar em:
- `src/pages/Contact.tsx`
- `src/routes/contact.tsx`
- `src/app/routes/contact.tsx`
- Ou similar, dependendo da estrutura do projeto

### Passo 2: Localizar a Seção "Take your Next step"

Procure por texto como:
- "Take your Next step"
- "Take Your Next Step"
- "Next step"
- Ou similar

### Passo 3: Importar o Componente

```tsx
import { BuyBookCTA } from '@/components/cta';
// ou
import { BuyBookCTA } from '../../components/cta';
```

### Passo 4: Modificar o Layout

Encontre a seção e modifique para incluir o botão:

**Antes:**
```tsx
<div>
  <h2>Take your Next step</h2>
  <p>Texto descritivo...</p>
</div>
```

**Depois:**
```tsx
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
  <div className="max-w-prose">
    <h2>Take your Next step</h2>
    <p>Texto descritivo...</p>
  </div>
  <BuyBookCTA className="shrink-0" />
</div>
```

### Passo 5: Ajustar Responsividade (se necessário)

O componente já está preparado para:
- **Desktop**: Botão ao lado do texto (`sm:flex-row`)
- **Mobile**: Botão abaixo do texto (`flex-col`)

Se o breakpoint do projeto for diferente de `sm:`, ajuste:
- `md:flex-row` (se usar `md:` como breakpoint)
- `lg:flex-row` (se usar `lg:` como breakpoint)

## 🎨 Estilização

O componente usa classes Tailwind que seguem o padrão do projeto:
- `bg-primary` / `text-primary-foreground` - Cores do tema
- `focus-visible:ring-*` - Foco acessível
- `hover:opacity-90 hover:scale-105` - Efeitos hover

Se o projeto usar classes customizadas (ex: `btn`, `btn-primary`), você pode:

1. **Opção A**: Passar via `className` prop
```tsx
<BuyBookCTA className="btn btn-primary" />
```

2. **Opção B**: Modificar o componente para usar classes existentes
```tsx
// Em BuyBookCTA.tsx, substituir as classes Tailwind por:
className={`btn btn-primary ${className}`}
```

## ✅ Checklist

- [ ] Arquivos criados em `src/config/` e `src/components/cta/`
- [ ] Componente importado na página Contact
- [ ] Seção "Take your Next step" localizada
- [ ] Layout modificado com flex responsivo
- [ ] Botão aparece ao lado (desktop) e abaixo (mobile)
- [ ] Link abre em nova aba (`target="_blank"`)
- [ ] Estilo consistente com o restante do site
- [ ] Testado em diferentes tamanhos de tela
- [ ] Build sem erros

## 🔍 Verificação

Após implementar, verifique:

1. **Desktop**: Botão aparece ao lado do texto
2. **Mobile**: Botão aparece abaixo do texto com espaçamento adequado
3. **Link**: Abre `https://a.co/d/5m8frEq` em nova aba
4. **Acessibilidade**: `aria-label` presente, foco visível
5. **Visual**: Cores e tipografia consistentes

## 📝 Notas

- O componente é totalmente reutilizável
- Configuração centralizada facilita manutenção
- Segue princípios SOLID (SRP, DIP)
- Não quebra o layout existente
- Responsivo por padrão
