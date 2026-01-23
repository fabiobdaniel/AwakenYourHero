# 🔍 Diagnosticar: Domínio Não Funciona

## ⚠️ Problema

O domínio `awakenyourhero.com.br` está mostrando "Próximo lanzamiento" ao invés do site do Vercel.

Isso indica que o domínio ainda está apontando para outro servidor (provavelmente GoDaddy ou outro provedor).

---

## 🔍 Passo 1: Verificar DNS Atual

### 1.1 Verificar com DNS Checker

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Selecione:** Tipo `A`
4. **Clique em:** "Search"

**O que deve aparecer:**
- ✅ `216.198.79.1` (IP do Vercel)

**Se aparecer outro IP:**
- ❌ DNS ainda não propagou ou está incorreto

### 1.2 Verificar via Terminal

```bash
dig awakenyourhero.com.br A +short
```

**Deve mostrar:** `216.198.79.1`

---

## 🔍 Passo 2: Verificar no Painel DNS

### 2.1 Acessar Painel DNS

1. **Acesse** o painel DNS do seu provedor
2. **Verifique** os registros atuais

### 2.2 Verificar Registro A

Deve existir APENAS um registro A para `@`:

```
Tipo: A
Nombre: @
Datos: 216.198.79.1
```

**Se não existir ou estiver diferente:**
- ❌ Corrija o registro

### 2.3 Verificar Registro CNAME

Deve existir um registro CNAME para `www`:

```
Tipo: CNAME
Nombre: www
Datos: de9484be374b41ad.vercel-dns-017.com.
```

---

## 🔍 Passo 3: Verificar no Vercel

### 3.1 Verificar Status

1. **Acesse:** Settings → Domains
2. **Verifique** o status de `awakenyourhero.com.br`

**Status esperado:**
- ✅ "Valid Configuration"

**Se ainda estiver "Invalid":**
- ⚠️ DNS não propagou ou está incorreto

### 3.2 Clicar em "Refresh"

1. **Clique em:** "Refresh" ao lado do domínio
2. **Aguarde** alguns segundos
3. **Verifique** se há mensagens de erro

---

## 🔧 Possíveis Problemas e Soluções

### Problema 1: DNS Não Propagou

**Sintomas:**
- DNS checker mostra IP antigo
- Site mostra "Próximo lanzamiento"

**Solução:**
- Aguarde mais tempo (pode levar até 24 horas)
- Verifique se os registros estão corretos no provedor

### Problema 2: Registros DNS Incorretos

**Sintomas:**
- DNS checker mostra IP diferente de `216.198.79.1`
- Status no Vercel ainda "Invalid"

**Solução:**
- Verifique os registros no provedor DNS
- Corrija para os valores do Vercel:
  - A: `@` → `216.198.79.1`
  - CNAME: `www` → `de9484be374b41ad.vercel-dns-017.com.`

### Problema 3: Cache do Navegador

**Sintomas:**
- DNS está correto mas site não atualiza

**Solução:**
- Limpe cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
- Teste em modo anônimo
- Teste em outro navegador

### Problema 4: Múltiplos Registros Conflitantes

**Sintomas:**
- Vários registros A para `@` com IPs diferentes

**Solução:**
- Remova todos os registros A antigos
- Mantenha apenas: `@` → `216.198.79.1`

---

## 🔍 Verificação Rápida

### Checklist:

- [ ] DNS checker mostra `216.198.79.1`?
- [ ] Registro A no provedor está correto?
- [ ] Registro CNAME no provedor está correto?
- [ ] Status no Vercel é "Valid Configuration"?
- [ ] Cache do navegador foi limpo?
- [ ] Aguardou tempo suficiente (15-60 min)?

---

## 🆘 Se Nada Funcionar

### 1. Verificar Todos os Registros DNS

No painel DNS, verifique TODOS os registros:

- ✅ Deve ter apenas UM registro A para `@` → `216.198.79.1`
- ✅ Deve ter apenas UM registro CNAME para `www` → `de9484be374b41ad.vercel-dns-017.com.`
- ❌ Não deve ter outros registros A ou CNAME conflitantes

### 2. Remover Todos os Registros Antigos

- Remova qualquer registro que não seja do Vercel
- Remova registros duplicados
- Mantenha apenas os registros do Vercel

### 3. Aguardar 24 Horas

- Propagação DNS pode levar até 24 horas
- Verifique novamente após 24 horas

### 4. Contatar Suporte

Se após 24 horas ainda não funcionar:
- Contate suporte do provedor DNS
- Verifique se há alguma configuração especial necessária

---

## 📋 Informações para Diagnóstico

Me informe:

1. **O que o DNS checker mostra?**
   - Acesse: https://dnschecker.org
   - Digite: `awakenyourhero.com.br`
   - Tipo: A
   - Qual IP aparece?

2. **Qual é o status no Vercel?**
   - Settings → Domains
   - Status de `awakenyourhero.com.br`?

3. **Quais registros existem no provedor DNS?**
   - Liste todos os registros A e CNAME

Com essas informações, posso ajudar a diagnosticar o problema específico!

---

**Verifique esses pontos e me informe o que encontrou!** 🔍
