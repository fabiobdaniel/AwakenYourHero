# 📝 Passo a Passo: Verificar Domínio no Resend

## 🎯 Objetivo

Verificar o domínio `fabiobdaniel.com` no Resend para poder enviar emails usando `contact@fabiobdaniel.com` como remetente.

## 📋 Passo 1: Verificar Status no Resend

1. **Acesse:** https://resend.com/domains
2. **Localize:** `fabiobdaniel.com` na lista
3. **Verifique o status:** Deve estar como "Pending" ou "Not Verified"

## 📋 Passo 2: Ver Instruções de DNS

1. **Clique no domínio** `fabiobdaniel.com` no dashboard do Resend
2. **Você verá** os registros DNS que precisa adicionar, algo como:

```
TXT Record:
Name: @
Value: resend-verification=abc123xyz...

CNAME Record:
Name: resend._domainkey
Value: resend-verification-key.resend.com
```

## 📋 Passo 3: Adicionar Registros DNS

### Onde Adicionar?

Você precisa adicionar esses registros no **provedor de DNS** onde você gerencia o domínio `fabiobdaniel.com`. Isso pode ser:

- **Registrador do domínio** (onde você comprou o domínio)
- **Serviço de DNS** (Cloudflare, Route 53, etc.)
- **Painel de controle do seu provedor de hospedagem**

### Como Adicionar?

1. **Acesse o painel DNS** do seu provedor
2. **Encontre a seção** de gerenciamento de registros DNS
3. **Adicione os registros** exatamente como o Resend forneceu:
   - **Tipo:** TXT
   - **Nome/Host:** `@` ou `fabiobdaniel.com` (depende do provedor)
   - **Valor:** O valor completo fornecido pelo Resend
   
   - **Tipo:** CNAME
   - **Nome/Host:** `resend._domainkey`
   - **Valor:** `resend-verification-key.resend.com`

4. **Salve** as alterações

## 📋 Passo 4: Aguardar Propagação

1. **A propagação DNS** pode levar de **alguns minutos a 48 horas**
2. **Normalmente leva:** 15 minutos a 2 horas
3. **Você pode verificar** o status no dashboard do Resend

## 📋 Passo 5: Verificar Status

1. **Volte para:** https://resend.com/domains
2. **Atualize a página** periodicamente
3. **O status mudará** de "Pending" para "Verified" quando estiver pronto

## ⚠️ Problemas Comuns

### Registros DNS não aparecem

- Verifique se você adicionou os registros corretamente
- Verifique se não há erros de digitação
- Aguarde mais tempo para propagação

### Status continua "Pending" após várias horas

- Verifique se os registros DNS estão corretos
- Use uma ferramenta de verificação DNS (como `dig` ou `nslookup`) para confirmar
- Entre em contato com o suporte do Resend

### Não sabe onde adicionar os registros DNS

- Verifique onde você comprou o domínio `fabiobdaniel.com`
- Verifique se está usando algum serviço de DNS (Cloudflare, etc.)
- Consulte a documentação do seu provedor de DNS

## 🔍 Ferramentas para Verificar DNS

Você pode verificar se os registros estão corretos usando:

```bash
# Verificar TXT record
dig TXT fabiobdaniel.com

# Verificar CNAME record
dig CNAME resend._domainkey.fabiobdaniel.com
```

Ou use ferramentas online:
- https://mxtoolbox.com/
- https://dnschecker.org/

## ✅ Após Verificação

Quando o domínio estiver "Verified":

1. **Configure no Vercel:**
   - Vercel Dashboard → Settings → Environment Variables
   - Adicione: `RESEND_FROM_EMAIL` = `Awaken Your Hero <contact@fabiobdaniel.com>`
   - Faça redeploy

2. **Teste novamente** o envio de emails

3. **Verifique** se o status muda para "Delivered" no Resend

## 📞 Precisa de Ajuda?

Se tiver dificuldades:
1. Me informe qual é o seu provedor de DNS
2. Me mostre os registros DNS que o Resend forneceu (sem valores sensíveis)
3. Me informe se consegue acessar o painel DNS
