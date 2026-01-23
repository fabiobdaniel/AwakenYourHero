# 📧 Como Usar o Módulo de Email em Outros Lugares

Este guia mostra como usar o módulo de email em diferentes contextos: backend (APIs) e frontend (JavaScript do navegador).

## 🎯 Índice

1. [Uso no Backend (API Routes)](#uso-no-backend)
2. [Uso no Frontend (JavaScript)](#uso-no-frontend)
3. [Exemplos Práticos](#exemplos-práticos)

---

## 🔧 Uso no Backend (API Routes)

### Exemplo 1: API Route Simples

Crie um novo arquivo em `api/` (ex: `api/send-notification.js`):

```javascript
const { EmailServiceFactory, EmailRequestDTO } = require('./services/email/index.js');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, message } = req.body;

    // 1. Obter serviço de email do factory
    const emailService = EmailServiceFactory.create(process.env);

    if (!emailService) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // 2. Criar DTO com os dados do email
    const emailRequest = new EmailRequestDTO({
      to: to,
      subject: subject,
      html: `<p>${message}</p>`,
      text: message
    });

    // 3. Enviar email
    const response = await emailService.sendEmail(emailRequest);

    return res.status(200).json({
      success: true,
      emailId: response.id
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message 
    });
  }
}
```

### Exemplo 2: Envio em Lote (Bulk)

```javascript
const { EmailServiceFactory, EmailRequestDTO } = require('./services/email/index.js');

export default async function handler(req, res) {
  // ... CORS headers ...

  try {
    const { recipients, subject, html, text } = req.body;

    const emailService = EmailServiceFactory.create(process.env);
    const results = [];

    // Enviar para cada destinatário
    for (const recipient of recipients) {
      const emailRequest = new EmailRequestDTO({
        to: recipient,
        subject,
        html,
        text
      });

      const response = await emailService.sendEmail(emailRequest);
      results.push({ recipient, id: response.id });

      // Delay para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return res.status(200).json({ success: true, results });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

### Exemplo 3: Em Funções Internas (Não API)

```javascript
const { EmailServiceFactory, EmailRequestDTO } = require('./services/email/index.js');

async function sendWelcomeEmail(userEmail, userName) {
  const emailService = EmailServiceFactory.create(process.env);
  
  if (!emailService) {
    throw new Error('Email service not configured');
  }

  const emailRequest = new EmailRequestDTO({
    to: userEmail,
    subject: 'Welcome to Awaken Your Hero!',
    html: `<h1>Welcome, ${userName}!</h1><p>Thank you for joining us.</p>`,
    text: `Welcome, ${userName}! Thank you for joining us.`
  });

  return await emailService.sendEmail(emailRequest);
}

// Uso
await sendWelcomeEmail('user@example.com', 'John Doe');
```

---

## 🌐 Uso no Frontend (JavaScript)

### Opção 1: Importar o Módulo ES6

No seu HTML, adicione:

```html
<script type="module">
  import { emailClient } from '/assets/email-client-module.js';
  
  // Agora você pode usar emailClient
  async function sendEmail() {
    try {
      const response = await emailClient.sendContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!'
      });
      console.log('Email sent:', response.id);
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>
```

### Opção 2: Usar em Script Separado

Crie `assets/my-custom-form.js`:

```javascript
import { emailClient } from '/assets/email-client-module.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('my-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value
    };

    try {
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending...';

      const response = await emailClient.sendContactForm(formData);
      
      alert('Message sent successfully!');
      form.reset();

    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      button.disabled = false;
      button.textContent = 'Send';
    }
  });
});
```

### Opção 3: Newsletter Subscription

```javascript
import { emailClient } from '/assets/email-client-module.js';

async function subscribeToNewsletter(email) {
  try {
    const response = await emailClient.sendNewsletterSubscription(email);
    console.log('Subscribed:', response.id);
    return response;
  } catch (error) {
    console.error('Subscription failed:', error);
    throw error;
  }
}

// Uso
document.getElementById('newsletter-btn').addEventListener('click', async () => {
  const email = document.getElementById('newsletter-email').value;
  await subscribeToNewsletter(email);
});
```

### Opção 4: Email Customizado

```javascript
import { emailClient } from '/assets/email-client-module.js';

async function sendCustomEmail() {
  try {
    const response = await emailClient.sendCustomEmail({
      to: 'contact@fabiobdaniel.com',
      subject: 'Custom Subject',
      html: '<h1>Custom HTML</h1><p>Custom content</p>',
      text: 'Custom text content',
      replyTo: 'sender@example.com'
    });
    
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📋 Exemplos Práticos

### 1. Formulário de Contato Customizado

```javascript
// assets/custom-contact.js
import { emailClient } from '/assets/email-client-module.js';

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };

  try {
    await emailClient.sendContactForm(data);
    alert('Message sent!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
```

### 2. Notificação de Evento

```javascript
// Backend: api/notify-event.js
const { EmailServiceFactory, EmailRequestDTO } = require('./services/email/index.js');

export default async function handler(req, res) {
  const { eventName, attendees } = req.body;
  
  const emailService = EmailServiceFactory.create(process.env);
  
  for (const attendee of attendees) {
    const emailRequest = new EmailRequestDTO({
      to: attendee.email,
      subject: `Reminder: ${eventName}`,
      html: `<p>Don't forget about ${eventName}!</p>`
    });
    
    await emailService.sendEmail(emailRequest);
  }
  
  return res.json({ success: true });
}
```

### 3. Integração com React

```javascript
// components/ContactForm.jsx
import { emailClient } from '/assets/email-client-module.js';

function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
      };

      await emailClient.sendContactForm(formData);
      alert('Sent!');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

---

## 🔑 Pontos Importantes

### Backend
- ✅ Use `EmailServiceFactory.create(process.env)` para obter o serviço
- ✅ Use `EmailRequestDTO` para criar requisições
- ✅ O factory escolhe automaticamente Resend ou SMTP

### Frontend
- ✅ Use `emailClient` do módulo `/assets/email-client-module.js`
- ✅ Métodos disponíveis:
  - `sendEmail()` - Genérico
  - `sendContactForm()` - Formulário de contato
  - `sendNewsletterSubscription()` - Newsletter
  - `sendCustomEmail()` - Customizado

### Segurança
- ⚠️ **Nunca** exponha chaves de API no frontend
- ✅ Sempre use as API routes do Vercel
- ✅ Valide dados no backend antes de enviar

---

## 📚 Arquivos de Referência

- **Backend**: `api/services/email/README.md`
- **Exemplos Backend**: `api/examples/`
- **Cliente Frontend**: `assets/email-client-module.js`

---

## 🆘 Troubleshooting

### Erro: "Email service not configured"
- Verifique se `RESEND_API_KEY` está configurado no Vercel
- Ou configure SMTP nas variáveis de ambiente

### Erro: "Module not found" (Frontend)
- Certifique-se de que o script tem `type="module"`
- Verifique o caminho do arquivo

### CORS Errors
- Adicione headers CORS na sua API route
- Verifique se a origem está permitida

---

**Pronto! Agora você pode usar o módulo de email em qualquer lugar do seu projeto!** 🚀
