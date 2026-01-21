# Como Verificar se o Email Está Funcionando

## Status Atual

O código de envio de email está implementado, mas **precisa de configuração** na Vercel para funcionar.

## Verificação Rápida

### 1. Verificar Variáveis de Ambiente na Vercel

1. Acesse: https://vercel.com
2. Vá no seu projeto `AwakenYourHero`
3. Clique em **Settings** → **Environment Variables**
4. Verifique se existe:
   - `RESEND_API_KEY` (se usar Resend), OU
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (se usar SMTP)

### 2. Testar o Formulário

1. Acesse seu site na Vercel
2. Vá na página de contato
3. Preencha o formulário
4. Envie
5. Verifique:
   - Se aparece mensagem de sucesso
   - Se aparece erro no console do navegador (F12)
   - Se aparece erro nos logs da Vercel

### 3. Verificar Logs da Vercel

1. Na Vercel, vá em **Deployments**
2. Clique no último deploy
3. Vá em **Functions** → `/api/send-email`
4. Veja os logs para erros

## Configuração Necessária

### Opção 1: Resend (Mais Fácil - Recomendado)

1. Crie conta em: https://resend.com
2. Obtenha sua API Key
3. Na Vercel, adicione: `RESEND_API_KEY` = sua chave
4. **Importante**: Após adicionar, faça um novo deploy

### Opção 2: SMTP

Configure todas as variáveis:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## Problemas Comuns

❌ **"Failed to send email"**
- Variáveis de ambiente não configuradas
- API Key inválida
- Domínio não verificado no Resend

❌ **Erro 500**
- Verifique os logs da Vercel
- Verifique se o domínio está verificado no Resend

✅ **Funcionando**
- Mensagem de sucesso aparece
- Email chega em `contact@fabiobdaniel.com`
