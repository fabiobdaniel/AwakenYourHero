# Instruções de Deploy

## 1. Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `AwakenYourHero`
3. Deixe como **público** ou **privado** (sua escolha)
4. **NÃO** marque "Initialize with README" (já temos os arquivos)
5. Clique em "Create repository"

## 2. Fazer push para o GitHub

Após criar o repositório, execute:

```bash
git push -u origin main
```

## 3. Deploy na Vercel

### Opção A: Via Interface Web
1. Acesse: https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Importe o repositório `AwakenYourHero`
5. A Vercel detectará automaticamente a configuração
6. Clique em "Deploy"

### Opção B: Via CLI
```bash
npm i -g vercel
vercel
```

A Vercel irá:
- Detectar automaticamente que é um site estático
- Fazer o deploy
- Fornecer uma URL de produção

## Arquivos já configurados:
- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `README.md` - Documentação
