# 🔍 Encontrar e Remover Registros DNS no GoDaddy

## 🎯 Objetivo

Remover os registros A antigos:
- ❌ `76.223.105.230`
- ❌ `13.248.243.5`

E manter apenas:
- ✅ `216.198.79.1`

---

## 📍 Onde Estão os Registros DNS no GoDaddy

### Passo 1: Acessar o Painel DNS

1. **Acesse:** https://www.godaddy.com
2. **Faça login** na sua conta
3. **Vá em:** "Meus Produtos" ou "My Products"
4. **Encontre** o domínio `awakenyourhero.com.br`
5. **Clique em:** "DNS" ou "Gerenciar DNS"

---

## 🔍 Método 1: Lista de Registros DNS

### No Painel DNS:

1. **Procure por uma seção** chamada:
   - "Registros" ou "Records"
   - "DNS Records" ou "Registros DNS"
   - "Manage DNS" ou "Gerenciar DNS"

2. **Procure por registros do tipo "A"**

3. **Procure por registros com:**
   - **Nome:** `@` ou vazio ou `awakenyourhero.com.br`
   - **Tipo:** A
   - **Valor:** Qualquer IP

4. **Verifique TODOS os registros A:**
   - Se encontrar `76.223.105.230` → **DELETE**
   - Se encontrar `13.248.243.5` → **DELETE**
   - Se encontrar `216.198.79.1` → **MANTER**

---

## 🔍 Método 2: Buscar por IP

### No Painel DNS:

1. **Use a busca** (se houver) para procurar por:
   - `76.223.105.230`
   - `13.248.243.5`

2. **Ou procure manualmente** na lista de registros

---

## 🔍 Método 3: Editar Registro Existente

### Se Você Vê Apenas 1 Registro A:

1. **Clique em:** "Editar" ou "Edit" no registro A existente
2. **Verifique** se há múltiplos valores/IPs
3. **Alguns painéis** permitem múltiplos IPs no mesmo registro
4. **Remova** os IPs antigos, deixe apenas `216.198.79.1`

---

## 🔍 Método 4: Ver Todos os Registros

### No Painel DNS:

1. **Role a página** para baixo completamente
2. **Alguns painéis** mostram registros em páginas separadas
3. **Procure por botões:** "Próxima" ou "Next" ou "Ver mais" ou "Show more"
4. **Verifique TODAS as páginas** de registros

---

## 🔍 Método 5: Visualizar HTML/Texto

### Se o Painel Mostra Código:

1. **Procure por:** "View as Text" ou "Ver como Texto"
2. **Ou procure por:** "Export" ou "Exportar"
3. **Isso mostrará** todos os registros em formato texto
4. **Procure** pelos IPs antigos no texto

---

## 🔍 Método 6: Contatar Suporte GoDaddy

### Se Não Encontrar:

1. **Contate suporte do GoDaddy:**
   - Chat online
   - Telefone
   - Email

2. **Peça para:**
   - Remover registros A com IPs `76.223.105.230` e `13.248.243.5`
   - Manter apenas registro A com IP `216.198.79.1`

3. **Forneça:**
   - Domínio: `awakenyourhero.com.br`
   - IPs para remover: `76.223.105.230`, `13.248.243.5`
   - IP para manter: `216.198.79.1`

---

## 📸 O Que Procurar Visualmente

### No Painel DNS, você deve ver algo assim:

```
Tipo | Nome | Valor
-----|------|------
A    | @    | 216.198.79.1     ← MANTER
A    | @    | 76.223.105.230   ← DELETAR
A    | @    | 13.248.243.5     ← DELETAR
```

**Ou pode estar assim:**

```
Tipo | Nome                    | Valor
-----|-------------------------|---------------
A    | awakenyourhero.com.br   | 216.198.79.1     ← MANTER
A    | awakenyourhero.com.br   | 76.223.105.230   ← DELETAR
A    | awakenyourhero.com.br   | 13.248.243.5     ← DELETAR
```

---

## 🗑️ Como Deletar

### Quando Encontrar os Registros:

1. **Clique em:** "Deletar" ou "Delete" ou ícone de lixeira
2. **Confirme** a exclusão
3. **Repita** para cada registro antigo

---

## ✅ Verificar Após Remover

### Após remover, verifique:

```bash
dig @ns59.domaincontrol.com awakenyourhero.com.br A +short
```

**Quando mostrar apenas `216.198.79.1`:**
- ✅ Registros foram removidos corretamente
- ✅ Aguarde propagação (15-60 minutos)
- ✅ Verifique no Vercel

---

## 🆘 Se Ainda Não Encontrar

### Opção 1: Aguardar Cache DNS

Se você **já removeu** os registros mas ainda aparecem:

- ⏳ **Aguarde 24 horas** para cache DNS limpar
- 🔄 **DNS pode demorar** para atualizar
- ✅ **Vercel verificará** automaticamente

### Opção 2: Usar API do GoDaddy

Se você tem acesso à API do GoDaddy:

1. **Use a API** para listar todos os registros
2. **Identifique** os registros A antigos
3. **Delete** via API

### Opção 3: Migrar DNS para Vercel

Se não conseguir remover no GoDaddy:

1. **Use Vercel DNS** (se disponível)
2. **Mude nameservers** para Vercel
3. **Configure DNS** diretamente no Vercel

---

## 📋 Checklist

- [ ] Acessei o painel DNS do GoDaddy
- [ ] Procurei por todos os registros tipo "A"
- [ ] Verifiquei TODOS os registros A na lista
- [ ] Rolei a página completamente
- [ ] Procurei por botões "Ver mais" ou "Next"
- [ ] Tentei editar registro existente
- [ ] Contatei suporte do GoDaddy (se necessário)

---

## 🎯 Resumo

**O que fazer:**

1. ✅ **Acesse** o painel DNS do GoDaddy
2. ✅ **Procure** por TODOS os registros tipo "A"
3. ✅ **Delete** registros com IPs `76.223.105.230` e `13.248.243.5`
4. ✅ **Mantenha** apenas registro com IP `216.198.79.1`
5. ✅ **Aguarde** 15-60 minutos para propagação
6. ✅ **Clique em "Refresh"** no Vercel

**Se não encontrar, contate suporte do GoDaddy!** 🆘

---

**Tente todos os métodos acima ou contate suporte do GoDaddy!** 🔍
