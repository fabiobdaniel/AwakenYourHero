# 🗑️ Como Deletar Conta no Resend.com

## Passo a Passo para Deletar a Conta

### 1. Acesse o Resend Dashboard
1. Vá para: **https://resend.com**
2. Faça login com sua conta (Gmail)

### 2. Vá em Settings (Configurações)
1. Clique no seu **perfil/avatar** no canto superior direito
2. Selecione **"Settings"** ou **"Account Settings"**
3. Ou acesse diretamente: **https://resend.com/settings**

### 3. Encontre a Opção de Deletar Conta
1. Role até o final da página de Settings
2. Procure por uma seção chamada:
   - **"Danger Zone"** (Zona de Perigo)
   - **"Delete Account"** (Deletar Conta)
   - **"Account Deletion"** (Exclusão de Conta)
   - Ou similar

### 4. Deletar a Conta
1. Clique no botão **"Delete Account"** ou **"Delete My Account"**
2. Você será solicitado a:
   - Confirmar sua senha (se tiver)
   - Digitar "DELETE" ou confirmar de outra forma
   - Ler avisos sobre o que será deletado
3. Confirme a exclusão

## ⚠️ O Que Será Deletado

Quando você deletar a conta, **TUDO** será removido permanentemente:
- ✅ Todas as API Keys
- ✅ Todos os domínios verificados
- ✅ Todo o histórico de emails enviados
- ✅ Todas as configurações
- ✅ Dados da conta

**Isso é PERMANENTE e IRREVERSÍVEL!**

## ⚠️ Antes de Deletar - Checklist

Se você está usando o Resend no seu site:

- [ ] **Remova a API Key da Vercel:**
  - Vercel Dashboard → Settings → Environment Variables
  - Delete ou desabilite `RESEND_API_KEY`
  - Faça redeploy

- [ ] **Configure outro serviço de email** (se necessário):
  - SMTP (Gmail, SendGrid, etc.)
  - Ou outro serviço como Resend

- [ ] **Teste o novo serviço** antes de deletar a conta

## Alternativa: Manter a Conta

Se você só quer parar de usar temporariamente:

1. **Não precisa deletar a conta**
2. Apenas remova a API Key da Vercel
3. A conta ficará inativa (sem custos no plano gratuito)
4. Você pode voltar a usar depois

## Se Não Encontrar a Opção

Alguns serviços não têm opção direta de deletar conta. Nesses casos:

### Opção 1: Contatar Suporte
1. Acesse: **https://resend.com/support** ou **https://resend.com/contact**
2. Envie uma mensagem pedindo para deletar a conta
3. Forneça:
   - Email da conta
   - Razão (opcional)
   - Confirmação de que quer deletar

### Opção 2: Verificar Documentação
1. Acesse: **https://resend.com/docs**
2. Procure por "delete account" ou "account deletion"
3. Siga as instruções oficiais

### Opção 3: Email Direto
Envie email para: **support@resend.com** ou **hello@resend.com**

## Depois de Deletar

Se você deletou a conta mas ainda tem a API Key na Vercel:

1. **Remova imediatamente** a `RESEND_API_KEY` da Vercel
2. **Configure outro serviço** de email
3. **Faça redeploy** na Vercel

## Alternativas ao Resend

Se você quer usar outro serviço:

### Opção 1: SMTP (Gmail, Outlook, etc.)
- Configure na Vercel com variáveis SMTP
- Veja `EMAIL_SETUP.md` para instruções

### Opção 2: SendGrid
- Similar ao Resend
- Plano gratuito: 100 emails/dia

### Opção 3: Mailgun
- Plano gratuito disponível
- Similar ao Resend

### Opção 4: AWS SES
- Muito barato
- Requer configuração mais complexa

## Importante

- ⚠️ **Deletar a conta é PERMANENTE**
- ⚠️ Você não poderá recuperar nada depois
- ⚠️ Se tiver domínios verificados, precisará verificar novamente em outra conta
- ✅ O plano gratuito não tem custos, então não há problema em manter a conta

## Recomendação

**Se você só quer parar de usar:**
- Não delete a conta
- Apenas remova a API Key da Vercel
- Mantenha a conta para uso futuro (sem custos)

**Só delete se:**
- Você realmente não quer mais usar o Resend
- Você criou a conta por engano
- Você tem razões de privacidade específicas

---

**Dica:** Se você criou a conta com Gmail mas quer usar outro email, você pode:
- Manter a conta do Resend
- Criar uma nova conta com outro email
- Ou simplesmente continuar usando a conta atual (o email de login não afeta o envio de emails)
