# 🔍 Como Comprovar que os Registros DNS Ainda Existem

## 🎯 Objetivo

Comprovar que os registros A antigos (`76.223.105.230` e `13.248.243.5`) ainda existem no DNS, mesmo que não apareçam na interface do GoDaddy.

---

## 🔍 Método 1: Usar `dig` (Terminal)

### Comando Básico:

```bash
dig awakenyourhero.com.br A +short
```

**Resultado esperado:**
```
216.198.79.1
76.223.105.230
13.248.243.5
```

**Se mostrar os 3 IPs:** ✅ Registros ainda existem no DNS

---

### Consultar Diretamente o Nameserver do GoDaddy:

```bash
dig @ns59.domaincontrol.com awakenyourhero.com.br A +short
```

**Resultado esperado:**
```
76.223.105.230
13.248.243.5
216.198.79.1
```

**Se mostrar os 3 IPs:** ✅ Registros ainda existem no DNS do GoDaddy

---

### Comando Completo com Detalhes:

```bash
dig awakenyourhero.com.br A
```

**Mostra informações detalhadas:**
- Nameservers consultados
- Resposta completa
- TTL (Time To Live)
- IPs retornados

---

## 🔍 Método 2: Usar Ferramentas Online

### 1. DNS Checker (Recomendado)

**Acesse:** https://dnschecker.org

1. **Digite:** `awakenyourhero.com.br`
2. **Tipo:** `A`
3. **Clique em:** "Search"
4. **Veja** os resultados de múltiplos servidores DNS

**O que procurar:**
- ✅ Se algum servidor mostra `76.223.105.230` → Registro existe
- ✅ Se algum servidor mostra `13.248.243.5` → Registro existe
- ✅ Se todos mostram apenas `216.198.79.1` → Registros foram removidos

---

### 2. MXToolbox

**Acesse:** https://mxtoolbox.com/SuperTool.aspx

1. **Digite:** `awakenyourhero.com.br`
2. **Tipo:** `A Record`
3. **Clique em:** "MX Lookup"
4. **Veja** os resultados

**Mostra:**
- Todos os IPs retornados
- Nameservers
- Informações detalhadas

---

### 3. What's My DNS

**Acesse:** https://www.whatsmydns.net

1. **Digite:** `awakenyourhero.com.br`
2. **Tipo:** `A`
3. **Clique em:** "Search"
4. **Veja** mapa mundial mostrando resultados de diferentes servidores

**Visualização:**
- 🌍 Mapa mostrando resultados de servidores DNS globais
- ✅ Verde = IP correto (`216.198.79.1`)
- ❌ Vermelho/Amarelo = IPs antigos (`76.223.105.230`, `13.248.243.5`)

---

### 4. DNSPerf

**Acesse:** https://www.dnsperf.com/dns-lookup

1. **Digite:** `awakenyourhero.com.br`
2. **Tipo:** `A`
3. **Clique em:** "Lookup"
4. **Veja** resultados de múltiplos servidores

---

## 🔍 Método 3: Usar `nslookup` (Terminal)

### Comando Básico:

```bash
nslookup awakenyourhero.com.br
```

**Resultado esperado:**
```
Name:    awakenyourhero.com.br
Address: 216.198.79.1
Address: 76.223.105.230
Address: 13.248.243.5
```

**Se mostrar os 3 IPs:** ✅ Registros ainda existem

---

### Consultar Nameserver Específico:

```bash
nslookup awakenyourhero.com.br ns59.domaincontrol.com
```

**Consulta diretamente o nameserver do GoDaddy**

---

## 🔍 Método 4: Usar `host` (Terminal)

### Comando:

```bash
host awakenyourhero.com.br
```

**Resultado esperado:**
```
awakenyourhero.com.br has address 216.198.79.1
awakenyourhero.com.br has address 76.223.105.230
awakenyourhero.com.br has address 13.248.243.5
```

**Se mostrar os 3 IPs:** ✅ Registros ainda existem

---

## 📸 Como Tirar Print para Comprovar

### 1. Terminal (macOS/Linux):

```bash
dig awakenyourhero.com.br A +short | tee dns-resultado.txt
```

**Depois:**
- Tire print da tela do terminal
- Ou mostre o arquivo `dns-resultado.txt`

---

### 2. DNS Checker:

1. **Acesse:** https://dnschecker.org
2. **Digite:** `awakenyourhero.com.br`
3. **Tipo:** `A`
4. **Clique em:** "Search"
5. **Tire print** da tela mostrando os resultados

---

### 3. MXToolbox:

1. **Acesse:** https://mxtoolbox.com/SuperTool.aspx
2. **Digite:** `awakenyourhero.com.br`
3. **Tipo:** `A Record`
4. **Clique em:** "MX Lookup"
5. **Tire print** da tela mostrando os resultados

---

## 📋 Script para Verificar Automaticamente

### Criar arquivo `verificar-dns.sh`:

```bash
#!/bin/bash

echo "🔍 Verificando registros DNS para awakenyourhero.com.br"
echo ""

echo "📊 Resultado do dig:"
dig awakenyourhero.com.br A +short

echo ""
echo "📊 Resultado do nslookup:"
nslookup awakenyourhero.com.br | grep -A 3 "Name:"

echo ""
echo "📊 Consultando nameserver do GoDaddy diretamente:"
dig @ns59.domaincontrol.com awakenyourhero.com.br A +short

echo ""
echo "✅ Se você vê 3 IPs (incluindo 76.223.105.230 e 13.248.243.5), os registros ainda existem!"
```

**Executar:**
```bash
chmod +x verificar-dns.sh
./verificar-dns.sh
```

---

## 🎯 O Que Procurar nos Resultados

### ✅ Registros Ainda Existem Se:

- `dig` mostra 3 IPs (incluindo os antigos)
- DNS Checker mostra IPs antigos em alguns servidores
- MXToolbox lista os 3 IPs
- `nslookup` mostra os 3 IPs

### ✅ Registros Foram Removidos Se:

- `dig` mostra apenas `216.198.79.1`
- DNS Checker mostra apenas `216.198.79.1` em todos os servidores
- MXToolbox lista apenas `216.198.79.1`
- `nslookup` mostra apenas `216.198.79.1`

---

## 📸 Exemplo de Print para Mostrar ao Suporte

### O que mostrar:

1. **Print do terminal** com resultado do `dig`
2. **Print do DNS Checker** mostrando múltiplos servidores
3. **Print do MXToolbox** mostrando os 3 IPs

**Isso comprova que os registros existem no DNS, mesmo que não apareçam na interface do GoDaddy.**

---

## 🆘 Para Mostrar ao Suporte do GoDaddy

### Texto para enviar:

```
Olá, preciso remover registros DNS ocultos do domínio awakenyourhero.com.br.

Comprovação de que os registros ainda existem:

1. Consulta DNS direta:
   dig awakenyourhero.com.br A +short
   Resultado: 216.198.79.1, 76.223.105.230, 13.248.243.5

2. Consulta ao nameserver do GoDaddy:
   dig @ns59.domaincontrol.com awakenyourhero.com.br A +short
   Resultado: 76.223.105.230, 13.248.243.5, 216.198.79.1

3. Verificação online (DNS Checker):
   https://dnschecker.org mostra os 3 IPs em múltiplos servidores

Os registros A com IPs 76.223.105.230 e 13.248.243.5 não aparecem na interface do GoDaddy, mas ainda existem no DNS.

Preciso manter apenas o registro A com IP 216.198.79.1.

Pode me ajudar a remover esses registros ocultos?
```

---

## ✅ Resumo

**Para comprovar que os registros existem:**

1. ✅ **Use `dig`** no terminal (mais rápido)
2. ✅ **Use DNS Checker** online (visual, fácil de mostrar)
3. ✅ **Use MXToolbox** (detalhado)
4. ✅ **Tire prints** para mostrar ao suporte

**Todos esses métodos mostrarão os 3 IPs se os registros ainda existirem!** 🔍
