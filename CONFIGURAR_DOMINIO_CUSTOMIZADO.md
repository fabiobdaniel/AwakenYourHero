# 🌐 Como Apontar o Site para awakenyourhero.com.br

Este guia mostra como configurar o domínio customizado `awakenyourhero.com.br` no Vercel e no provedor DNS.

## 📋 Pré-requisitos

- ✅ Site já deployado no Vercel
- ✅ Acesso ao painel do Vercel
- ✅ Acesso ao painel DNS do provedor do domínio (GoDaddy, etc.)
- ✅ Domínio `awakenyourhero.com.br` registrado

---

## 🔧 Passo 1: Configurar Domínio no Vercel

### 1.1 Acessar Configurações do Projeto

1. **Acesse:** https://vercel.com/dashboard
2. **Selecione o projeto:** AwakenYourHero
3. **Vá em:** Settings → Domains

### 1.2 Adicionar Domínio

1. **Clique em:** "Add" ou "Add Domain"
2. **Digite:** `awakenyourhero.com.br`
3. **Clique em:** "Add"

### 1.3 Verificar Configuração

O Vercel mostrará os registros DNS necessários. Você verá algo como:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Anote esses valores!** Você precisará deles no próximo passo.

---

## 🔧 Passo 2: Configurar DNS no Provedor do Domínio

### 2.1 Acessar Painel DNS

1. **Acesse o painel do seu provedor de domínio** (GoDaddy, Registro.br, etc.)
2. **Vá em:** DNS Management ou Gerenciamento de DNS
3. **Encontre o domínio:** `awakenyourhero.com.br`

### 2.2 Adicionar Registros DNS

#### Opção A: Usar Registro A (Recomendado para domínio raiz)

1. **Adicione registro A:**
   - **Tipo:** A
   - **Nome/Host:** `@` (ou deixe em branco para raiz)
   - **Valor:** `76.76.21.21` (valor fornecido pelo Vercel)
   - **TTL:** 1 Hora (ou Auto)

2. **Adicione registro CNAME para www:**
   - **Tipo:** CNAME
   - **Nome/Host:** `www`
   - **Valor:** `cname.vercel-dns.com` (valor fornecido pelo Vercel)
   - **TTL:** 1 Hora (ou Auto)

#### Opção B: Usar Apenas CNAME (Se o provedor permitir)

Alguns provedores permitem CNAME no domínio raiz:

1. **Adicione registro CNAME:**
   - **Tipo:** CNAME
   - **Nome/Host:** `@`
   - **Valor:** `cname.vercel-dns.com`
   - **TTL:** 1 Hora (ou Auto)

2. **Adicione registro CNAME para www:**
   - **Tipo:** CNAME
   - **Nome/Host:** `www`
   - **Valor:** `cname.vercel-dns.com`
   - **TTL:** 1 Hora (ou Auto)

### 2.3 Remover Registros Conflitantes

- ⚠️ **Remova** qualquer registro A ou CNAME antigo que aponte para outros IPs
- ⚠️ **Mantenha** apenas os registros necessários para o Vercel

---

## 🔧 Passo 3: Verificar no Vercel

### 3.1 Aguardar Propagação DNS

1. **Aguarde 15-60 minutos** para propagação DNS
2. **No Vercel**, o status do domínio mudará de "Pending" para "Valid"

### 3.2 Verificar Status

1. **No Vercel:** Settings → Domains
2. **Verifique** se o domínio está com status "Valid" ✅
3. **Se estiver "Pending":**
   - Aguarde mais alguns minutos
   - Verifique se os registros DNS estão corretos

---

## 🔍 Passo 4: Verificar Propagação DNS

### 4.1 Usar Ferramentas Online

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Selecione:** Tipo A
4. **Verifique** se o IP está correto em diferentes servidores DNS

### 4.2 Verificar via Terminal

```bash
# Verificar registro A
dig awakenyourhero.com.br A

# Verificar registro CNAME
dig www.awakenyourhero.com.br CNAME
```

---

## 🔧 Passo 5: Configurar HTTPS (Automático)

O Vercel configura HTTPS automaticamente:

1. ✅ **SSL/TLS é configurado automaticamente**
2. ✅ **Certificado Let's Encrypt é gerado**
3. ✅ **Redirecionamento HTTP → HTTPS é automático**

**Aguarde 5-10 minutos** após a verificação do domínio para o SSL ser ativado.

---

## 🔧 Passo 6: Configurar Redirecionamentos (Opcional)

### 6.1 Redirecionar www para não-www (ou vice-versa)

No Vercel, você pode configurar:

1. **Settings → Domains**
2. **Configure** redirecionamento automático
3. **Escolha:** `www.awakenyourhero.com.br` → `awakenyourhero.com.br` (ou vice-versa)

---

## 📋 Exemplo de Configuração DNS (GoDaddy)

### Registros Necessários:

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 1 Hora

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 1 Hora
```

### Como Adicionar no GoDaddy:

1. **Acesse:** https://www.godaddy.com
2. **Vá em:** My Products → Domains
3. **Clique em:** `awakenyourhero.com.br` → DNS
4. **Clique em:** "Add" ou "Adicionar"
5. **Configure** os registros acima
6. **Salve**

---

## 📋 Exemplo de Configuração DNS (Registro.br)

### Registros Necessários:

```
Tipo: A
Hostname: @
Endereço IPv4: 76.76.21.21
TTL: 3600

Tipo: CNAME
Hostname: www
Ponteiro: cname.vercel-dns.com
TTL: 3600
```

### Como Adicionar no Registro.br:

1. **Acesse:** https://registro.br
2. **Vá em:** Meus Domínios
3. **Clique em:** `awakenyourhero.com.br` → DNS
4. **Adicione** os registros acima
5. **Salve**

---

## ⚠️ Problemas Comuns

### Domínio não verifica no Vercel

**Possíveis causas:**
- DNS ainda não propagou (aguarde mais tempo)
- Registros DNS incorretos (verifique valores)
- TTL muito alto (reduza para 1 hora)

**Solução:**
1. Verifique os registros DNS no provedor
2. Compare com os valores fornecidos pelo Vercel
3. Aguarde até 24 horas para propagação completa

### Site não carrega após configuração

**Possíveis causas:**
- DNS não propagou completamente
- Cache do navegador
- Registros DNS incorretos

**Solução:**
1. Limpe cache do navegador (Ctrl+Shift+R)
2. Teste em modo anônimo
3. Verifique DNS com ferramentas online

### Erro de SSL/HTTPS

**Possíveis causas:**
- Certificado ainda não foi gerado
- DNS não propagou completamente

**Solução:**
1. Aguarde 10-15 minutos após verificação do domínio
2. O Vercel gera certificado automaticamente
3. Se persistir, verifique DNS novamente

---

## ✅ Checklist Final

- [ ] Domínio adicionado no Vercel
- [ ] Registros DNS configurados no provedor
- [ ] Aguardado propagação DNS (15-60 min)
- [ ] Domínio verificado no Vercel (status "Valid")
- [ ] Site acessível em `awakenyourhero.com.br`
- [ ] HTTPS funcionando (certificado gerado)
- [ ] Redirecionamentos configurados (se necessário)

---

## 🎯 Resultado Esperado

Após configurar:

- ✅ Site acessível em: `https://awakenyourhero.com.br`
- ✅ Site acessível em: `https://www.awakenyourhero.com.br`
- ✅ Redirecionamento automático HTTP → HTTPS
- ✅ SSL/TLS configurado automaticamente

---

## 📞 Precisa de Ajuda?

Se tiver problemas:

1. **Verifique** os registros DNS com ferramentas online
2. **Compare** com os valores fornecidos pelo Vercel
3. **Aguarde** até 24 horas para propagação completa
4. **Consulte** a documentação do Vercel: https://vercel.com/docs/concepts/projects/domains

---

**Pronto! Seu site estará acessível em `awakenyourhero.com.br` após a propagação DNS!** 🚀
