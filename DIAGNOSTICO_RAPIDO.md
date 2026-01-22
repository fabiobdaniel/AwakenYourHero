# 🔍 Diagnóstico Rápido - Erro no Envio de Email

Se você configurou tudo mas ainda está dando erro, siga estes passos:

---

## 1. Verificar Console do Navegador (F12)

**O que fazer:**
1. Abra o site na Vercel
2. Pressione **F12** (ou **Cmd+Option+I** no Mac)
3. Vá na aba **Console**
4. Preencha e envie o formulário
5. Veja as mensagens que aparecem

**O que procurar:**
- `[ContactForm] Sending email to API...` - formulário tentou enviar
- `[ContactForm] API response status: 200` - sucesso
- `[ContactForm] API response status: 500` - erro no servidor
- `[ContactForm] API error: ...` - mensagem de erro específica

**Copie a mensagem de erro completa** que aparecer.

---

## 2. Verificar Logs na Vercel

**O que fazer:**
1. Acesse: **https://vercel.com/dashboard**
2. Selecione o projeto **AwakenYourHero**
3. Vá em **Deployments**
4. Clique no **último deployment** (o mais recente)
5. Vá em **Functions** → `/api/send-email`
6. Clique em **"View Function Logs"** ou **"Logs"**
7. Envie o formulário novamente
8. Veja os logs que aparecem

**O que procurar:**
- `RESEND_API_KEY configured: true` - API Key está configurada
- `RESEND_API_KEY configured: false` - **PROBLEMA:** API Key não está configurada
- `Resend API response status: 200` - Resend aceitou o email
- `Resend API response status: 401` - API Key inválida
- `Resend API response status: 422` - Email inválido ou domínio não verificado
- `Email sent successfully: ...` - funcionou!

**Copie os logs completos** que aparecerem.

---

## 3. Verificar Variáveis de Ambiente na Vercel

**O que fazer:**
1. Vercel Dashboard → **Settings** → **Environment Variables**
2. Verifique se existem:
   - ✅ `RESEND_API_KEY` - deve ter um valor (começa com `re_`)
   - ✅ `RESEND_FROM_EMAIL` - opcional, mas recomendado

**Problemas comuns:**
- ❌ Variável não existe → **Adicione**
- ❌ Variável existe mas está vazia → **Edite e adicione o valor**
- ❌ Variável só está em "Development" → **Marque Production, Preview e Development**
- ❌ Variável está em outro projeto → **Verifique o projeto correto**

---

## 4. Testar API Diretamente

**O que fazer:**
1. Abra o Console do navegador (F12)
2. Cole e execute este código:

```javascript
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'contact@fabiobdaniel.com',
    subject: 'Test Email',
    html: '<p>Test</p>',
    text: 'Test'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Success:', data);
})
.catch(err => {
  console.error('❌ Error:', err);
});
```

**O que procurar:**
- Se aparecer `{success: true, id: "..."}` → **Funcionou!**
- Se aparecer erro → **Copie a mensagem de erro completa**

---

## 5. Verificar se Redeploy foi Feito

**O que fazer:**
1. Vercel → **Deployments**
2. Veja a data/hora do último deployment
3. Compare com quando você adicionou as variáveis de ambiente

**Problema comum:**
- Você adicionou as variáveis **depois** do último deploy
- **Solução:** Faça **Redeploy** (Deployments → ⋮ → Redeploy)

---

## Erros Comuns e Soluções

### ❌ "Email service not configured"
**Causa:** `RESEND_API_KEY` não está na Vercel ou não foi aplicada no deploy.

**Solução:**
1. Vercel → Settings → Environment Variables
2. Verifique se `RESEND_API_KEY` existe e tem valor
3. Se não existir, adicione
4. Se existir, faça **Redeploy**

---

### ❌ "Unauthorized" ou "Invalid API key"
**Causa:** API Key do Resend está incorreta ou foi revogada.

**Solução:**
1. Resend → API Keys
2. Crie uma nova API Key
3. Vercel → Settings → Environment Variables
4. Edite `RESEND_API_KEY` e cole a nova chave
5. Salve e faça **Redeploy**

---

### ❌ "Domain not verified" ou "Invalid from address"
**Causa:** O email remetente não está verificado.

**Solução:**
1. Vercel → Settings → Environment Variables
2. Adicione/edite `RESEND_FROM_EMAIL`
3. Valor: `onboarding@resend.dev`
4. Salve e faça **Redeploy**

---

### ❌ "Rate limit exceeded"
**Causa:** Você atingiu o limite de 100 emails/dia (plano gratuito).

**Solução:** Aguarde 24 horas ou faça upgrade do plano.

---

## Checklist de Verificação

- [ ] Console do navegador (F12) verificado - qual erro aparece?
- [ ] Logs na Vercel verificados - o que dizem?
- [ ] `RESEND_API_KEY` existe na Vercel e tem valor?
- [ ] `RESEND_FROM_EMAIL` está configurada (ou usando padrão)?
- [ ] Variáveis estão em **Production, Preview e Development**?
- [ ] **Redeploy** foi feito após adicionar variáveis?
- [ ] API Key do Resend está ativa (não foi revogada)?

---

## Próximos Passos

Depois de verificar tudo acima:

1. **Copie as mensagens de erro** do Console e dos Logs da Vercel
2. **Verifique qual erro específico** está aparecendo
3. **Siga a solução** correspondente acima

Se ainda não funcionar, me envie:
- Mensagem de erro do Console (F12)
- Logs da Vercel (Functions → Logs)
- Screenshot das Environment Variables (sem mostrar a API Key completa)
