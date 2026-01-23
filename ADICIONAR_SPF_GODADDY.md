# 🔧 Como Adicionar SPF no GoDaddy Quando Não Está Visível

## 📋 Situação

O registro SPF existe (verificado com mxtoolbox.com), mas não está visível no painel DNS do GoDaddy.

## 🔍 Possíveis Causas

1. **Gerenciado pelo Microsoft 365/Outlook**
   - O SPF pode estar sendo gerenciado automaticamente pelo Outlook
   - Pode estar em uma seção separada (Email Settings)

2. **Oculto na interface**
   - Alguns registros podem não aparecer na visualização padrão
   - Pode estar em uma seção avançada

3. **Adicionado por outro serviço**
   - Pode ter sido adicionado automaticamente pelo Outlook

## ✅ Soluções

### Solução 1: Adicionar Novo Registro TXT (Recomendado)

Mesmo que não apareça, você pode adicionar um novo registro TXT:

1. **No painel DNS do GoDaddy:**
   - Vá em: **DNS** ou **DNS Management**
   - Clique em: **"Add"** ou **"Add Record"**
   - Selecione: **TXT**

2. **Configure:**
   - **Tipo:** TXT
   - **Nome/Host:** `@` (ou deixe em branco para root)
   - **Valor:** `v=spf1 include:secureserver.net include:amazonses.com ~all`
   - **TTL:** 1 Hora (ou Auto)

3. **Salve**

**Nota:** Pode haver múltiplos registros TXT no root. Isso é normal e permitido.

### Solução 2: Verificar Email Settings

1. **No painel do GoDaddy:**
   - Vá em: **Email** ou **Microsoft 365**
   - Procure por: **DNS Settings** ou **Email DNS Records**
   - Verifique se o SPF está lá

### Solução 3: Editar via Microsoft 365

Se o email está gerenciado pelo Microsoft 365:

1. **Acesse:** https://admin.microsoft.com
2. **Vá em:** Settings → Domains
3. **Selecione:** `fabiobdaniel.com`
4. **Verifique/Edite:** DNS records
5. **Atualize o SPF** para incluir `include:amazonses.com`

### Solução 4: Usar API ou Ferramentas Avançadas

Se não conseguir pela interface:

1. **Contate suporte do GoDaddy**
2. **Ou use ferramentas de gerenciamento DNS avançadas**

## 📝 Verificação

Após adicionar:

1. **Aguarde 15-30 minutos** para propagação
2. **Verifique:** https://mxtoolbox.com/spf.aspx
   - Digite: `fabiobdaniel.com`
   - Deve mostrar: `include:secureserver.net` e `include:amazonses.com`
3. **Teste envio de email** novamente

## ⚠️ Importante

- **Múltiplos registros TXT SPF:** Não é permitido ter múltiplos registros SPF
- **Se já existir um SPF:** Você precisa **editar o existente**, não criar um novo
- **Se não conseguir editar:** Pode precisar remover o antigo e criar um novo

## 🔧 Se Não Conseguir Editar

1. **Tente adicionar um novo registro TXT** com o SPF completo
2. **Se der erro** (múltiplos SPF), você precisará:
   - Remover o SPF antigo primeiro
   - Ou editar o existente

## 📞 Precisa de Ajuda?

Se não conseguir encontrar ou editar o registro:

1. **Contate suporte do GoDaddy**
2. **Explique:** Precisa atualizar SPF para incluir `include:amazonses.com`
3. **Forneça o valor:** `v=spf1 include:secureserver.net include:amazonses.com ~all`
