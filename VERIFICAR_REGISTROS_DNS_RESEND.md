# 🔍 Verificar Registros DNS do Resend

## 📋 Situação

Os registros DNS do Resend parecem ter desaparecido após a verificação.

## ⚠️ Importante

Os registros do Resend devem estar no **subdomínio `send`**, não no root (`@`).

## 🔍 Registros Necessários

### 1. TXT `resend._domainkey` (no root)
- **Nome:** `resend._domainkey`
- **Tipo:** TXT
- **Valor:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBIQKBgQDUb3pfdUFfYDEwIkALEqaoaeADFOINGCvU/iftlE3JT7AHxkHhE03hH9Bp31j+aMrmEuKWtQvuoLdJNFHjd2kQBLA5jIQcv+9qj/E9nfBkqgOPUqZDeMtJXHr0ZWKZP8yxGtsgiiyvzKaoiYXy3ifVxAhM5KA0M8fdnNMFTn22rQIDAQAB`
- **Onde:** Root do domínio

### 2. MX `send` (no subdomínio)
- **Nome:** `send`
- **Tipo:** MX
- **Valor:** `feedback-smtp.sa-east-1.amazonses.com`
- **Prioridade:** `10`
- **Onde:** Subdomínio `send`

### 3. TXT `send` (no subdomínio)
- **Nome:** `send`
- **Tipo:** TXT
- **Valor:** `v=spf1 include:amazonses.com ~all`
- **Onde:** Subdomínio `send`

### 4. TXT `@` SPF (no root) - PRECISA ATUALIZAR
- **Nome:** `@`
- **Tipo:** TXT
- **Valor atual:** (não aparece na lista)
- **Valor necessário:** `v=spf1 include:secureserver.net include:amazonses.com ~all`

## ✅ Como Verificar

### No Painel DNS do GoDaddy

1. **Verifique registros do root (`@`):**
   - Procure por TXT `resend._domainkey`
   - Procure por TXT com SPF (`v=spf1...`)

2. **Verifique registros do subdomínio `send`:**
   - Procure por MX `send`
   - Procure por TXT `send`
   - **Importante:** No GoDaddy, você pode precisar criar o subdomínio `send` primeiro

### Usando Ferramentas Online

1. **Verificar TXT `resend._domainkey`:**
   - https://mxtoolbox.com/TXTLookup.aspx
   - Digite: `resend._domainkey.fabiobdaniel.com`

2. **Verificar MX `send`:**
   - https://mxtoolbox.com/MXLookup.aspx
   - Digite: `send.fabiobdaniel.com`

3. **Verificar TXT `send`:**
   - https://mxtoolbox.com/TXTLookup.aspx
   - Digite: `send.fabiobdaniel.com`

## 🔧 Se os Registros Desapareceram

### Re-adicionar Registros

1. **TXT `resend._domainkey` (root):**
   - No painel DNS, adicione:
   - Tipo: TXT
   - Nome: `resend._domainkey`
   - Valor: (copie do Resend Dashboard)

2. **MX `send` (subdomínio):**
   - No painel DNS, adicione:
   - Tipo: MX
   - Nome: `send`
   - Valor: `feedback-smtp.sa-east-1.amazonses.com`
   - Prioridade: `10`

3. **TXT `send` (subdomínio):**
   - No painel DNS, adicione:
   - Tipo: TXT
   - Nome: `send`
   - Valor: `v=spf1 include:amazonses.com ~all`

4. **TXT `@` SPF (root):**
   - No painel DNS, adicione ou edite:
   - Tipo: TXT
   - Nome: `@`
   - Valor: `v=spf1 include:secureserver.net include:amazonses.com ~all`

## 📝 Nota sobre Subdomínios no GoDaddy

No GoDaddy, você pode precisar:
1. Criar o subdomínio `send` primeiro
2. Ou adicionar os registros diretamente com o nome `send`

## ✅ Verificação Final

Após re-adicionar os registros:

1. **Aguarde 15-30 minutos** para propagação
2. **Verifique com mxtoolbox.com** se os registros estão propagados
3. **Verifique no Resend Dashboard** se o status continua "Verified"
4. **Teste o envio de email** novamente
