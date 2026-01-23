# 🚀 Como Rodar o Servidor Local

## Opção 1: Python HTTP Server (Recomendado)

Abra o terminal na pasta do projeto e execute:

```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
python3 -m http.server 8000
```

Depois acesse: **http://localhost:8000**

## Opção 2: Usando npm script

```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
npm run dev
```

Isso também iniciará o servidor na porta 8000.

## Opção 3: Outra porta (se 8000 estiver ocupada)

```bash
python3 -m http.server 8080
```

Depois acesse: **http://localhost:8080**

## 🔍 Verificar se está funcionando

Após iniciar o servidor, você verá uma mensagem como:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

## ⚠️ Nota Importante

Como o código React está **compilado** em `assets/index-D4EisZyU.js`, as mudanças em `src/pages/Contact.tsx` só aparecerão após:

1. **Fazer build do React** (se você tem o código fonte)
2. **Ou aguardar deploy na Vercel** (que faz build automaticamente)

O servidor local serve os arquivos estáticos já compilados.

## 🛑 Parar o servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.
