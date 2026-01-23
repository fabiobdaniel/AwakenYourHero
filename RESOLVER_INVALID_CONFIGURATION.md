# 🔧 Resolver "Invalid Configuration" no Vercel

## ⚠️ Problema

Os domínios `awakenyourhero.com.br` e `www.awakenyourhero.com.br` estão mostrando:
- ❌ Status: "Invalid Configuration"
- ⚠️ Não estão verificando corretamente

---

## 🔍 Passo 1: Verificar o Que o Vercel Espera

### 1.1 No Vercel Dashboard

1. **Acesse:** Settings → Domains
2. **Clique em:** "Learn more" ao lado do domínio com erro
3. **Anote** os valores DNS que o Vercel espera

Você verá algo como:

```
Para awakenyourhero.com.br:
- Tipo: A
- Nome: @
- Valor: 76.76.21.21

Para www.awakenyourhero.com.br:
- Tipo: CNAME
- Nome: www
- Valor: cname.vercel-dns.com
```

**⚠️ IMPORTANTE:** Use os valores EXATOS que o Vercel mostrar!

---

## 🔍 Passo 2: Verificar DNS Atual

### 2.1 Verificar com Ferramenta Online

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Selecione:** Tipo A
4. **Verifique** qual IP está configurado

### 2.2 Verificar no Painel DNS

1. **Acesse** o painel DNS do seu provedor (GoDaddy, Registro.br, etc.)
2. **Verifique** os registros atuais:
   - Existe registro A para `@`?
   - Qual é o valor do registro A?
   - Existe registro CNAME para `www`?
   - Qual é o valor do CNAME?

---

## 🔧 Passo 3: Corrigir Registros DNS

### 3.1 No Painel DNS do Provedor

#### Para `awakenyourhero.com.br` (domínio raiz):

1. **Procure** ou **adicione** registro A:
   - **Tipo:** A
   - **Nome/Host:** `@` (ou deixe em branco)
   - **Valor:** `76.76.21.21` (ou o valor que o Vercel mostrar)
   - **TTL:** 1 Hora (ou Auto)

2. **Remova** qualquer outro registro A que aponte para IP diferente

#### Para `www.awakenyourhero.com.br`:

1. **Procure** ou **adicione** registro CNAME:
   - **Tipo:** CNAME
   - **Nome/Host:** `www`
   - **Valor:** `cname.vercel-dns.com` (ou o valor que o Vercel mostrar)
   - **TTL:** 1 Hora (ou Auto)

2. **Remova** qualquer outro registro CNAME para `www` que aponte para outro lugar

### 3.2 Verificar Conflitos

- ⚠️ **Não pode ter** registro A e CNAME para o mesmo nome
- ⚠️ **Não pode ter** múltiplos registros A com IPs diferentes
- ⚠️ **Remova** registros antigos que não são do Vercel

---

## 🔍 Passo 4: Verificar Propagação DNS

### 4.1 Aguardar Propagação

- ⏳ **Aguarde 15-60 minutos** após alterar DNS
- ⏳ Propagação pode levar até 24 horas em alguns casos

### 4.2 Verificar com Ferramentas

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Selecione:** Tipo A
4. **Verifique** se o IP está correto em diferentes servidores DNS

**Resultado esperado:**
- ✅ Maioria dos servidores mostra: `76.76.21.21` (ou o IP do Vercel)
- ✅ Alguns podem ainda mostrar IP antigo (aguardar mais)

---

## 🔧 Passo 5: Verificar no Vercel

### 5.1 Após Aguardar Propagação

1. **Acesse:** Settings → Domains no Vercel
2. **Clique em:** "Refresh" ou aguarde atualização automática
3. **Verifique** se o status mudou para "Valid" ✅

### 5.2 Se Ainda Estiver "Invalid"

1. **Clique em:** "Learn more" para ver detalhes do erro
2. **Verifique** a mensagem de erro específica
3. **Compare** os registros DNS com o que o Vercel espera

---

## ⚠️ Problemas Comuns e Soluções

### Problema 1: DNS Não Propagou

**Sintomas:**
- Status ainda "Invalid" após 1 hora
- DNS checker mostra IP antigo

**Solução:**
- Aguarde mais tempo (até 24 horas)
- Verifique se os registros estão corretos no provedor
- Reduza TTL para 1 hora (se possível)

### Problema 2: Registros DNS Incorretos

**Sintomas:**
- DNS propagou mas Vercel ainda mostra "Invalid"
- IP no DNS checker não corresponde ao do Vercel

**Solução:**
- Verifique os valores exatos no Vercel (Settings → Domains → Learn more)
- Compare com os registros no provedor DNS
- Corrija os valores se diferentes

### Problema 3: Múltiplos Registros Conflitantes

**Sintomas:**
- Vários registros A ou CNAME para o mesmo nome
- DNS checker mostra múltiplos valores

**Solução:**
- Remova registros antigos/duplicados
- Mantenha apenas os registros do Vercel
- Aguarde propagação

### Problema 4: TTL Muito Alto

**Sintomas:**
- DNS não atualiza mesmo após horas

**Solução:**
- Reduza TTL para 1 hora (3600 segundos)
- Aguarde propagação
- Depois pode aumentar TTL novamente

---

## 📋 Checklist de Verificação

- [ ] Registro A para `@` configurado com IP do Vercel
- [ ] Registro CNAME para `www` configurado com valor do Vercel
- [ ] Registros antigos/duplicados removidos
- [ ] TTL configurado para 1 hora (ou Auto)
- [ ] Aguardado pelo menos 15-60 minutos
- [ ] DNS verificado com dnschecker.org
- [ ] Valores DNS correspondem aos do Vercel
- [ ] Status no Vercel verificado novamente

---

## 🔍 Verificação Rápida via Terminal

```bash
# Verificar registro A
dig awakenyourhero.com.br A +short

# Deve mostrar: 76.76.21.21 (ou IP do Vercel)

# Verificar registro CNAME
dig www.awakenyourhero.com.br CNAME +short

# Deve mostrar: cname.vercel-dns.com (ou valor do Vercel)
```

---

## 📞 Se Ainda Não Funcionar

1. **Verifique** os valores exatos no Vercel:
   - Settings → Domains → Clique no domínio → "Learn more"
   
2. **Compare** com os registros no provedor DNS

3. **Aguarde** até 24 horas para propagação completa

4. **Contate suporte** do provedor DNS se necessário

---

## ✅ Resultado Esperado

Após corrigir:
- ✅ Status no Vercel: "Valid Configuration"
- ✅ Domínio acessível: `https://awakenyourhero.com.br`
- ✅ HTTPS funcionando automaticamente

---

**Siga estes passos e o domínio deve funcionar!** 🚀
