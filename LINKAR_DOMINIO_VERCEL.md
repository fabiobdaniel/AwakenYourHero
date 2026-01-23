# 🔗 Linkar Domínio awakenyourhero.com.br no Vercel

## ✅ O Que Já Foi Feito

- ✅ Registros DNS configurados (A e CNAME)
- ✅ Domínio adicionado no Vercel

---

## 🔧 O Que Fazer no Vercel

### Passo 1: Verificar se Domínio Está Adicionado

1. **Acesse:** https://vercel.com/dashboard
2. **Selecione o projeto:** AwakenYourHero
3. **Vá em:** Settings → Domains
4. **Verifique** se `awakenyourhero.com.br` está na lista

**Se NÃO estiver:**
- Veja "Passo 2: Adicionar Domínio"

**Se JÁ estiver:**
- Veja "Passo 3: Verificar Status"

---

### Passo 2: Adicionar Domínio (Se Não Estiver)

1. **Na página Settings → Domains**
2. **Clique em:** "Add" ou "Add Domain"
3. **Digite:** `awakenyourhero.com.br`
4. **Clique em:** "Add"

O Vercel mostrará os registros DNS necessários:
- Registro A: `@` → `216.198.79.1`
- Registro CNAME: `www` → `de9484be374b41ad.vercel-dns-017.com.`

**Você já configurou esses registros!** ✅

---

### Passo 3: Verificar Status do Domínio

Na lista de domínios, verifique o status:

**Status "Valid Configuration":**
- ✅ Domínio está linkado corretamente
- ✅ Não precisa fazer mais nada
- ✅ Site deve estar acessível

**Status "Invalid Configuration":**
- ⚠️ DNS ainda não propagou ou está incorreto
- Veja "Passo 4: Resolver Invalid Configuration"

---

### Passo 4: Resolver "Invalid Configuration"

Se o status ainda estiver "Invalid Configuration":

#### 4.1 Clicar em "Refresh"

1. **Ao lado do domínio** `awakenyourhero.com.br`
2. **Clique em:** "Refresh" (Atualizar)
3. **Aguarde** alguns segundos
4. **Verifique** se o status mudou

#### 4.2 Verificar DNS

1. **Clique em:** "Learn more" ao lado do domínio
2. **Verifique** os registros DNS que o Vercel espera
3. **Compare** com os registros no seu provedor DNS
4. **Corrija** se necessário

#### 4.3 Aguardar Propagação

- ⏳ **Aguarde 15-60 minutos** após configurar DNS
- 🔄 **O Vercel verifica automaticamente** a cada poucos minutos
- ✅ **Status mudará** para "Valid Configuration" quando DNS propagar

---

### Passo 5: Verificar Deployment

Após o domínio estar "Valid Configuration":

1. **Vá em:** Deployments
2. **Verifique** se o último deployment está ativo
3. **O domínio** deve estar associado ao deployment de produção

**Se não estiver:**
- O Vercel associa automaticamente ao deployment de produção
- Não precisa fazer nada manualmente

---

## 🔍 Verificar se Está Funcionando

### 1. Aguardar HTTPS (5-10 minutos)

Após o status mudar para "Valid Configuration":

- ⏳ **Aguarde 5-10 minutos** para o Vercel gerar o certificado SSL
- ✅ **HTTPS será configurado automaticamente**

### 2. Testar o Site

1. **Acesse:** `https://awakenyourhero.com.br`
2. **Acesse:** `https://www.awakenyourhero.com.br`
3. **Ambos devem funcionar!**

### 3. Verificar Redirecionamento

- ✅ HTTP → HTTPS (automático)
- ✅ `www` ↔ não-www (configurável no Vercel)

---

## 📋 Checklist Completo

- [ ] Domínio adicionado no Vercel (Settings → Domains)
- [ ] Status do domínio é "Valid Configuration"
- [ ] Registros DNS configurados corretamente
- [ ] Aguardado propagação DNS (15-60 minutos)
- [ ] HTTPS configurado (5-10 minutos após "Valid")
- [ ] Site testado e funcionando

---

## 🎯 Resumo: O Que Fazer no Vercel

### Se Domínio Já Está Adicionado:

1. ✅ **Verificar status** em Settings → Domains
2. ✅ **Se "Invalid":** Clicar em "Refresh" e aguardar
3. ✅ **Se "Valid":** Está pronto! Aguardar HTTPS (5-10 min)

### Se Domínio NÃO Está Adicionado:

1. ✅ **Adicionar domínio** em Settings → Domains
2. ✅ **Aguardar** verificação automática
3. ✅ **Status mudará** para "Valid Configuration"

---

## ⚠️ Importante

**Você NÃO precisa:**
- ❌ Configurar nada no código
- ❌ Fazer deploy manual
- ❌ Configurar SSL/HTTPS (automático)
- ❌ Configurar redirecionamentos (automático)

**O Vercel faz tudo automaticamente!** Você só precisa:
- ✅ Adicionar o domínio (se não estiver)
- ✅ Aguardar DNS propagar
- ✅ Aguardar verificação do Vercel

---

## 🆘 Se Ainda Não Funcionar

### Verificar:

1. **DNS propagou?**
   - `dig awakenyourhero.com.br A +short` deve mostrar apenas `216.198.79.1`

2. **Status no Vercel?**
   - Deve estar "Valid Configuration"

3. **HTTPS configurado?**
   - Aguarde 5-10 minutos após "Valid Configuration"

4. **Deployment ativo?**
   - Verifique em Deployments se há deployment de produção

---

**No Vercel, você só precisa verificar o status e aguardar! Tudo é automático!** 🚀
