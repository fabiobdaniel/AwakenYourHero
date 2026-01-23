# 🔧 Resolver: Domínio Raiz "Invalid Configuration"

## ⚠️ Situação

O domínio `awakenyourhero.com.br` está adicionado no Vercel, mas mostra:
- ❌ Status: "Invalid Configuration"
- ⚠️ O Vercel detecta registros DNS conflitantes

---

## 🔍 O Que o Vercel Está Dizendo

O Vercel está pedindo para **REMOVER** estes registros:

1. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `76.223.105.230` ❌ **REMOVER**

2. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `13.248.243.5` ❌ **REMOVER**

E **MANTER** apenas:

1. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `216.198.79.1` ✅ **MANTER**

---

## 🔍 Por Que Não Aparecem no Painel?

### Possibilidade 1: Cache DNS

Os registros podem já ter sido removidos, mas ainda estão em **cache DNS**:

- ⏳ **Aguarde 24 horas** para propagação completa
- 🔄 **Cache DNS** pode demorar para atualizar
- 🌍 **Diferentes servidores DNS** atualizam em velocidades diferentes

### Possibilidade 2: Registros em Outro Lugar

Os registros podem estar:

- Em outro provedor DNS
- Em uma seção diferente do painel
- Em "Zone File" ou "Advanced DNS"

---

## 🔧 Soluções

### Solução 1: Aguardar Propagação DNS (Recomendado)

Se você **já removeu** os registros antigos:

1. ⏳ **Aguarde 24 horas** para propagação completa
2. 🔄 **O Vercel verificará automaticamente**
3. ✅ **Status mudará** para "Valid Configuration"

### Solução 2: Verificar Zone File Completa

No painel DNS do GoDaddy:

1. **Procure por:** "Zone File" ou "View Zone File"
2. **Verifique** TODOS os registros listados
3. **Procure** pelos IPs `76.223.105.230` e `13.248.243.5`
4. **Remova** se encontrar

### Solução 3: Verificar Nameservers

Verifique se o domínio está usando os nameservers corretos:

```bash
dig NS awakenyourhero.com.br +short
```

**Se os nameservers forem do GoDaddy:**
- Registros devem estar no painel do GoDaddy

**Se os nameservers forem de outro provedor:**
- Configure DNS no provedor dos nameservers

---

## 🔍 Verificar Propagação DNS

### Verificar Periodicamente:

```bash
dig awakenyourhero.com.br A +short
```

**Quando mostrar apenas `216.198.79.1`:**
- ✅ DNS propagou corretamente
- ✅ Vercel deve verificar e mudar status

### Verificar com DNS Checker:

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Tipo:** A
4. **Verifique** quantos servidores mostram cada IP

**Se alguns servidores mostram `216.198.79.1` e outros mostram IPs antigos:**
- ✅ DNS está propagando (aguarde mais tempo)

---

## 🔧 No Vercel

### 1. Clicar em "Refresh"

1. **Ao lado do domínio** `awakenyourhero.com.br`
2. **Clique em:** "Refresh"
3. **Aguarde** alguns segundos
4. **Verifique** se o status mudou

### 2. Aguardar Verificação Automática

O Vercel verifica automaticamente a cada poucos minutos:

- ⏳ **Aguarde 15-60 minutos**
- 🔄 **O Vercel verificará** automaticamente
- ✅ **Status mudará** quando DNS propagar

---

## 📋 Checklist

- [ ] Domínio `awakenyourhero.com.br` adicionado no Vercel
- [ ] Registro A para `@` → `216.198.79.1` configurado
- [ ] Registros antigos removidos (ou aguardando propagação)
- [ ] Aguardado tempo suficiente (24 horas)
- [ ] DNS verificado com dnschecker.org
- [ ] Clicado em "Refresh" no Vercel
- [ ] Status verificado no Vercel

---

## ⏰ Timeline Esperada

```
Agora:        Domínio adicionado, status "Invalid" ⚠️
15-60 min:    DNS começando a propagar
1-24 horas:   DNS propagando completamente
Após 24h:     Status deve mudar para "Valid Configuration" ✅
```

---

## 🆘 Se Após 24 Horas Ainda "Invalid"

### 1. Verificar DNS Novamente

```bash
dig awakenyourhero.com.br A +short
```

**Se ainda mostrar IPs antigos:**
- Registros ainda não foram removidos
- Verifique Zone File completa
- Contate suporte do provedor DNS

**Se mostrar apenas `216.198.79.1`:**
- DNS está correto
- Aguarde mais tempo ou contate suporte do Vercel

### 2. Contatar Suporte

Se DNS está correto mas Vercel ainda mostra "Invalid":

1. **Contate suporte do Vercel**
2. **Explique** que DNS está correto
3. **Peça** para verificar manualmente

---

## ✅ Resumo

**O que fazer:**

1. ✅ **Verifique** Zone File completa no provedor DNS
2. ✅ **Remova** registros antigos se encontrar
3. ✅ **Aguarde 24 horas** para propagação DNS
4. ✅ **Clique em "Refresh"** no Vercel periodicamente
5. ✅ **Verifique** DNS com dnschecker.org

**É normal demorar até 24 horas para propagação completa!** ⏳

---

**Aguarde a propagação DNS e verifique periodicamente!** 🚀
