# 📸 Como Adicionar a Imagem do Livro "Disciplined Destiny"

## Passo 1: Preparar a Imagem

1. Salve a imagem do livro (o poster/promo que você anexou)
2. Nome sugerido: `disciplined-destiny-book.jpg` ou `disciplined-destiny-book.png`
3. Tamanho recomendado: largura máxima de 600px (altura proporcional)

## Passo 2: Colocar a Imagem na Pasta Assets

Coloque a imagem em:
```
/assets/disciplined-destiny-book.jpg
```

Ou se preferir outro formato:
```
/assets/disciplined-destiny-book.png
```

## Passo 3: Atualizar o Código (se necessário)

O código já está configurado para procurar a imagem em:
- `/assets/disciplined-destiny-book.jpg`

Se você usar outro nome ou formato, atualize a linha no arquivo `assets/contact-form.js`:
```javascript
bookImage.src = '/assets/disciplined-destiny-book.jpg'; // Altere aqui se necessário
```

## Passo 4: Verificar

Após adicionar a imagem:
1. Faça commit da imagem
2. Faça push para o GitHub
3. A Vercel fará deploy automaticamente
4. A imagem aparecerá na página About após a seção "From Operator to Architect"

## Nota

A imagem será ajustada automaticamente para ser compatível com outras imagens do site:
- Largura máxima: 600px
- Altura: proporcional
- Border radius: 8px
- Sombra suave para consistência visual
