# Email Setup Instructions

## Configuração do Envio de Email

O formulário de contato está configurado para enviar emails para `contact@fabiobdaniel.com`.

### Opção 1: Usando Resend (Recomendado)

1. Crie uma conta em [Resend](https://resend.com)
2. Obtenha sua API Key
3. **Configure o domínio** (importante):
   - Vá em [Resend Dashboard → Domains](https://resend.com/domains)
   - Adicione e verifique o domínio `awakenyourhero.com` (ou outro domínio que você controle)
   - Ou use temporariamente `onboarding@resend.dev` para testes
4. Na Vercel, vá em Settings → Environment Variables
5. Adicione:
   - `RESEND_API_KEY` = sua chave da API Resend
   - `RESEND_FROM_EMAIL` = email remetente (ex: `Awaken Your Hero <noreply@awakenyourhero.com>` ou `onboarding@resend.dev` para testes)

### Opção 2: Usando SMTP

1. Configure as seguintes variáveis de ambiente na Vercel:
   - `SMTP_HOST` = seu servidor SMTP (ex: smtp.gmail.com)
   - `SMTP_PORT` = porta (ex: 587)
   - `SMTP_SECURE` = true ou false
   - `SMTP_USER` = seu email
   - `SMTP_PASS` = sua senha
   - `SMTP_FROM` = email remetente

## Funcionalidades Implementadas

✅ **Código de País no Telefone**
- Seletor de código de país adicionado ao campo de telefone
- Suporta múltiplos países (US, BR, UK, FR, DE, ES, IT, PT, MX, AR, CL, CO)
- Padrão: Brasil (+55)

✅ **Envio de Email**
- Formulário envia email para `contact@fabiobdaniel.com`
- Inclui todos os campos: nome, email, telefone (com código), interesse e mensagem
- Feedback visual durante o envio

## Teste Local

Para testar localmente, você precisará configurar as variáveis de ambiente ou usar um serviço de email de teste.
