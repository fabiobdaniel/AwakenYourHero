# Troubleshooting Email Issues

## Verificando se o Email Está Configurado

### 1. Verificar Variáveis de Ambiente na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto `AwakenYourHero`
3. Vá em **Settings** → **Environment Variables**
4. Verifique se as seguintes variáveis estão configuradas:
   - ✅ `RESEND_API_KEY` - Sua chave da API Resend
   - ✅ `RESEND_FROM_EMAIL` - Email remetente (opcional, tem padrão)

### 2. Verificar se o Domínio está Verificado no Resend

1. Acesse [Resend Dashboard](https://resend.com/domains)
2. Verifique se o domínio `awakenyourhero.com` está verificado
3. **Se não estiver verificado**: use temporariamente `onboarding@resend.dev`

### 3. Testar a API Diretamente

Você pode testar a API diretamente usando curl ou Postman:

```bash
curl -X POST https://seu-dominio.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "contact@fabiobdaniel.com",
    "subject": "Test Email",
    "html": "<p>Test email</p>",
    "text": "Test email"
  }'
```

### 4. Verificar Logs na Vercel

1. Vá em **Deployments** no Vercel
2. Clique no deployment mais recente
3. Vá em **Functions** → `/api/send-email`
4. Veja os logs para identificar erros

### 5. Verificar Console do Navegador

1. Abra o site
2. Pressione `F12` ou `Cmd+Option+I` (Mac)
3. Vá na aba **Console**
4. Envie o formulário e veja se há erros

## Erros Comuns

### Erro: "Email service not configured"
- **Causa**: `RESEND_API_KEY` não está configurada na Vercel
- **Solução**: Adicione a variável de ambiente na Vercel e faça redeploy

### Erro: "Domain not verified" ou "Invalid from address"
- **Causa**: O domínio do email remetente não está verificado no Resend
- **Solução**: 
  - Verifique o domínio no Resend Dashboard, OU
  - Use `onboarding@resend.dev` temporariamente configurando `RESEND_FROM_EMAIL` na Vercel

### Erro: "Unauthorized" ou "Invalid API key"
- **Causa**: API Key do Resend está incorreta ou expirada
- **Solução**: Gere uma nova API Key no Resend e atualize na Vercel

### Erro: "Rate limit exceeded"
- **Causa**: Muitas requisições no período
- **Solução**: Aguarde alguns minutos ou verifique o plano do Resend

## Depois de Configurar

1. **Faça commit e push** das mudanças:
   ```bash
   git add .
   git commit -m "Improve email error handling"
   git push
   ```

2. **Aguarde o redeploy** na Vercel (automático após push)

3. **Teste o formulário** novamente

4. **Verifique os logs** se ainda houver erros

## Teste Rápido

Após configurar, você pode testar rapidamente abrindo o console do navegador (F12) e executando:

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
}).then(r => r.json()).then(console.log).catch(console.error);
```

Isso mostrará o erro específico (se houver).
