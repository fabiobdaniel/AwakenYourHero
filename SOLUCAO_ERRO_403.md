# 🔧 Solução: Erro 403 - Testing Domain Restriction

## ❌ O Problema

O erro **403** no Resend acontece porque:
- `onboarding@resend.dev` é um domínio de **teste**
- Ele **só pode enviar** para o email da sua conta no Resend
- Você está tentando enviar para `contact@fabiobdaniel.com`
- Mas sua conta no Resend é `fabiobdaniel@gmail.com`

**Mensagem do Resend:**
> "The resend.dev domain is for testing and can only send to your own email address."

---

## ✅ Solução 1: Verificar Seu Próprio Domínio (Recomendado)

Esta é a solução definitiva para produção.

### Passo 1: Verificar Domínio no Resend

1. Acesse: **https://resend.com/domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `awakenyourhero.com` ou `fabiobdaniel.com`)
4. Clique em **"Add"**

### Passo 2: Adicionar Registros DNS

O Resend mostrará registros DNS que você precisa adicionar:

1. **TXT record** - para verificação do domínio
2. **3 registros CNAME** - para DKIM (autenticação)
3. **TXT record** - para SPF
4. **TXT record** - para DMARC (opcional)

**Onde adicionar:**
- Acesse o painel do seu provedor de domínio (GoDaddy, Namecheap, Cloudflare, etc.)
- Vá em **DNS Management** ou **DNS Settings**
- Adicione cada registro **exatamente** como mostrado no Resend
- Aguarde a propagação DNS (pode levar de alguns minutos até 48 horas)

### Passo 3: Verificar no Resend

1. Volte ao Resend → **Domains**
2. Clique em **"Verify"** ao lado do seu domínio
3. Aguarde alguns minutos
4. Quando aparecer um ✅ verde, está verificado!

### Passo 4: Atualizar na Vercel

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. Edite `RESEND_FROM_EMAIL` (ou crie se não existir)
3. Valor: `Awaken Your Hero <noreply@seu-dominio.com>` 
   - Exemplo: `Awaken Your Hero <noreply@awakenyourhero.com>`
4. Salve
5. Faça **Redeploy** (Deployments → ⋮ → Redeploy)

**Pronto!** Agora você pode enviar para qualquer email.

---

## ✅ Solução 2: Teste Rápido (Temporário)

Se você só quer testar rapidamente enquanto verifica o domínio:

### Opção A: Mudar destinatário temporariamente

**O que fazer:**
1. Edite `assets/contact-form.js`
2. Na linha que tem `to: 'contact@fabiobdaniel.com'`
3. Mude para: `to: 'fabiobdaniel@gmail.com'` (seu email do Resend)
4. Faça commit e push
5. Teste - deve funcionar!

**Depois:** Volte para `contact@fabiobdaniel.com` quando verificar o domínio.

### Opção B: Usar email da conta como destinatário

Se você quer receber os emails do formulário no seu email pessoal temporariamente:

1. Edite `assets/contact-form.js`
2. Mude `to: 'contact@fabiobdaniel.com'` para `to: 'fabiobdaniel@gmail.com'`
3. Faça commit, push e redeploy
4. Teste

**Depois:** Quando verificar o domínio, volte para `contact@fabiobdaniel.com`.

---

## 📋 Resumo das Opções

| Opção | Prós | Contras | Quando Usar |
|-------|------|---------|-------------|
| **Verificar domínio** | ✅ Funciona para qualquer email<br>✅ Profissional<br>✅ Melhor entrega | ⏱️ Leva tempo (DNS)<br>🔧 Precisa acesso DNS | **Produção** |
| **Teste com email da conta** | ✅ Funciona imediatamente<br>✅ Sem configuração | ❌ Só envia para você<br>❌ Não é produção | **Testes rápidos** |

---

## 🎯 Recomendação

1. **Agora (teste rápido):** Use Solução 2 - Opção A para testar se tudo está funcionando
2. **Depois (produção):** Use Solução 1 - Verifique seu domínio para enviar para `contact@fabiobdaniel.com`

---

## ⚡ Solução Rápida (5 minutos)

Se você quer testar **agora mesmo** sem verificar domínio:

1. Abra `assets/contact-form.js`
2. Encontre a linha: `to: 'contact@fabiobdaniel.com',`
3. Mude para: `to: 'fabiobdaniel@gmail.com',`
4. Faça commit, push e redeploy
5. Teste - deve funcionar!

Depois, quando verificar o domínio, volte para `contact@fabiobdaniel.com`.

---

## 🔗 Links Úteis

- **Resend Domains:** https://resend.com/domains
- **Resend Docs (Domains):** https://resend.com/docs/dashboard/domains/introduction
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## ❓ Dúvidas Comuns

**P: Preciso ter um domínio próprio?**
R: Sim, para enviar para qualquer email. Para testes, pode usar seu email do Resend.

**P: Quanto tempo leva para verificar o domínio?**
R: Geralmente alguns minutos, mas pode levar até 48 horas dependendo do DNS.

**P: Posso usar um subdomínio?**
R: Sim! Exemplo: `mail.awakenyourhero.com` funciona também.

**P: O que acontece se não verificar o domínio?**
R: Só poderá enviar para o email da sua conta no Resend (fabiobdaniel@gmail.com).
