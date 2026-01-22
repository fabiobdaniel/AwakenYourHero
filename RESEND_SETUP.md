# 📧 Guia Completo: Configurar Email no Resend.com

## Passo 1: Criar Conta no Resend

1. Acesse: **https://resend.com**
2. Clique em **"Sign Up"** ou **"Get Started"**
3. Crie sua conta (pode usar email do Google/GitHub)
4. Confirme seu email se necessário

## Passo 2: Obter API Key

1. Após fazer login, vá em **API Keys** (menu lateral ou https://resend.com/api-keys)
2. Clique em **"Create API Key"**
3. Dê um nome (ex: "Awaken Your Hero - Vercel")
4. Selecione as permissões:
   - ✅ **Send emails** (obrigatório)
   - ✅ **Read domains** (opcional, mas útil)
5. Clique em **"Add"**
6. **IMPORTANTE:** Copie a API Key imediatamente! Ela só aparece uma vez.
   - Exemplo: `re_1234567890abcdefghijklmnopqrstuvwxyz`

⚠️ **Guarde essa chave em local seguro!** Você não poderá vê-la novamente.

## Passo 3: Configurar Domínio (Opcional, mas Recomendado)

### Opção A: Usar Domínio de Teste (Rápido - Apenas para Testes)

Se você só quer testar rapidamente, pode pular esta etapa e usar `onboarding@resend.dev` (já configurado como padrão no código).

### Opção B: Verificar Seu Próprio Domínio (Recomendado para Produção)

1. Vá em **Domains** (https://resend.com/domains)
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `awakenyourhero.com`)
4. Clique em **"Add"**
5. Resend mostrará registros DNS que você precisa adicionar:
   - **TXT record** para verificação
   - **DKIM records** (3 registros CNAME)
   - **SPF record** (TXT)
   - **DMARC record** (TXT) - opcional

6. **Adicione os registros DNS no seu provedor de domínio:**
   - Acesse o painel do seu provedor (GoDaddy, Namecheap, Cloudflare, etc.)
   - Vá em **DNS Management** ou **DNS Settings**
   - Adicione cada registro exatamente como mostrado no Resend
   - Aguarde a propagação DNS (pode levar alguns minutos até 48 horas)

7. Volte ao Resend e clique em **"Verify"**
8. Aguarde a verificação (pode levar alguns minutos)

✅ Quando verificado, você verá um check verde ao lado do domínio.

## Passo 4: Configurar na Vercel

1. Acesse: **https://vercel.com/dashboard**
2. Selecione o projeto **AwakenYourHero**
3. Vá em **Settings** → **Environment Variables**
4. Clique em **"Add New"**

### Adicionar RESEND_API_KEY:

- **Name:** `RESEND_API_KEY`
- **Value:** Cole a API Key que você copiou do Resend
- **Environment:** Marque todas as opções:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- Clique em **"Save"**

### Adicionar RESEND_FROM_EMAIL (Opcional):

- **Name:** `RESEND_FROM_EMAIL`
- **Value:** 
  - Se **NÃO** verificou domínio: `onboarding@resend.dev`
  - Se **verificou** domínio: `Awaken Your Hero <noreply@awakenyourhero.com>` (ou outro email do seu domínio)
- **Environment:** Marque todas as opções
- Clique em **"Save"**

## Passo 5: Fazer Redeploy

1. Na Vercel, vá em **Deployments**
2. Clique nos **3 pontos** (⋯) do último deployment
3. Selecione **"Redeploy"**
4. Aguarde o deploy terminar

## Passo 6: Testar

### Opção 1: Usar Página de Diagnóstico

1. Acesse: `https://seu-site.vercel.app/test-email.html`
2. Clique em **"🔄 Refresh Status"** para verificar configuração
3. Clique em **"📨 Test Email Send"** para testar

### Opção 2: Testar no Formulário

1. Acesse seu site
2. Vá na página de contato
3. Preencha e envie o formulário
4. Deve funcionar! ✅

## Limites do Plano Gratuito do Resend

- ✅ **3,000 emails/mês** gratuitos
- ✅ **100 emails/dia** de teste
- ✅ Domínios verificados ilimitados
- ✅ API completa

## Troubleshooting

### ❌ "Invalid API key"
- Verifique se copiou a API Key corretamente
- Certifique-se de que adicionou na Vercel
- Gere uma nova API Key se necessário

### ❌ "Domain not verified"
- Use temporariamente `onboarding@resend.dev`
- OU verifique o domínio no Resend (Passo 3)

### ❌ "Rate limit exceeded"
- Você atingiu o limite de 100 emails/dia (plano gratuito)
- Aguarde 24 horas ou faça upgrade do plano

### ❌ Email não chega
- Verifique a pasta de **Spam**
- Verifique se o domínio está verificado
- Verifique os logs na Vercel (Deployments → Functions → Logs)

## Checklist Final

- [ ] Conta criada no Resend.com
- [ ] API Key gerada e copiada
- [ ] `RESEND_API_KEY` adicionada na Vercel
- [ ] `RESEND_FROM_EMAIL` adicionada na Vercel (opcional)
- [ ] Domínio verificado no Resend (opcional, mas recomendado)
- [ ] Redeploy feito na Vercel
- [ ] Teste realizado com sucesso

## Links Úteis

- **Resend Dashboard:** https://resend.com
- **API Keys:** https://resend.com/api-keys
- **Domains:** https://resend.com/domains
- **Documentação:** https://resend.com/docs
- **Vercel Dashboard:** https://vercel.com/dashboard

## Próximos Passos

Depois de configurar, você pode:
1. Personalizar o template de email
2. Adicionar mais domínios
3. Configurar webhooks para tracking
4. Fazer upgrade do plano se necessário

---

**Dica:** Mantenha sua API Key segura! Nunca a compartilhe publicamente ou commite no Git.
