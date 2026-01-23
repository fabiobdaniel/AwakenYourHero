# 📧 Nome do Módulo de Email

## 🎯 Nome Oficial

**`EmailServiceModule`**

Este é o nome que você deve usar quando pedir para implementar envio de email em outros botões ou páginas.

---

## 📝 Como Pedir para Usar

### Exemplos de Solicitações:

1. **"Use EmailServiceModule no botão de newsletter"**
2. **"Implemente EmailServiceModule no formulário de contato da página X"**
3. **"Adicione EmailServiceModule ao botão de envio de email"**
4. **"Use EmailServiceModule para enviar email quando clicar no botão Y"**

---

## 🔍 O Que o Módulo Faz

O **EmailServiceModule** é um módulo modularizado que:

- ✅ Envia emails via API
- ✅ Trata erros automaticamente
- ✅ Formata HTML e texto
- ✅ Valida dados
- ✅ Retorna respostas padronizadas

---

## 📦 Componentes do Módulo

### Frontend (JavaScript do navegador):
- **Arquivo**: `/assets/email-client-module.js`
- **Nome**: `EmailServiceModule`
- **Uso**: `await EmailServiceModule.emailClient.sendNewsletterSubscription(email)`

### Backend (API Routes):
- **Arquivo**: `api/services/email/index.js`
- **Nome**: `EmailServiceModule` (mesmo nome)
- **Uso**: `EmailServiceFactory.create(process.env)`

---

## 🎯 Métodos Disponíveis

### No Frontend (`emailClient`):

1. **`sendNewsletterSubscription(email)`**
   - Envia inscrição na newsletter
   - Assunto: "NEWSLETTER"
   - Destinatário: `contact@fabiobdaniel.com`

2. **`sendContactForm(formData)`**
   - Envia formulário de contato
   - Inclui: name, email, message, phone, interest

3. **`sendCustomEmail(options)`**
   - Envia email customizado
   - Você define: to, subject, html, text, replyTo

4. **`sendEmail(emailData)`**
   - Método genérico
   - Máxima flexibilidade

---

## 💡 Exemplo de Uso

```javascript
// Carregar módulo
const EmailServiceModule = await import('/assets/email-client-module.js');

// Usar métodos
await EmailServiceModule.emailClient.sendNewsletterSubscription(email);
await EmailServiceModule.emailClient.sendContactForm({ name, email, message });
await EmailServiceModule.emailClient.sendCustomEmail({ to, subject, html });
```

---

## 📋 Informações Necessárias para Implementar

### Para Newsletter:
- ✅ **Email do usuário** (já capturado do formulário)
- ✅ **Nada mais!** O módulo faz o resto

### Para Formulário de Contato:
- ✅ **Nome**
- ✅ **Email**
- ✅ **Mensagem**
- ✅ (Opcional) Telefone, Interesse

### Para Email Customizado:
- ✅ **Destinatário (to)**
- ✅ **Assunto (subject)**
- ✅ **Conteúdo (html ou text)**
- ✅ (Opcional) Reply-to

---

## 🚀 Pronto para Usar!

Agora você pode simplesmente dizer:

**"Use EmailServiceModule no botão X"**

E eu vou implementar automaticamente! 🎉
