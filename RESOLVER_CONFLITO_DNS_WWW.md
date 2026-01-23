# 🔧 Resolver Conflito DNS: Registro www Já Existe

## ⚠️ Problema

Você está tentando adicionar um registro CNAME para `www`, mas já existe um registro CNAME para `www` apontando para `awakenyourhero.com.br.`

**Erro:** "El nombre de registro www está en conflicto con otro registro."

---

## ✅ Solução: Editar o Registro Existente

**NÃO adicione um novo registro!** Edite o registro existente.

### Passo a Passo:

1. **Na lista de registros DNS**, encontre o registro CNAME para `www`
2. **Clique no ícone de lápis** (editar) ao lado do registro
3. **Altere o valor** de:
   ```
   awakenyourhero.com.br.
   ```
   Para:
   ```
   de9484be374b41ad.vercel-dns-017.com.
   ```
4. **Salve** as alterações

---

## 📋 Valores Corretos

### Registro A (já configurado ✅):
```
Tipo: A
Nombre: @
Datos: 216.198.79.1
TTL: 1 Hora
```

### Registro CNAME para www (EDITAR o existente):
```
Tipo: CNAME
Nombre: www
Datos: de9484be374b41ad.vercel-dns-017.com. (ou sem ponto final)
TTL: 1 Hora
```

---

## 🔧 Passo a Passo Detalhado

### 1. Encontrar o Registro Existente

Na lista de registros DNS, você verá:
```
Tipo: CNAME
Nombre: www
Datos: awakenyourhero.com.br.
TTL: 1 Hora
```

### 2. Editar o Registro

1. **Clique no ícone de lápis** (✏️) ao lado deste registro
2. **Mantenha:**
   - Tipo: CNAME
   - Nombre: www
   - TTL: 1 Hora
3. **Altere apenas:**
   - **Datos:** De `awakenyourhero.com.br.` para `de9484be374b41ad.vercel-dns-017.com.`
4. **Clique em:** "Guardar" (Save)

### 3. Verificar

Após salvar, o registro deve mostrar:
```
Tipo: CNAME
Nombre: www
Datos: de9484be374b41ad.vercel-dns-017.com.
TTL: 1 Hora
```

---

## ⚠️ Importante

- ❌ **NÃO adicione** um novo registro CNAME para `www`
- ✅ **EDITE** o registro existente
- ✅ **Remova** o valor antigo (`awakenyourhero.com.br.`)
- ✅ **Adicione** o novo valor (`de9484be374b41ad.vercel-dns-017.com.`)

---

## 📋 Sobre o Ponto Final

O valor pode ser:
- **Com ponto:** `de9484be374b41ad.vercel-dns-017.com.` ✅
- **Sem ponto:** `de9484be374b41ad.vercel-dns-017.com` ✅

**Ambos funcionam!** Se o provedor não aceitar com ponto, use sem ponto.

---

## ✅ Após Editar

1. **Aguarde 15-60 minutos** para propagação DNS
2. **No Vercel**, o status deve mudar para "Valid Configuration"
3. **Verifique** com https://dnschecker.org

---

## 🎯 Resumo

1. ✅ **Edite** o registro CNAME existente para `www`
2. ✅ **Altere** o valor de `awakenyourhero.com.br.` para `de9484be374b41ad.vercel-dns-017.com.`
3. ✅ **Salve** as alterações
4. ✅ **Aguarde** propagação DNS

**Não adicione um novo registro! Edite o existente!** 🚀
