# 🌐 Resumo: Configurar awakenyourhero.com.br

## 🎯 Passos Rápidos

### 1. No Vercel (5 minutos)

1. Acesse: https://vercel.com/dashboard
2. Selecione: Projeto AwakenYourHero
3. Vá em: **Settings → Domains**
4. Clique em: **"Add"**
5. Digite: `awakenyourhero.com.br`
6. **Anote** os valores DNS que aparecerem

### 2. No Provedor DNS (5 minutos)

1. Acesse o painel DNS do seu provedor (GoDaddy, Registro.br, etc.)
2. Adicione registro **A**:
   - Nome: `@`
   - Valor: `76.76.21.21` (ou o valor fornecido pelo Vercel)
3. Adicione registro **CNAME**:
   - Nome: `www`
   - Valor: `cname.vercel-dns.com` (ou o valor fornecido pelo Vercel)

### 3. Aguardar (15-60 minutos)

- Aguarde propagação DNS
- No Vercel, o status mudará para "Valid" ✅
- HTTPS será configurado automaticamente

---

## 📋 Valores DNS Típicos do Vercel

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

**⚠️ IMPORTANTE:** Use os valores exatos que o Vercel mostrar para o seu projeto!

---

## ✅ Resultado

Após configurar:
- ✅ `https://awakenyourhero.com.br` funcionando
- ✅ `https://www.awakenyourhero.com.br` funcionando
- ✅ HTTPS automático
- ✅ Redirecionamento HTTP → HTTPS automático

---

## 📚 Documentação Completa

Veja `CONFIGURAR_DOMINIO_CUSTOMIZADO.md` para guia detalhado.
