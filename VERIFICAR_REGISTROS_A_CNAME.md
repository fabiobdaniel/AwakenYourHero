# ✅ Verificar Registros A e CNAME (Não NS)

## ✅ Registros NS Estão Corretos

Os registros NS que você vê são **corretos e não devem ser alterados**:

- `ns59.domaincontrol.com.` ✅
- `ns60.domaincontrol.com.` ✅

**"No se puede eliminar" e "No se puede editar"** é normal - esses são os nameservers do GoDaddy.

---

## 🔍 O Que Você Precisa Verificar

### Registros A e CNAME (Não NS)

No mesmo painel DNS, procure por:

### 1. Registro A para `@`

**Deve existir APENAS um:**

```
Tipo: A
Nombre: @
Datos: 216.198.79.1
TTL: 1 Hora
```

**NÃO deve ter:**
- ❌ Outros registros A para `@` com IPs diferentes
- ❌ `76.223.105.230`
- ❌ `13.248.243.5`

### 2. Registro CNAME para `www`

**Deve existir:**

```
Tipo: CNAME
Nombre: www
Datos: de9484be374b41ad.vercel-dns-017.com.
TTL: 1 Hora
```

---

## 📋 Checklist no Painel DNS

Na lista de registros DNS, verifique:

- [ ] **Registros NS:** `ns59.domaincontrol.com.` e `ns60.domaincontrol.com.` ✅ (corretos, não mexer)
- [ ] **Registro A:** Apenas um para `@` → `216.198.79.1` ✅
- [ ] **Registro CNAME:** Um para `www` → `de9484be374b41ad.vercel-dns-017.com.` ✅
- [ ] **Sem registros A antigos:** Não deve ter `76.223.105.230` ou `13.248.243.5` ❌

---

## 🔍 Se Não Ver os Registros A e CNAME

### Procure em Outras Seções:

1. **Role a página** para baixo - pode haver mais registros
2. **Procure por:** "Records", "DNS Records", "A Records"
3. **Verifique** se há filtros ou abas que ocultam registros

### Ou Procure por "Zone File":

Alguns painéis têm "Zone File" que mostra TODOS os registros:
- Procure por "View Zone File"
- Procure por "Advanced DNS"
- Procure por "All Records"

---

## ⏳ Se os Registros Estão Corretos

Se você vê apenas:
- ✅ Um registro A: `@` → `216.198.79.1`
- ✅ Um registro CNAME: `www` → `de9484be374b41ad.vercel-dns-017.com.`

**Então está correto!** Os IPs antigos que aparecem no `dig` são **cache DNS**.

### Solução: Aguardar Propagação

- ⏳ **Aguarde 24 horas** para propagação completa
- 🔄 **Cache DNS** pode demorar para atualizar
- ✅ **O DNS atualizará** automaticamente

---

## 🔍 Verificar Propagação

### Verificar Periodicamente:

```bash
dig awakenyourhero.com.br A +short
```

**Quando mostrar apenas `216.198.79.1`:**
- ✅ DNS propagou corretamente
- ✅ Site deve funcionar

### Verificar no Vercel:

1. **Acesse:** Settings → Domains
2. **Clique em:** "Refresh"
3. **Status deve mudar** para "Valid Configuration"

---

## 📋 Resumo

- ✅ **Registros NS:** Estão corretos, não mexer
- ✅ **Verifique:** Registros A e CNAME na lista
- ⏳ **Se estiverem corretos:** Aguarde propagação DNS (24 horas)
- 🔄 **Cache DNS:** Pode demorar para atualizar

**Verifique os registros A e CNAME na lista de DNS!** 🔍
