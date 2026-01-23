# 🔧 Atualizar SPF no GoDaddy - Passo a Passo

## ⚠️ Situação Atual

O SPF ainda não inclui `amazonses.com`. Precisa ser atualizado no GoDaddy.

**SPF Atual (incorreto):**
```
v=spf1 include:secureserver.net ~all
```

**SPF Necessário (correto):**
```
v=spf1 include:secureserver.net include:amazonses.com ~all
```

## 📋 Passo a Passo no GoDaddy

### 1. Acessar DNS Management

1. **Acesse:** https://www.godaddy.com
2. **Faça login** na sua conta
3. **Vá em:** "My Products" ou "Meus Produtos"
4. **Encontre:** `fabiobdaniel.com`
5. **Clique em:** "DNS" ou "Gerenciar DNS"

### 2. Localizar o Registro TXT SPF

1. **Procure na lista de registros DNS:**
   - Procure por um registro do tipo **TXT**
   - Com o nome **`@`** (ou vazio/root)
   - Que contenha **`v=spf1`** no valor

2. **Se encontrar:**
   - Clique no **ícone de lápis** (editar) ao lado do registro
   - OU clique nos **3 pontos** → **"Edit"**

3. **Se NÃO encontrar:**
   - Clique em **"Add"** ou **"Add Record"**
   - Selecione tipo **TXT**

### 3. Editar/Adicionar o SPF

**Configure assim:**

- **Tipo:** TXT
- **Nome/Host:** `@` (ou deixe em branco para root)
- **Valor:** `v=spf1 include:secureserver.net include:amazonses.com ~all`
- **TTL:** 1 Hora (ou Auto)

**⚠️ IMPORTANTE:**
- O valor deve incluir **AMBOS** `include:secureserver.net` e `include:amazonses.com`
- Não pode ter múltiplos registros SPF (se já existir um, edite o existente)

### 4. Salvar

1. **Clique em:** "Save" ou "Salvar"
2. **Confirme** se solicitado
3. **Aguarde** a confirmação de que foi salvo

### 5. Verificar se Foi Salvo

1. **Na lista de registros DNS:**
   - Procure pelo registro TXT que você acabou de editar/criar
   - **Verifique** se o valor mostra:
     ```
     v=spf1 include:secureserver.net include:amazonses.com ~all
     ```
   - Deve conter **`amazonses.com`** no valor

## 🔍 Verificar Propagação (Após Salvar)

### Aguarde 15-30 minutos

Depois de salvar, aguarde 15-30 minutos para a propagação DNS.

### Verificar no MXToolbox

1. **Acesse:** https://mxtoolbox.com/spf.aspx
2. **Digite:** `fabiobdaniel.com`
3. **Clique em:** "SPF Record Lookup"

### Resultado Esperado

O SPF deve mostrar:
```
v=spf1 include:secureserver.net include:amazonses.com ~all
```

**Na tabela parseada, deve aparecer:**
- ✅ `include:secureserver.net`
- ✅ `include:amazonses.com`
- ✅ Ambos presentes

## ⚠️ Problemas Comuns

### Problema 1: Não Consigo Editar o SPF

**Solução:**
- Se o SPF está gerenciado pelo Microsoft 365/Outlook:
  - Acesse: https://admin.microsoft.com
  - Vá em: Settings → Domains → `fabiobdaniel.com`
  - Edite o SPF lá

### Problema 2: Erro "Múltiplos SPF Records"

**Solução:**
- Você não pode ter múltiplos registros SPF
- **Remova** o SPF antigo primeiro
- **Depois** adicione o novo com `amazonses.com`

### Problema 3: Não Vejo o Registro TXT SPF

**Solução:**
- Pode estar em outra seção (Email Settings)
- Ou pode estar oculto
- Tente adicionar um novo registro TXT mesmo assim
- Se der erro, contate suporte do GoDaddy

## 📧 Após Atualizar

1. ✅ **Aguarde 15-30 minutos** para propagação
2. ✅ **Verifique** no MXToolbox que `amazonses.com` aparece
3. ✅ **Envie um novo email** de teste
4. ✅ **Verifique** no Resend Dashboard
5. ✅ **Status deve mudar** para "Delivered"

## 🆘 Precisa de Ajuda?

Se não conseguir editar:

1. **Contate suporte do GoDaddy**
2. **Explique:** Precisa atualizar SPF para incluir `include:amazonses.com`
3. **Forneça o valor:** `v=spf1 include:secureserver.net include:amazonses.com ~all`
