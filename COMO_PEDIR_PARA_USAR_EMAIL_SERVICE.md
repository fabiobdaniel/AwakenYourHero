# 📧 Como Pedir para Usar o EmailServiceModule

## 🎯 Nome do Módulo

**`EmailServiceModule`**

Este é o nome oficial do módulo de envio de email. Use este nome quando pedir para implementar em outros botões ou páginas.

---

## ✅ IMPLEMENTADO: Newsletter

O módulo **já foi implementado** no botão da newsletter! 

Agora o código usa:
```javascript
const EmailServiceModule = await import('/assets/email-client-module.js');
await EmailServiceModule.emailClient.sendNewsletterSubscription(email);
```

---

## 📝 Como Pedir para Usar em Outros Lugares

### Exemplos de Solicitações:

1. **"Use EmailServiceModule no botão de contato da página sobre"**
2. **"Implemente EmailServiceModule no formulário de feedback"**
3. **"Adicione EmailServiceModule ao botão 'Enviar Email' na página X"**
4. **"Use EmailServiceModule para enviar email quando clicar no botão Y"**
5. **"Integre EmailServiceModule no formulário de orçamento"**

---

## 🔍 Informações que Eu Preciso

### Para Newsletter (já implementado):
- ✅ **Email do usuário** (capturado automaticamente)
- ✅ **Nada mais!** O módulo faz tudo

### Para Formulário de Contato:
- ✅ **Nome do campo de nome** (ex: `name`, `nome`, `fullName`)
- ✅ **Nome do campo de email** (ex: `email`, `e-mail`)
- ✅ **Nome do campo de mensagem** (ex: `message`, `mensagem`, `msg`)
- ✅ (Opcional) **Telefone** - nome do campo
- ✅ (Opcional) **Interesse/Serviço** - nome do campo
- ✅ **ID ou seletor do formulário/botão**

### Para Email Customizado:
- ✅ **Destinatário** (para quem enviar)
- ✅ **Assunto** do email
- ✅ **Conteúdo** (HTML ou texto)
- ✅ **ID ou seletor do botão/formulário**

---

## 📋 Exemplos Práticos

### Exemplo 1: Formulário de Contato Simples

**Você diz:**
> "Use EmailServiceModule no formulário de contato. Campos: name, email, message. Form ID: contact-form"

**Eu implemento:**
```javascript
const EmailServiceModule = await import('/assets/email-client-module.js');
await EmailServiceModule.emailClient.sendContactForm({
  name: form.name.value,
  email: form.email.value,
  message: form.message.value
});
```

### Exemplo 2: Botão de Newsletter em Outra Página

**Você diz:**
> "Use EmailServiceModule no botão de newsletter da página sobre. Campo de email: newsletter-email"

**Eu implemento:**
```javascript
const EmailServiceModule = await import('/assets/email-client-module.js');
const email = document.getElementById('newsletter-email').value;
await EmailServiceModule.emailClient.sendNewsletterSubscription(email);
```

### Exemplo 3: Email Customizado

**Você diz:**
> "Use EmailServiceModule para enviar email quando clicar no botão 'Enviar Relatório'. Enviar para: admin@example.com, assunto: 'Relatório Diário', conteúdo: dados do formulário"

**Eu implemento:**
```javascript
const EmailServiceModule = await import('/assets/email-client-module.js');
await EmailServiceModule.emailClient.sendCustomEmail({
  to: 'admin@example.com',
  subject: 'Relatório Diário',
  html: '<p>Conteúdo do relatório...</p>',
  text: 'Conteúdo do relatório...'
});
```

---

## 🎯 Métodos Disponíveis

### 1. `sendNewsletterSubscription(email)`
- **Uso**: Newsletter
- **Parâmetros**: Apenas o email
- **Retorna**: `{ success: true, id: "resend-id" }`

### 2. `sendContactForm(formData)`
- **Uso**: Formulário de contato
- **Parâmetros**: `{ name, email, message, phone?, interest? }`
- **Retorna**: `{ success: true, id: "resend-id" }`

### 3. `sendCustomEmail(options)`
- **Uso**: Email customizado
- **Parâmetros**: `{ to, subject, html, text, replyTo? }`
- **Retorna**: `{ success: true, id: "resend-id" }`

### 4. `sendEmail(emailData)`
- **Uso**: Genérico (máxima flexibilidade)
- **Parâmetros**: `{ to, subject, html, text, replyTo? }`
- **Retorna**: `{ success: true, id: "resend-id" }`

---

## 📦 Estrutura do Módulo

```
EmailServiceModule
├── Frontend: /assets/email-client-module.js
│   └── emailClient (instância pronta)
│       ├── sendNewsletterSubscription()
│       ├── sendContactForm()
│       ├── sendCustomEmail()
│       └── sendEmail()
│
└── Backend: api/services/email/
    ├── EmailServiceFactory
    ├── ResendEmailService
    ├── SMTPEmailService
    └── EmailDTO
```

---

## ✅ Checklist: O Que Eu Preciso Saber

Para implementar o EmailServiceModule, me informe:

- [ ] **Onde usar?** (qual botão, formulário, página)
- [ ] **Tipo de email?** (newsletter, contato, customizado)
- [ ] **Campos do formulário?** (nomes dos campos)
- [ ] **Destinatário?** (se customizado)
- [ ] **Assunto?** (se customizado)
- [ ] **Conteúdo?** (se customizado)

---

## 🚀 Pronto!

Agora você pode simplesmente dizer:

**"Use EmailServiceModule no [botão/formulário/página]"**

E me informar os detalhes necessários. Eu implemento automaticamente! 🎉

---

## 📚 Documentação Relacionada

- `NOME_DO_MODULO.md` - Nome e estrutura do módulo
- `COMO_USAR_MODULO_EMAIL.md` - Guia completo de uso
- `COMO_USAR_MODULO_NEWSLETTER.md` - Exemplo específico da newsletter
