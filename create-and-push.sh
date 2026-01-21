#!/bin/bash

# Script para criar repositório no GitHub e fazer push

REPO_NAME="AwakenYourHero"
USERNAME="fabiodaniel"

echo "🚀 Criando repositório no GitHub..."

# Verifica se o GitHub CLI está instalado
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI encontrado"
    gh repo create $REPO_NAME --public --source=. --remote=origin --push
    echo "✅ Repositório criado e push realizado!"
    exit 0
fi

# Se não tiver GitHub CLI, tenta via API (precisa de token)
if [ -n "$GITHUB_TOKEN" ]; then
    echo "📝 Criando repositório via API..."
    curl -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d "{\"name\":\"$REPO_NAME\",\"private\":false}" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ Repositório criado!"
        git push -u origin main
        echo "✅ Push realizado!"
        exit 0
    fi
fi

# Se não conseguir criar automaticamente, mostra instruções
echo "⚠️  Não foi possível criar automaticamente."
echo ""
echo "📋 Por favor, siga estes passos:"
echo ""
echo "1. Acesse: https://github.com/new"
echo "2. Nome do repositório: $REPO_NAME"
echo "3. Deixe como PÚBLICO"
echo "4. NÃO marque 'Initialize with README'"
echo "5. Clique em 'Create repository'"
echo ""
echo "Depois execute:"
echo "   git push -u origin main"
echo ""
