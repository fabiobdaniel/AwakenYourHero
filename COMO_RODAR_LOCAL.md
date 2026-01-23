# 🚀 Como Rodar o Site Localmente

## Método 1: Python HTTP Server (Mais Simples)

### Passo 1: Abra o Terminal
- **Mac/Linux**: Abra o Terminal
- **Windows**: Abra o PowerShell ou CMD

### Passo 2: Navegue até a pasta do projeto
```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
```

### Passo 3: Inicie o servidor
```bash
python3 -m http.server 8000
```

### Passo 4: Acesse no navegador
Abra seu navegador e acesse:
```
http://localhost:8000
```

Você verá uma mensagem como:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

## Método 2: Usando npm (Alternativo)

```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
npm run dev
```

Isso também iniciará o servidor na porta 8000.

## Método 3: Outra Porta (se 8000 estiver ocupada)

Se a porta 8000 estiver em uso, use outra porta:

```bash
python3 -m http.server 8080
```

Depois acesse: **http://localhost:8080**

## 🔍 Verificar se está funcionando

Após iniciar o servidor, você deve ver:
- No terminal: mensagem "Serving HTTP on..."
- No navegador: o site carregando em `http://localhost:8000`

## 🛑 Parar o servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.

## ⚠️ Nota Importante

Como o código React está **compilado** em `assets/index-D4EisZyU.js`, este servidor serve os arquivos estáticos já buildados.

Para ver mudanças no código React (`src/`), você precisa:
1. Ter o código fonte React
2. Fazer build do projeto
3. Ou aguardar deploy na Vercel (que faz build automaticamente)

## 🐛 Problemas Comuns

### "Port already in use"
Use outra porta:
```bash
python3 -m http.server 8080
```

### "python3: command not found"
No Mac, tente:
```bash
python -m http.server 8000
```

### "Connection refused"
- Verifique se o servidor está rodando
- Verifique se está usando a porta correta
- Tente limpar o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
