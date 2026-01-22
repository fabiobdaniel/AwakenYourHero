# 🔧 Troubleshooting: API Key do Resend Inválida

Se a API key continua aparecendo como inválida mesmo após recriar, siga estes passos:

---

## ✅ Checklist de Verificação

### 1. Verificar se a API Key foi copiada corretamente

**O que verificar:**
- A API key deve começar com `re_`
- Não deve ter espaços no início ou fim
- Deve ter aproximadamente 51-52 caracteres
- Não deve ter quebras de linha

**Como verificar na Vercel:**
1. Vercel Dashboard → Settings → Environment Variables
2. Clique em `RESEND_API_KEY`
3. Verifique se começa com `re_` e não tem espaços

---

### 2. Verificar se está configurada em TODOS os ambientes

**IMPORTANTE:** A variável deve estar marcada para:
- ✅ Production
- ✅ Preview  
- ✅ Development

**Como verificar:**
1. Vercel Dashboard → Settings → Environment Variables
2. Veja a coluna "Environments" da variável `RESEND_API_KEY`
3. Deve mostrar: `Production, Preview, Development`

**Se não estiver em todos:**
- Clique em "Edit"
- Marque todas as três opções
- Salve

---

### 3. Fazer REDEPLOY após adicionar/editar a variável

**CRÍTICO:** Variáveis de ambiente só são aplicadas em novos deploys!

**Passos:**
1. Vercel Dashboard → Deployments
2. Clique nos três pontos (⋮) no último deploy
3. Selecione "Redeploy"
4. Aguarde o deploy terminar completamente

**NÃO adicione a variável e espere que funcione** - sempre faça redeploy!

---

### 4. Verificar se a API Key está ativa no Resend

**Como verificar:**
1. Acesse: https://resend.com/api-keys
2. Faça login
3. Veja a lista de API Keys
4. Verifique se a key que você criou está na lista
5. Verifique se não está marcada como "Revoked" ou "Expired"

**Se estiver revogada:**
- Delete a key antiga
- Crie uma nova
- Copie imediatamente
- Atualize na Vercel
- Faça redeploy

---

### 5. Verificar permissões da API Key

**A API Key deve ter:**
- ✅ Permissão "Send emails" marcada
- ❌ Não precisa de "Full Access" (mas pode ter)

**Como verificar:**
1. Resend → API Keys
2. Clique na sua API Key
3. Veja as permissões
4. Se não tiver "Send emails", delete e crie uma nova

---

### 6. Verificar logs detalhados

Após fazer redeploy, acesse:
```
https://seu-dominio.vercel.app/api/email-status
```

Agora você verá informações detalhadas:
- `apiKeyLength`: tamanho da key
- `apiKeyPrefix`: primeiros 3 caracteres
- `apiKeyStartsWithRe`: se começa com `re_`
- `testResponseStatus`: status da resposta do Resend
- `testError`: se houver erro

**O que procurar:**
- Se `apiKeyStartsWithRe` é `false` → key foi copiada errada
- Se `testResponseStatus` é `401` → key inválida
- Se `testResponseStatus` é `403` → key sem permissões
- Se `testResponseStatus` é `200` → key válida! ✅

---

### 7. Testar a API Key diretamente

Você pode testar a API key diretamente usando curl ou Postman:

```bash
curl -X GET "https://api.resend.com/domains" \
  -H "Authorization: Bearer re_SUA_API_KEY_AQUI"
```

**Resposta esperada:**
- `200 OK` → Key válida ✅
- `401 Unauthorized` → Key inválida ❌
- `403 Forbidden` → Key sem permissões ❌

---

## 🔍 Problemas Comuns e Soluções

### Problema: "API key appears to be invalid" mas está correta

**Possíveis causas:**
1. Variável não foi aplicada no deploy → **Solução:** Fazer redeploy
2. Variável está só em Development → **Solução:** Marcar todos os ambientes
3. Key foi copiada com espaços → **Solução:** Recopiar sem espaços
4. Key foi criada em outra conta → **Solução:** Verificar conta do Resend

---

### Problema: Funciona localmente mas não na Vercel

**Causa:** Variável de ambiente não configurada na Vercel

**Solução:**
1. Verificar se `RESEND_API_KEY` existe na Vercel
2. Verificar se está em todos os ambientes
3. Fazer redeploy

---

### Problema: Key válida mas emails não chegam

**Isso é diferente!** Se a key está válida (`apiKeyValid: true`), o problema não é a key.

**Verifique:**
- Logs da função `/api/send-email` na Vercel
- Se o email está sendo enviado (veja logs)
- Se há erros do Resend nos logs
- Caixa de spam do destinatário

---

## 📋 Passo a Passo Completo

1. ✅ Acesse https://resend.com/api-keys
2. ✅ Delete a API Key antiga (se existir)
3. ✅ Crie uma nova API Key
   - Nome: `Awaken Your Hero`
   - Permissões: "Send emails"
4. ✅ Copie a key IMEDIATAMENTE (começa com `re_`)
5. ✅ Vercel Dashboard → Settings → Environment Variables
6. ✅ Delete a variável `RESEND_API_KEY` antiga (se existir)
7. ✅ Adicione nova variável `RESEND_API_KEY`
8. ✅ Cole a key (sem espaços!)
9. ✅ Marque: Production, Preview, Development
10. ✅ Salve
11. ✅ Vercel → Deployments → ⋮ → Redeploy
12. ✅ Aguarde deploy terminar
13. ✅ Acesse `/api/email-status` e verifique

---

## 🆘 Se ainda não funcionar

Me envie:
1. O JSON completo de `/api/email-status`
2. Screenshot das Environment Variables (sem mostrar a key completa)
3. Screenshot da página de API Keys no Resend (sem mostrar a key completa)
4. Logs da função `/api/send-email` quando você tenta enviar

Com essas informações, consigo identificar o problema exato.
