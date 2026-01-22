# Configurar Resend + Vercel para o formulário de contato

O formulário envia para **contact@fabiobdaniel.com** via API na Vercel usando Resend.

---

## 1. Resend.com

### 1.1 Criar conta
- Acesse: **https://resend.com** → **Sign Up**
- Crie a conta (Google/GitHub ou email)

### 1.2 Obter API Key
- Menu lateral → **API Keys** (ou https://resend.com/api-keys)
- **Create API Key**
- Nome: ex. `Awaken Your Hero`
- Permissões: **Send emails**
- **Add** → **copie a chave** (ela só aparece uma vez)

---

## 2. Vercel – variáveis de ambiente

### 2.1 Abrir projeto
- **https://vercel.com/dashboard**
- Projeto **AwakenYourHero**
- **Settings** → **Environment Variables**

### 2.2 Adicionar variáveis

| Name | Value | Ambiente |
|------|--------|----------|
| `RESEND_API_KEY` | A API Key copiada do Resend | Production, Preview, Development |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (testes) ou `Awaken Your Hero <noreply@seu-dominio.com>` (se tiver domínio verificado) | Production, Preview, Development |

- **Add New** para cada uma
- Marque **Production**, **Preview** e **Development**
- **Save**

---

## 3. Redeploy na Vercel

- **Deployments** → ⋮ no último deploy → **Redeploy**
- Aguarde o deploy terminar

---

## 4. Testar

- Abra o site na Vercel
- Vá em **Contact**
- Preencha e clique em **Send Message**
- Deve aparecer “Message sent successfully!” e o email em **contact@fabiobdaniel.com**

---

## Se der erro

### “Email service not configured”
- `RESEND_API_KEY` não está na Vercel ou está em outro projeto
- Confira **Settings** → **Environment Variables** do projeto correto
- Depois faça **Redeploy**

### “Domain not verified” / “Invalid from address”
- Use `RESEND_FROM_EMAIL` = `onboarding@resend.dev` para testes
- Ou verifique o domínio em **Resend** → **Domains** e use um email desse domínio

### “Invalid API key”
- Gere uma nova API Key no Resend
- Atualize `RESEND_API_KEY` na Vercel e faça **Redeploy**

---

## Checklist

- [ ] Conta criada no Resend
- [ ] API Key criada e copiada
- [ ] `RESEND_API_KEY` adicionada na Vercel
- [ ] `RESEND_FROM_EMAIL` adicionada (ex.: `onboarding@resend.dev`)
- [ ] Redeploy feito na Vercel
- [ ] Teste no formulário de contato

---

**Links:** [Resend](https://resend.com) · [Resend API Keys](https://resend.com/api-keys) · [Vercel Dashboard](https://vercel.com/dashboard)
