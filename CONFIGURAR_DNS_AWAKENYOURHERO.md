# 🔧 Configurar DNS para awakenyourhero.com.br

## 📋 Valores DNS do Vercel

### Para `awakenyourhero.com.br` (domínio raiz):

```
Tipo: A
Nome: @
Valor: 216.198.79.1
TTL: 1 Hora (ou Auto)
```

### Para `www.awakenyourhero.com.br`:

```
Tipo: CNAME
Nome: www
Valor: de9484be374b41ad.vercel-dns-017.com. (com ponto final)
      OU
      de9484be374b41ad.vercel-dns-017.com (sem ponto final)
TTL: 1 Hora (ou Auto)
```

**⚠️ IMPORTANTE:** 
- **Tente primeiro COM o ponto:** `de9484be374b41ad.vercel-dns-017.com.`
- **Se o provedor não aceitar, use SEM o ponto:** `de9484be374b41ad.vercel-dns-017.com`
- **Ambos funcionam!** O importante é que o DNS aponte corretamente.

---

## 🔧 Passo a Passo: Configurar no Provedor DNS

### Se for GoDaddy:

1. **Acesse:** https://www.godaddy.com
2. **Vá em:** My Products → Domains
3. **Clique em:** `awakenyourhero.com.br` → DNS
4. **Clique em:** "Add" ou "Adicionar"

#### Adicionar Registro A:

1. **Tipo:** Selecione `A`
2. **Nome/Host:** Digite `@` (ou deixe em branco)
3. **Valor:** Digite `216.198.79.1`
4. **TTL:** Selecione `1 Hora` (ou Auto)
5. **Salve**

#### Adicionar Registro CNAME:

1. **Tipo:** Selecione `CNAME`
2. **Nome/Host:** Digite `www`
3. **Valor:** Digite `de9484be374b41ad.vercel-dns-017.com.`
4. **TTL:** Selecione `1 Hora` (ou Auto)
5. **Salve**

### Se for Registro.br:

1. **Acesse:** https://registro.br
2. **Vá em:** Meus Domínios
3. **Clique em:** `awakenyourhero.com.br` → DNS
4. **Adicione** os registros:

#### Registro A:
- **Tipo:** A
- **Hostname:** `@`
- **Endereço IPv4:** `216.198.79.1`
- **TTL:** 3600 (1 hora)

#### Registro CNAME:
- **Tipo:** CNAME
- **Hostname:** `www`
- **Ponteiro:** `de9484be374b41ad.vercel-dns-017.com.`
- **TTL:** 3600 (1 hora)

---

## ⚠️ Importante: Remover Registros Antigos

Antes de adicionar os novos registros:

1. **Procure** por registros A ou CNAME antigos
2. **Remova** qualquer registro que aponte para:
   - IPs diferentes de `216.198.79.1`
   - Valores diferentes de `de9484be374b41ad.vercel-dns-017.com.`
3. **Mantenha** apenas os registros do Vercel

---

## 🔍 Verificar Após Configurar

### 1. Aguardar Propagação (15-60 minutos)

### 2. Verificar com DNS Checker:

1. **Acesse:** https://dnschecker.org
2. **Para registro A:**
   - Digite: `awakenyourhero.com.br`
   - Tipo: `A`
   - Deve mostrar: `216.198.79.1`
3. **Para registro CNAME:**
   - Digite: `www.awakenyourhero.com.br`
   - Tipo: `CNAME`
   - Deve mostrar: `de9484be374b41ad.vercel-dns-017.com.`

### 3. Verificar no Vercel:

1. **Acesse:** Settings → Domains
2. **Aguarde** alguns minutos após configurar DNS
3. **Clique em:** "Refresh" ou aguarde atualização automática
4. **Status deve mudar** de "Invalid Configuration" para "Valid Configuration" ✅

---

## 📋 Checklist

- [ ] Registro A para `@` configurado com `216.198.79.1`
- [ ] Registro CNAME para `www` configurado com `de9484be374b41ad.vercel-dns-017.com.`
- [ ] Registros antigos/duplicados removidos
- [ ] TTL configurado para 1 hora
- [ ] Aguardado 15-60 minutos
- [ ] DNS verificado com dnschecker.org
- [ ] Status no Vercel verificado

---

## ✅ Resultado Esperado

Após configurar corretamente:

- ✅ Status no Vercel: "Valid Configuration"
- ✅ Site acessível em: `https://awakenyourhero.com.br`
- ✅ Site acessível em: `https://www.awakenyourhero.com.br`
- ✅ HTTPS funcionando automaticamente

---

## 🆘 Se Ainda Estiver "Invalid"

1. **Verifique** se os valores estão EXATOS (sem espaços extras)
2. **Aguarde** mais tempo (pode levar até 24 horas)
3. **Verifique** se não há registros conflitantes
4. **Compare** os registros no provedor com os do Vercel

---

**Configure estes registros e aguarde a propagação DNS!** 🚀
