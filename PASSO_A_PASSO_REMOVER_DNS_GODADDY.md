# 📋 Passo a Passo: Remover Registros DNS no GoDaddy

## 🎯 Objetivo

Remover registros A antigos e manter apenas o correto.

---

## 📍 Passo 1: Acessar o Painel DNS

1. **Acesse:** https://www.godaddy.com
2. **Faça login**
3. **Clique em:** "Meus Produtos" (canto superior direito)
4. **Encontre** `awakenyourhero.com.br` na lista
5. **Clique nos 3 pontinhos** (⋯) ao lado do domínio
6. **Clique em:** "Gerenciar DNS" ou "Manage DNS"

---

## 📍 Passo 2: Encontrar Registros Tipo "A"

### No painel DNS, você verá uma tabela com colunas:

```
Tipo | Nome | Valor | TTL | Ações
```

### Procure por linhas onde:

- **Tipo** = `A`
- **Nome** = `@` ou vazio ou `awakenyourhero.com.br`

---

## 📍 Passo 3: Verificar TODOS os Registros A

### ⚠️ IMPORTANTE: Verifique TODAS as linhas da tabela!

1. **Role a página** para baixo completamente
2. **Procure** por TODOS os registros tipo "A"
3. **Não pare** na primeira linha que encontrar
4. **Verifique** se há múltiplos registros A

### Você pode ter algo assim:

```
Linha 1: Tipo A | Nome @ | Valor 216.198.79.1      ← MANTER ✅
Linha 2: Tipo A | Nome @ | Valor 76.223.105.230    ← DELETAR ❌
Linha 3: Tipo A | Nome @ | Valor 13.248.243.5      ← DELETAR ❌
```

---

## 📍 Passo 4: Identificar Registros para Deletar

### Procure por registros A com estes valores:

- ❌ `76.223.105.230` → **DELETAR**
- ❌ `13.248.243.5` → **DELETAR**

### Mantenha apenas:

- ✅ `216.198.79.1` → **MANTER**

---

## 📍 Passo 5: Deletar Registros Antigos

### Para cada registro antigo encontrado:

1. **Clique no ícone** de lixeira (🗑️) na coluna "Ações"
2. **OU clique em** "Editar" e depois "Deletar"
3. **Confirme** a exclusão
4. **Repita** para cada registro antigo

---

## 📍 Passo 6: Verificar se Restou Apenas 1 Registro A

### Após deletar, você deve ter apenas:

```
Tipo | Nome | Valor
-----|------|---------------
A    | @    | 216.198.79.1
```

**Se ainda houver outros registros A:**
- Delete-os também

---

## 🔍 Se Não Encontrar os Registros

### Opção A: Eles Estão em Outra Página

1. **Procure por botões:** "Próxima" ou "Next" ou "2" ou "3"
2. **Clique** para ver mais registros
3. **Verifique** todas as páginas

### Opção B: Eles Estão Ocultos

1. **Procure por:** "Mostrar mais" ou "Show more" ou "Ver todos"
2. **Clique** para expandir a lista
3. **Verifique** todos os registros

### Opção C: Usar Busca (Se Disponível)

1. **Procure por um campo de busca** no painel DNS
2. **Digite:** `76.223.105.230` ou `13.248.243.5`
3. **Veja** se encontra os registros

---

## 📸 Exemplo Visual do Que Procurar

### Tabela de Registros DNS:

```
┌──────┬─────────────────────────┬──────────────────┬──────┬────────┐
│ Tipo │ Nome                    │ Valor            │ TTL  │ Ações  │
├──────┼─────────────────────────┼──────────────────┼──────┼────────┤
│ A    │ @                       │ 216.198.79.1     │ 3600 │ ✏️ 🗑️  │ ← MANTER
│ A    │ @                       │ 76.223.105.230   │ 3600 │ ✏️ 🗑️  │ ← DELETAR
│ A    │ @                       │ 13.248.243.5     │ 3600 │ ✏️ 🗑️  │ ← DELETAR
│ CNAME│ www                     │ vercel-dns...    │ 3600 │ ✏️ 🗑️  │
│ TXT  │ @                       │ v=spf1...        │ 3600 │ ✏️ 🗑️  │
└──────┴─────────────────────────┴──────────────────┴──────┴────────┘
```

**Procure por TODAS as linhas tipo "A"!**

---

## 🆘 Se Ainda Não Encontrar

### Contatar Suporte GoDaddy:

1. **Acesse:** https://www.godaddy.com/help
2. **Clique em:** "Falar com Suporte" ou "Contact Support"
3. **Escolha:** Chat ou Telefone
4. **Peça para:**
   - "Remover registros A com IPs 76.223.105.230 e 13.248.243.5 do domínio awakenyourhero.com.br"
   - "Manter apenas registro A com IP 216.198.79.1"

---

## ✅ Após Deletar

### 1. Aguardar Propagação (15-60 minutos)

### 2. Verificar DNS:

```bash
dig @ns59.domaincontrol.com awakenyourhero.com.br A +short
```

**Quando mostrar apenas `216.198.79.1`:**
- ✅ Registros foram removidos
- ✅ Aguarde propagação completa

### 3. No Vercel:

1. **Clique em:** "Refresh" ao lado do domínio
2. **Aguarde** alguns minutos
3. **Status deve mudar** para "Valid Configuration"

---

## 📋 Checklist Final

- [ ] Acessei o painel DNS do GoDaddy
- [ ] Encontrei a tabela de registros DNS
- [ ] Procurei por TODOS os registros tipo "A"
- [ ] Rolei a página completamente
- [ ] Identifiquei registros com IPs antigos
- [ ] Deletei registros com `76.223.105.230`
- [ ] Deletei registros com `13.248.243.5`
- [ ] Mantive apenas registro com `216.198.79.1`
- [ ] Aguardei 15-60 minutos
- [ ] Cliquei em "Refresh" no Vercel

---

## 🎯 Resumo Rápido

1. **Acesse:** GoDaddy → Meus Produtos → Gerenciar DNS
2. **Procure:** TODOS os registros tipo "A"
3. **Delete:** Registros com IPs `76.223.105.230` e `13.248.243.5`
4. **Mantenha:** Apenas registro com IP `216.198.79.1`
5. **Aguarde:** 15-60 minutos
6. **Refresh:** No Vercel

**Procure por TODAS as linhas tipo "A" na tabela!** 🔍
