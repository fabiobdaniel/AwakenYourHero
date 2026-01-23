# 🗑️ Remover Registros DNS Conflitantes

## ⚠️ Problema Identificado

O Vercel detectou registros DNS conflitantes que precisam ser removidos:

### Registros a REMOVER:

1. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `13.248.243.5` ❌ **REMOVER**

2. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `76.223.105.230` ❌ **REMOVER**

### Registro a MANTER:

1. **Registro A:**
   - Tipo: A
   - Nome: `@`
   - Valor: `216.198.79.1` ✅ **MANTER**

---

## 🔧 Passo a Passo: Remover Registros Conflitantes

### 1. Acessar Painel DNS

1. **Acesse** o painel DNS do seu provedor (GoDaddy, Registro.br, etc.)
2. **Vá em:** DNS Management ou Gerenciamento de DNS
3. **Encontre** o domínio: `awakenyourhero.com.br`

### 2. Localizar Registros A para `@`

Na lista de registros DNS, procure por:

```
Tipo: A
Nombre: @
Datos: 13.248.243.5
```

E também:

```
Tipo: A
Nombre: @
Datos: 76.223.105.230
```

### 3. Remover os Registros Antigos

Para cada registro acima:

1. **Clique no ícone de lixeira** (🗑️) ao lado do registro
2. **Confirme** a remoção
3. **Repita** para o outro registro antigo

### 4. Verificar Registro Correto

Certifique-se de que existe APENAS um registro A para `@`:

```
Tipo: A
Nombre: @
Datos: 216.198.79.1
TTL: 1 Hora
```

**Se não existir este registro, adicione-o!**

---

## 📋 Checklist

- [ ] Removido registro A: `@` → `13.248.243.5`
- [ ] Removido registro A: `@` → `76.223.105.230`
- [ ] Mantido registro A: `@` → `216.198.79.1`
- [ ] Verificado que existe apenas UM registro A para `@`
- [ ] Registro CNAME para `www` está correto

---

## ⚠️ Importante

### Não Pode Ter:
- ❌ Múltiplos registros A para `@` com IPs diferentes
- ❌ Registros A antigos do Vercel

### Deve Ter:
- ✅ Apenas UM registro A para `@` → `216.198.79.1`
- ✅ Um registro CNAME para `www` → `de9484be374b41ad.vercel-dns-017.com.`

---

## 🔍 Após Remover

### 1. Aguardar Propagação (15-30 minutos)

### 2. Verificar no Vercel

1. **Acesse:** Settings → Domains
2. **Clique em:** "Refresh" ou aguarde atualização automática
3. **Status deve mudar** para "Valid Configuration" ✅

### 3. Verificar DNS

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Tipo:** A
4. **Deve mostrar:** Apenas `216.198.79.1`

---

## ✅ Resultado Esperado

Após remover os registros conflitantes:

- ✅ Apenas um registro A para `@` → `216.198.79.1`
- ✅ Status no Vercel: "Valid Configuration"
- ✅ Site acessível em `https://awakenyourhero.com.br`

---

## 🆘 Se Não Encontrar os Registros

Se você não encontrar os registros `13.248.243.5` ou `76.223.105.230`:

1. **Verifique** se já foram removidos anteriormente
2. **Verifique** se está no provedor DNS correto
3. **Aguarde** alguns minutos e verifique novamente no Vercel

---

**Remova os registros antigos e mantenha apenas o correto!** 🚀
