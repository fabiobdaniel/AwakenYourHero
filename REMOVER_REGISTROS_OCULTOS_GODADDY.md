# 🗑️ Remover Registros DNS Ocultos no GoDaddy

## ⚠️ Problema Identificado

### Registro A Inválido Encontrado:

**Registro 2:**
- Tipo: `A`
- Nome: `@`
- Valor: `WebsiteBuilder Site` ❌ **INVÁLIDO!**
- **Este registro precisa ser DELETADO!**

**Um registro A deve ter um IP, não texto!**

---

## 🔍 Situação Atual

### Registros Visíveis:

1. ✅ **Registro A correto:** `@` → `216.198.79.1` (MANTER)
2. ❌ **Registro A inválido:** `@` → `WebsiteBuilder Site` (DELETAR)
3. ✅ **CNAME www:** Correto (MANTER)
4. ✅ **Outros registros:** NS, TXT, SOA (MANTER)

### Registros Ocultos (não aparecem na lista):

- ❌ `76.223.105.230` (ainda existe no DNS)
- ❌ `13.248.243.5` (ainda existe no DNS)

---

## 🔧 Solução: Remover Registro A Inválido

### Passo 1: Deletar Registro "WebsiteBuilder Site"

1. **Na lista de registros DNS**
2. **Encontre o registro:**
   - Tipo: `A`
   - Nome: `@`
   - Valor: `WebsiteBuilder Site`
3. **Clique no ícone de lixeira** (🗑️) ao lado desse registro
4. **Confirme** a exclusão

**Após deletar, você deve ter apenas:**
- ✅ Um registro A: `@` → `216.198.79.1`

---

## 🔍 Sobre Registros Ocultos

### Por Que Estão Ocultos?

Os registros A antigos (`76.223.105.230` e `13.248.243.5`) podem estar:

1. **Gerenciados por outro serviço:**
   - Website Builder do GoDaddy
   - Email do GoDaddy
   - Outro serviço do GoDaddy

2. **Em uma zona DNS diferente:**
   - Pode estar em "Advanced DNS" ou "Zone Editor"
   - Pode estar em configurações de outro produto

3. **Bloqueados pela interface:**
   - Alguns registros são gerenciados automaticamente
   - Não aparecem na interface padrão

---

## 🔧 Como Remover Registros Ocultos

### Opção 1: Desativar Website Builder

Se o registro "WebsiteBuilder Site" está relacionado ao Website Builder:

1. **Acesse:** Meus Produtos → Website Builder
2. **Desative** ou **remova** o Website Builder
3. **Isso pode remover** os registros DNS relacionados

### Opção 2: Contatar Suporte GoDaddy

**Melhor opção para remover registros ocultos:**

1. **Acesse:** https://www.godaddy.com/help
2. **Clique em:** "Falar com Suporte" ou "Contact Support"
3. **Escolha:** Chat ou Telefone
4. **Peça para:**
   - "Remover todos os registros A do domínio awakenyourhero.com.br, exceto o registro A com IP 216.198.79.1"
   - "Remover registros A ocultos com IPs 76.223.105.230 e 13.248.243.5"
   - "Manter apenas o registro A com IP 216.198.79.1"

### Opção 3: Usar API do GoDaddy (Avançado)

Se você tem acesso à API do GoDaddy:

1. **Liste todos os registros** via API
2. **Identifique** os registros A antigos
3. **Delete** via API

**Requer conhecimento técnico e credenciais da API.**

---

## 📋 Passo a Passo Completo

### 1. Deletar Registro "WebsiteBuilder Site"

1. ✅ **Encontre** o registro A com valor "WebsiteBuilder Site"
2. ✅ **Clique** no ícone de lixeira (🗑️)
3. ✅ **Confirme** a exclusão

### 2. Verificar se Restou Apenas 1 Registro A

Após deletar, você deve ter apenas:
- ✅ Tipo A | Nome @ | Valor `216.198.79.1`

### 3. Contatar Suporte para Registros Ocultos

1. ✅ **Contate suporte do GoDaddy**
2. ✅ **Peça para remover** registros A ocultos
3. ✅ **Forneça os IPs:** `76.223.105.230` e `13.248.243.5`

### 4. Aguardar Propagação

1. ⏳ **Aguarde 15-60 minutos**
2. 🔄 **Verifique DNS:**
   ```bash
   dig @ns59.domaincontrol.com awakenyourhero.com.br A +short
   ```
3. ✅ **Quando mostrar apenas `216.198.79.1`:** DNS está correto

### 5. Verificar no Vercel

1. ✅ **Clique em "Refresh"** no Vercel
2. ✅ **Aguarde** alguns minutos
3. ✅ **Status deve mudar** para "Valid Configuration"

---

## ✅ Checklist

- [ ] Deletei registro A com valor "WebsiteBuilder Site"
- [ ] Verifiquei que restou apenas 1 registro A (`216.198.79.1`)
- [ ] Contatei suporte do GoDaddy para remover registros ocultos
- [ ] Aguardei 15-60 minutos para propagação
- [ ] Verifiquei DNS com `dig`
- [ ] Cliquei em "Refresh" no Vercel
- [ ] Status mudou para "Valid Configuration"

---

## 🎯 Resumo

**O que fazer AGORA:**

1. ✅ **DELETE** o registro A com valor "WebsiteBuilder Site"
2. ✅ **CONTATE** suporte do GoDaddy para remover registros ocultos
3. ✅ **AGUARDE** propagação DNS (15-60 minutos)
4. ✅ **REFRESH** no Vercel

**O registro "WebsiteBuilder Site" é inválido e precisa ser deletado!** 🗑️

---

**Delete o registro "WebsiteBuilder Site" e contate suporte para remover os ocultos!** 🚀
