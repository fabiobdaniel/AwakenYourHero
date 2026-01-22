# 🔧 Correção Rápida do Email

## ⚠️ O erro está acontecendo porque:

**As variáveis de ambiente não estão configuradas na Vercel ainda!**

## ✅ Passos para Corrigir (2 minutos):

### 1. Fazer Push (se ainda não fez):
```bash
git push
```

### 2. Configurar Variáveis na Vercel:

1. Acesse: **https://vercel.com/dashboard**
2. Selecione o projeto **AwakenYourHero**
3. Vá em **Settings** → **Environment Variables**
4. Clique em **Add New**
5. Adicione:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Sua API Key do Resend (que você já tem)
   - **Environment:** Marque todas (Production, Preview, Development)
   - Clique em **Save**

6. Adicione outra variável (opcional, mas recomendado):
   - **Name:** `RESEND_FROM_EMAIL`
   - **Value:** `onboarding@resend.dev` (para testes) OU `Awaken Your Hero <noreply@awakenyourhero.com>` (se tiver domínio verificado)
   - **Environment:** Marque todas
   - Clique em **Save**

### 3. Fazer Redeploy:

1. Na Vercel, vá em **Deployments**
2. Clique nos **3 pontos** (⋯) do último deployment
3. Selecione **Redeploy**
4. Aguarde o deploy terminar

### 4. Testar:

1. Acesse seu site na Vercel
2. Abra o Console do navegador (F12 → Console)
3. Preencha e envie o formulário
4. Veja a mensagem de erro específica no console

## 🔍 Verificar se Está Funcionando:

### Opção 1: Verificar Logs na Vercel
1. Vercel Dashboard → **Deployments**
2. Clique no último deployment
3. Vá em **Functions** → `/api/send-email`
4. Veja os logs - deve mostrar o erro específico

### Opção 2: Testar API Diretamente
Abra o Console do navegador (F12) e execute:

```javascript
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'contact@fabiobdaniel.com',
    subject: 'Test',
    html: '<p>Test</p>',
    text: 'Test'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Isso mostrará o erro exato!

## ❌ Erros Comuns:

### "Email service not configured"
→ `RESEND_API_KEY` não está configurada na Vercel

### "Domain not verified" ou "Invalid from address"
→ Use `onboarding@resend.dev` temporariamente em `RESEND_FROM_EMAIL`

### "Unauthorized" ou "Invalid API key"
→ API Key incorreta - gere uma nova no Resend

## 📝 Depois de Configurar:

O código já foi melhorado para mostrar mensagens de erro mais específicas. Após configurar as variáveis e fazer redeploy, você verá exatamente qual é o problema (se ainda houver).
