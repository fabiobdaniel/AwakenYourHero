# 📧 Guia Completo: Configurar Resend + Vercel

Este guia explica passo a passo como configurar o envio de email do formulário de contato usando **Resend** (serviço de email) e **Vercel** (hospedagem).

---

## 🎯 O que vamos fazer

1. **Criar conta no Resend** e obter uma API Key
2. **Configurar variáveis de ambiente na Vercel** com a API Key
3. **Fazer redeploy** para aplicar as configurações
4. **Testar** o formulário de contato

---

## 📝 Passo 1: Criar Conta no Resend

### 1.1 Acessar o Resend
1. Abra: **https://resend.com**
2. Clique em **"Sign Up"** ou **"Get Started"**

### 1.2 Criar a conta
- Você pode usar:
  - **Email do Google** (botão "Continue with Google")
  - **Email do GitHub** (botão "Continue with GitHub")
  - **Email normal** (preencha nome, email, senha)

### 1.3 Confirmar email (se necessário)
- Se usar email normal, verifique sua caixa de entrada e clique no link de confirmação

---

## 🔑 Passo 2: Obter API Key no Resend

### 2.1 Acessar API Keys
1. Após fazer login no Resend
2. No menu lateral esquerdo, clique em **"API Keys"**
   - Ou acesse diretamente: **https://resend.com/api-keys**

### 2.2 Criar nova API Key
1. Clique no botão **"Create API Key"** (geralmente no canto superior direito)
2. Preencha:
   - **Name:** Dê um nome descritivo (ex: `Awaken Your Hero - Vercel`)
   - **Permissions:** Selecione:
     - ✅ **Send emails** (obrigatório)
     - ✅ **Read domains** (opcional, mas útil)
3. Clique em **"Add"** ou **"Create"**

### 2.3 Copiar a API Key
⚠️ **IMPORTANTE:** A API Key aparece **apenas uma vez**!

1. Você verá uma chave que começa com `re_` (exemplo: `re_1234567890abcdefghijklmnopqrstuvwxyz`)
2. **Copie imediatamente** e guarde em local seguro
3. Se perder, terá que criar uma nova

**Dica:** Cole em um editor de texto temporário antes de fechar a janela.

---

## ⚙️ Passo 3: Configurar na Vercel

### 3.1 Acessar o projeto na Vercel
1. Abra: **https://vercel.com/dashboard**
2. Faça login (se necessário)
3. Na lista de projetos, encontre e clique em **"AwakenYourHero"**

### 3.2 Abrir Environment Variables
1. No menu superior, clique em **"Settings"**
2. No menu lateral esquerdo, clique em **"Environment Variables"**

### 3.3 Adicionar RESEND_API_KEY
1. Clique no botão **"Add New"** (ou **"Add"**)
2. Preencha:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Cole a API Key que você copiou do Resend (a que começa com `re_`)
   - **Environment:** Marque **todas** as opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Clique em **"Save"**

### 3.4 Adicionar RESEND_FROM_EMAIL (Opcional, mas recomendado)
1. Clique em **"Add New"** novamente
2. Preencha:
   - **Name:** `RESEND_FROM_EMAIL`
   - **Value:** 
     - **Para testes:** `onboarding@resend.dev`
     - **Para produção (se tiver domínio verificado):** `Awaken Your Hero <noreply@awakenyourhero.com>`
   - **Environment:** Marque **todas** as opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Clique em **"Save"**

**Nota:** Se você não adicionar `RESEND_FROM_EMAIL`, o sistema usará `onboarding@resend.dev` automaticamente (funciona para testes).

---

## 🔄 Passo 4: Fazer Redeploy na Vercel

As variáveis de ambiente só são aplicadas quando você faz um novo deploy.

### 4.1 Ir para Deployments
1. No menu superior, clique em **"Deployments"**
2. Você verá uma lista de todos os deploys

### 4.2 Fazer Redeploy
1. Encontre o **último deployment** (geralmente o primeiro da lista)
2. Clique nos **3 pontos** (⋯) à direita do deployment
3. No menu que aparece, clique em **"Redeploy"**
4. Uma janela pode aparecer pedindo confirmação — clique em **"Redeploy"** novamente

### 4.3 Aguardar o deploy
- Você verá o status mudando: "Building..." → "Ready"
- Isso pode levar de 30 segundos a alguns minutos
- Quando aparecer **"Ready"** (com check verde), está pronto!

---

## ✅ Passo 5: Testar o Formulário

### 5.1 Acessar o site
1. Na Vercel, vá em **"Deployments"**
2. Clique no deployment mais recente (status "Ready")
3. Clique no **link do domínio** (ex: `awakenyourhero.vercel.app`) para abrir o site

### 5.2 Testar o formulário
1. No site, vá na página **"Contact"** (ou `/contact`)
2. Preencha o formulário:
   - **Full Name:** Seu nome
   - **Phone:** 11999999999 (com o seletor de país 🇺🇸 ou 🇧🇷)
   - **Email:** seu-email@exemplo.com
   - **I'm Interested In:** Selecione uma opção
   - **Message:** Mensagem de teste
3. Clique em **"Send Message"**

### 5.3 Verificar se funcionou
**✅ Funcionou se:**
- Aparecer o alert: *"Message sent successfully! We will get back to you soon."*
- O formulário for limpo
- Você receber o email em **contact@fabiobdaniel.com**

**❌ Não funcionou se:**
- Aparecer erro: *"Email service not configured"* ou *"Failed to send email"*
- Veja a seção "Troubleshooting" abaixo

---

## 🔍 Troubleshooting (Solução de Problemas)

### ❌ Erro: "Email service not configured"

**Causa:** A variável `RESEND_API_KEY` não está configurada ou não foi aplicada.

**Solução:**
1. Vercel → **Settings** → **Environment Variables**
2. Verifique se `RESEND_API_KEY` existe e tem o valor correto
3. Se não existir, adicione (Passo 3.3)
4. Se existir, faça **Redeploy** (Passo 4)

---

### ❌ Erro: "Domain not verified" ou "Invalid from address"

**Causa:** O email remetente não está verificado no Resend.

**Solução:**
1. Use temporariamente `onboarding@resend.dev`:
   - Vercel → **Settings** → **Environment Variables**
   - Edite `RESEND_FROM_EMAIL` (ou crie se não existir)
   - Valor: `onboarding@resend.dev`
   - Salve e faça **Redeploy**

2. **OU** verifique seu domínio no Resend:
   - Resend → **Domains** → **Add Domain**
   - Siga as instruções para adicionar registros DNS
   - Depois use: `Awaken Your Hero <noreply@seu-dominio.com>`

---

### ❌ Erro: "Unauthorized" ou "Invalid API key"

**Causa:** A API Key está incorreta ou foi revogada.

**Solução:**
1. Resend → **API Keys**
2. Crie uma nova API Key
3. Vercel → **Settings** → **Environment Variables**
4. Edite `RESEND_API_KEY` e cole a nova chave
5. Salve e faça **Redeploy**

---

### ❌ Erro: "Rate limit exceeded"

**Causa:** Você atingiu o limite de emails do plano gratuito (100 emails/dia).

**Solução:**
- Aguarde 24 horas ou faça upgrade do plano no Resend

---

## 📊 Verificar se está configurado corretamente

### Opção 1: Página de diagnóstico
1. Acesse: `https://seu-site.vercel.app/test-email.html`
2. Clique em **"🔄 Refresh Status"**
3. Deve mostrar:
   - ✅ **Resend is configured**
   - ✅ **API Key: Configured**
   - ✅ **API Key Valid: Valid**

### Opção 2: Logs na Vercel
1. Vercel → **Deployments** → último deployment
2. Clique em **"Functions"** → `/api/send-email`
3. Clique em **"View Function Logs"**
4. Envie o formulário e veja os logs — deve mostrar:
   - `RESEND_API_KEY configured: true`
   - `Sending email via Resend: ...`
   - `Email sent successfully: ...`

---

## 📋 Checklist Final

Antes de considerar que está tudo configurado:

- [ ] Conta criada no Resend.com
- [ ] API Key criada e copiada
- [ ] `RESEND_API_KEY` adicionada na Vercel (com a chave correta)
- [ ] `RESEND_FROM_EMAIL` adicionada na Vercel (ou usando padrão)
- [ ] Variáveis aplicadas a **Production, Preview e Development**
- [ ] **Redeploy** feito na Vercel
- [ ] Deploy concluído (status "Ready")
- [ ] Formulário testado e funcionando
- [ ] Email recebido em contact@fabiobdaniel.com

---

## 🔗 Links Úteis

- **Resend Dashboard:** https://resend.com
- **Resend API Keys:** https://resend.com/api-keys
- **Resend Domains:** https://resend.com/domains
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentação Resend:** https://resend.com/docs

---

## 💡 Dicas

1. **Plano Gratuito do Resend:**
   - 3.000 emails/mês
   - 100 emails/dia
   - Perfeito para começar!

2. **Domínio de Teste:**
   - `onboarding@resend.dev` funciona imediatamente
   - Não precisa verificar domínio para testes

3. **Para Produção:**
   - Verifique seu domínio no Resend
   - Use um email do seu domínio (ex: `noreply@awakenyourhero.com`)
   - Isso melhora a entrega e evita spam

4. **Segurança:**
   - Nunca compartilhe sua API Key publicamente
   - Não commite a API Key no Git
   - Use apenas variáveis de ambiente na Vercel

---

## 🎉 Pronto!

Depois de seguir todos os passos, o formulário de contato estará funcionando e enviando emails automaticamente para **contact@fabiobdaniel.com** sempre que alguém preencher e enviar o formulário.

Se tiver alguma dúvida ou problema, consulte os logs na Vercel ou a documentação do Resend.
