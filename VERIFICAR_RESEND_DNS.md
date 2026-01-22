# 🔍 Como Verificar Resend.com e DNS

## ⚠️ Problema: "Message Sent!" mas email não chega

Se aparece "Message Sent!" mas o email não está sendo enviado, siga estes passos:

---

## 📋 Passo 1: Verificar Logs no Resend

### 1.1 Acesse os Logs
1. Vá para: **https://resend.com/logs**
2. Procure pela tentativa mais recente de envio
3. Clique no log para ver detalhes

### 1.2 O que verificar:
- ✅ **Status 200** = API aceitou o email
- ❌ **Status 403** = Problema de domínio (veja Passo 2)
- ❌ **Status 400/422** = Dados inválidos
- ❌ **Status 401** = API Key inválida

### 1.3 Se Status for 200:
- Verifique se aparece um **ID do email** (ex: `re_abc123...`)
- Se aparecer ID, o email foi **enviado** mas pode estar:
  - Na caixa de **spam**
  - **Bloqueado** pelo provedor de email
  - **Ainda em processamento** (aguarde alguns minutos)

---

## 📋 Passo 2: Verificar Domínio no Resend

### 2.1 Acesse Domains
1. Vá para: **https://resend.com/domains**
2. Veja se há algum domínio listado

### 2.2 Se NÃO há domínio verificado:
**Problema:** Você está usando `onboarding@resend.dev` que só pode enviar para seu email do Resend.

**Solução:**
- Opção A: Verificar um domínio (veja Passo 3)
- Opção B: Mudar temporariamente o destinatário para seu email do Resend

### 2.3 Se HÁ domínio listado:
1. Verifique o **status**:
   - ✅ **Verificado** (verde) = OK
   - ⚠️ **Pendente** = Aguardando DNS
   - ❌ **Falhou** = DNS incorreto

2. Se estiver **Pendente** ou **Falhou**, veja Passo 3

---

## 📋 Passo 3: Verificar e Configurar DNS

### 3.1 Se você NÃO tem domínio verificado:

#### A. Escolha um domínio
Você precisa ter um domínio próprio. Exemplos:
- `awakenyourhero.com`
- `fabiobdaniel.com`
- Qualquer domínio que você tenha

#### B. Adicione no Resend
1. Vá para: **https://resend.com/domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio
4. Clique em **"Add"**

#### C. Configure DNS
O Resend mostrará registros DNS. Você precisa adicionar **todos** eles:

**Onde adicionar:**
- Acesse o painel do seu provedor de domínio:
  - **GoDaddy** → DNS Management
  - **Namecheap** → Advanced DNS
  - **Cloudflare** → DNS
  - **Registro.br** → DNS
  - Outros → Procure por "DNS Settings"

**O que adicionar:**
1. **1 registro TXT** (verificação do domínio)
   - Nome: `@` ou vazio
   - Valor: copie exatamente do Resend
   
2. **3 registros CNAME** (DKIM - autenticação)
   - Nome: copie do Resend (ex: `resend._domainkey`)
   - Valor: copie do Resend
   
3. **1 registro TXT** (SPF)
   - Nome: `@` ou vazio
   - Valor: `v=spf1 include:resend.com ~all`
   
4. **1 registro TXT** (DMARC - opcional mas recomendado)
   - Nome: `_dmarc`
   - Valor: `v=DMARC1; p=none;`

**⚠️ IMPORTANTE:**
- Copie **exatamente** como mostrado no Resend
- Não adicione espaços extras
- Aguarde propagação DNS (pode levar de minutos até 48 horas)

#### D. Verifique no Resend
1. Volte ao Resend → **Domains**
2. Clique em **"Verify"** ao lado do seu domínio
3. Aguarde alguns minutos
4. Quando aparecer ✅ verde, está verificado!

### 3.2 Se você JÁ tem domínio mas está "Pendente" ou "Falhou":

#### A. Verifique os registros DNS
1. Use uma ferramenta de verificação DNS:
   - **https://mxtoolbox.com/SuperTool.aspx**
   - **https://dnschecker.org**
   - **https://www.whatsmydns.net**

2. Digite seu domínio e verifique:
   - Os registros TXT estão corretos?
   - Os registros CNAME estão corretos?
   - Os valores estão exatamente como no Resend?

#### B. Corrija os registros
1. Compare os registros no seu provedor DNS com os do Resend
2. Corrija qualquer diferença
3. Aguarde propagação (alguns minutos)
4. Tente verificar novamente no Resend

---

## 📋 Passo 4: Verificar Variáveis de Ambiente na Vercel

### 4.1 Acesse Vercel
1. Vá para: **https://vercel.com/dashboard**
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**

### 4.2 Verifique as variáveis:

#### `RESEND_API_KEY`
- ✅ Deve estar configurada
- ✅ Valor deve começar com `re_` (ex: `re_abc123...`)
- ✅ Deve ser a mesma chave do Resend

#### `RESEND_FROM_EMAIL` (opcional mas recomendado)
- Se você tem domínio verificado:
  - ✅ Deve usar o domínio verificado
  - ✅ Exemplo: `noreply@seu-dominio.com`
- Se você NÃO tem domínio verificado:
  - ⚠️ Pode deixar vazio (usará `onboarding@resend.dev`)
  - ⚠️ Mas só pode enviar para seu email do Resend

### 4.3 Após alterar variáveis:
1. **Salve** as alterações
2. Vá em **Deployments**
3. Clique nos **3 pontos** (⋯) do último deployment
4. Clique em **"Redeploy"**
5. Aguarde o redeploy terminar

---

## 📋 Passo 5: Verificar Logs da Vercel

### 5.1 Acesse os Logs
1. Vercel Dashboard → Seu projeto → **Deployments**
2. Clique no deployment mais recente
3. Vá na aba **"Functions"**
4. Clique em **`/api/send-email`**
5. Veja os logs

### 5.2 O que procurar:
- ✅ `Email sent successfully: re_abc123...` = Email enviado com sucesso
- ❌ `Resend API error:` = Erro do Resend (veja a mensagem)
- ❌ `No email service configured` = Variáveis de ambiente não configuradas
- ❌ `Invalid Resend response` = Resposta inválida do Resend

### 5.3 Se aparecer erro:
- Copie a mensagem de erro completa
- Verifique qual passo acima está faltando

---

## 📋 Passo 6: Testar Novamente

### 6.1 Após corrigir tudo:
1. Faça um **redeploy** na Vercel
2. Aguarde alguns minutos
3. Teste o formulário novamente
4. Verifique:
   - Console do navegador (F12)
   - Logs do Resend
   - Logs da Vercel

### 6.2 Se ainda não funcionar:
1. Abra o **Console do navegador** (F12)
2. Envie o formulário
3. Veja as mensagens no console
4. Copie qualquer erro que aparecer
5. Verifique os logs do Resend e Vercel

---

## 🔍 Checklist Rápido

Marque cada item:

- [ ] **Resend API Key** configurada na Vercel
- [ ] **Domínio verificado** no Resend (se quiser enviar para qualquer email)
- [ ] **DNS configurado** corretamente (se tem domínio)
- [ ] **RESEND_FROM_EMAIL** usando domínio verificado (se tem domínio)
- [ ] **Redeploy** feito na Vercel após mudanças
- [ ] **Logs do Resend** mostram status 200 e ID do email
- [ ] **Logs da Vercel** mostram "Email sent successfully"
- [ ] **Console do navegador** mostra "Resend email ID"

---

## 🚨 Problemas Comuns

### "Status 403 - Testing domain restriction"
**Causa:** Usando `onboarding@resend.dev` e tentando enviar para email diferente do seu.
**Solução:** Verifique um domínio no Resend ou mude o destinatário para seu email do Resend.

### "Status 200 mas email não chega"
**Causa:** Email pode estar em spam ou bloqueado.
**Solução:** 
- Verifique a caixa de spam
- Verifique se o domínio está verificado
- Verifique os logs do Resend para ver status de entrega

### "Domínio pendente há muito tempo"
**Causa:** DNS não propagou ou registros incorretos.
**Solução:**
- Verifique os registros DNS com ferramenta online
- Compare com o que está no Resend
- Aguarde até 48 horas para propagação completa

### "Variáveis de ambiente não funcionam"
**Causa:** Não fez redeploy após adicionar variáveis.
**Solução:** Faça redeploy na Vercel após adicionar/editar variáveis.

---

## 🔗 Links Úteis

- **Resend Logs:** https://resend.com/logs
- **Resend Domains:** https://resend.com/domains
- **Resend API Keys:** https://resend.com/api-keys
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Verificar DNS:** https://mxtoolbox.com/SuperTool.aspx

---

## 📞 Próximos Passos

1. Siga os passos acima na ordem
2. Verifique cada item do checklist
3. Se ainda tiver problema, me diga:
   - Qual erro aparece nos logs do Resend?
   - Qual erro aparece nos logs da Vercel?
   - Qual erro aparece no console do navegador?
