# 🔍 Diagnóstico do Problema de Email

## Como Verificar o Erro Específico

### 1. Abrir Console do Navegador
1. Acesse seu site na Vercel
2. Pressione `F12` ou `Cmd+Option+I` (Mac)
3. Vá na aba **Console**
4. Envie o formulário
5. Veja a mensagem de erro específica que aparece

### 2. Verificar Logs na Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **AwakenYourHero**
3. Vá em **Deployments**
4. Clique no último deployment
5. Vá em **Functions** → `/api/send-email`
6. Clique em **View Function Logs**
7. Veja os logs - deve mostrar exatamente qual é o problema

### 3. Testar API Diretamente
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

## Erros Comuns e Soluções

### ❌ "Email service not configured"
**Causa:** `RESEND_API_KEY` não está configurada na Vercel

**Solução:**
1. Vercel Dashboard → Settings → Environment Variables
2. Adicione `RESEND_API_KEY` com sua chave do Resend
3. Faça **Redeploy** (Deployments → 3 pontos → Redeploy)

### ❌ "Domain not verified" ou "Invalid from address"
**Causa:** O domínio do email remetente não está verificado no Resend

**Solução:**
1. Use temporariamente `onboarding@resend.dev`:
   - Vercel → Settings → Environment Variables
   - Adicione `RESEND_FROM_EMAIL` = `onboarding@resend.dev`
   - Faça Redeploy
2. OU verifique o domínio no Resend:
   - Acesse https://resend.com/domains
   - Adicione e verifique `awakenyourhero.com`
   - Depois use `Awaken Your Hero <noreply@awakenyourhero.com>`

### ❌ "Unauthorized" ou "Invalid API key"
**Causa:** API Key do Resend está incorreta ou expirada

**Solução:**
1. Acesse https://resend.com/api-keys
2. Gere uma nova API Key
3. Atualize na Vercel (Settings → Environment Variables)
4. Faça Redeploy

### ❌ "Rate limit exceeded"
**Causa:** Muitas requisições no período

**Solução:** Aguarde alguns minutos ou verifique o plano do Resend

### ❌ "Failed to fetch" ou erro de rede
**Causa:** Problema de conexão ou API não encontrada

**Solução:**
1. Verifique se a URL do site está correta
2. Verifique se o deployment foi concluído
3. Tente novamente após alguns segundos

## Checklist de Configuração

- [ ] `RESEND_API_KEY` configurada na Vercel
- [ ] `RESEND_FROM_EMAIL` configurada (ou usando padrão `onboarding@resend.dev`)
- [ ] Variáveis de ambiente aplicadas a **Production, Preview e Development**
- [ ] **Redeploy** feito após adicionar variáveis
- [ ] Logs verificados na Vercel para ver erro específico

## Depois de Configurar

1. **Faça commit e push** das mudanças:
   ```bash
   git add .
   git commit -m "Improve email API logging"
   git push
   ```

2. **Aguarde o redeploy** na Vercel (automático após push)

3. **Teste o formulário** novamente

4. **Verifique os logs** se ainda houver erros

## Logs Melhorados

O código agora tem logs detalhados que mostram:
- Se a API foi chamada
- Se `RESEND_API_KEY` está configurada
- A resposta completa da API Resend
- Erros específicos com detalhes

Verifique os logs na Vercel para ver exatamente o que está acontecendo!
