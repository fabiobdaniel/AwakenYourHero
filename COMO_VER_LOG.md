# 📋 Como Ver os Logs

## 🔍 Onde Verificar os Logs

Há **2 lugares** para verificar os logs:

---

## 1️⃣ Console do Navegador (Frontend)

### Como acessar:
1. Abra o site no navegador
2. Pressione **F12** (ou clique com botão direito → "Inspecionar")
3. Vá na aba **"Console"**
4. Envie o formulário novamente
5. Veja os logs que começam com `[ContactForm]`

### O que procurar:
- ✅ `🖱️ SUBMIT BUTTON CLICKED` = Botão foi clicado
- ✅ `📤 Step 6: Sending email to API...` = Enviando para API
- ✅ `📥 Step 7: API response received` = Resposta recebida
- ✅ `✅✅✅ EMAIL SENT SUCCESSFULLY! ✅✅✅` = Email enviado
- ✅ `✅ Resend email ID: re_abc123...` = ID do email no Resend
- ❌ `❌❌❌ ERROR OCCURRED ❌❌❌` = Erro ocorreu

### Copiar os logs:
1. Clique com botão direito no console
2. Selecione **"Save as..."** ou **"Copy all"**
3. Cole aqui ou me envie

---

## 2️⃣ Logs da Vercel (Backend/API)

### Como acessar:
1. Vá para: **https://vercel.com/dashboard**
2. Selecione seu projeto **AwakenYourHero**
3. Vá em **"Deployments"**
4. Clique no deployment mais recente (o primeiro da lista)
5. Vá na aba **"Functions"**
6. Clique em **`/api/send-email`**
7. Veja os logs

### O que procurar:
- ✅ `Email API called:` = API foi chamada
- ✅ `RESEND_API_KEY configured: true` = Chave configurada
- ✅ `Sending email via Resend:` = Enviando via Resend
- ✅ `Resend API response status: 200` = Resposta OK
- ✅ `Email sent successfully: re_abc123...` = Email enviado
- ❌ `Resend API error:` = Erro do Resend
- ❌ `No email service configured` = Variáveis não configuradas

### Copiar os logs:
1. Selecione o texto dos logs
2. Copie (Ctrl+C / Cmd+C)
3. Cole aqui ou me envie

---

## 📸 O que me enviar:

**Opção 1: Screenshot**
- Tire um print do console do navegador (F12)
- Tire um print dos logs da Vercel

**Opção 2: Texto**
- Copie e cole os logs aqui
- Especialmente:
  - Qualquer linha com `❌` ou `ERROR`
  - A linha com `Resend email ID:` (se aparecer)
  - A linha com `Resend API response status:`
  - A linha com `Resend API response:`

---

## 🚨 Problemas Comuns nos Logs

### Se aparecer no Console:
```
❌ Failed to fetch
```
**Causa:** Problema de rede ou API não está respondendo

### Se aparecer nos Logs da Vercel:
```
Resend API response status: 403
```
**Causa:** Problema de domínio (veja `VERIFICAR_RESEND_DNS.md`)

### Se aparecer:
```
No email service configured
```
**Causa:** `RESEND_API_KEY` não está configurada na Vercel

### Se aparecer:
```
Invalid Resend response
```
**Causa:** Resend retornou resposta inválida (verifique no Resend dashboard)

---

## ✅ Checklist Rápido

Antes de me enviar os logs, verifique:

- [ ] Console do navegador aberto (F12)
- [ ] Aba "Console" selecionada
- [ ] Formulário enviado novamente
- [ ] Logs da Vercel acessados
- [ ] Screenshot ou texto copiado

---

## 🔗 Links Rápidos

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Resend Logs:** https://resend.com/logs
- **Resend Domains:** https://resend.com/domains

---

**Envie os logs e eu analiso o problema!** 🚀
