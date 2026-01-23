/**
 * EXEMPLO: Como usar o módulo de email na newsletter
 * 
 * Este é um exemplo de como substituir o código atual
 * pelo novo módulo modularizado.
 */

// ============================================
// OPÇÃO 1: Import Dinâmico (Recomendado)
// ============================================
// Use esta opção se contact-form.js não for módulo ES6

const handleNewsletterSubmit = async function(e) {
  // ... código de detecção do formulário (mantém igual) ...
  
  const email = emailInput.value.trim();
  
  // Validar email (mantém igual)
  if (!email) {
    alert('Please enter your email address.');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  console.log('[Newsletter] 📧 Email to subscribe:', email);
  
  // ✨ NOVO: Carregar módulo dinamicamente
  let emailClient;
  try {
    const module = await import('/assets/email-client-module.js');
    emailClient = module.emailClient;
  } catch (importError) {
    console.error('[Newsletter] ❌ Failed to load email client:', importError);
    alert('Error loading email service. Please refresh the page.');
    return;
  }
  
  // Desabilitar botão
  const origButtonState = button ? {
    disabled: button.disabled,
    text: button.textContent
  } : null;
  
  if (button) {
    button.disabled = true;
    button.textContent = 'Subscribing...';
  }
  
  try {
    console.log('[Newsletter] 📤 Sending newsletter subscription...');
    
    // ✨ AQUI ESTÁ A MUDANÇA PRINCIPAL
    // ANTES: ~30 linhas de fetch, parse, validação
    // AGORA: 1 linha simples!
    const response = await emailClient.sendNewsletterSubscription(email);
    
    console.log('[Newsletter] ✅ Newsletter subscription sent successfully!');
    console.log('[Newsletter] ✅ Resend ID:', response.id);
    alert('Thank you for subscribing to our newsletter!');
    emailInput.value = ''; // Clear email field
    
  } catch (err) {
    console.error('[Newsletter] ❌ Error sending newsletter subscription:', err);
    let errorMsg = 'Error subscribing to newsletter.';
    if (err.message) {
      errorMsg = `Error: ${err.message}`;
    }
    alert(errorMsg + '\n\nPlease try again later or contact us directly.');
  } finally {
    if (button && origButtonState) {
      button.disabled = origButtonState.disabled;
      button.textContent = origButtonState.text;
    }
  }
};

// ============================================
// OPÇÃO 2: Se contact-form.js virar módulo ES6
// ============================================

// No topo do arquivo:
// import { emailClient } from '/assets/email-client-module.js';

// Dentro da função:
// const response = await emailClient.sendNewsletterSubscription(email);

// ============================================
// COMPARAÇÃO: Antes vs Depois
// ============================================

// ❌ ANTES (código atual - ~30 linhas):
/*
const res = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'contact@fabiobdaniel.com',
    replyTo: email,
    subject: 'NEWSLETTER',
    html: `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
    `,
    text: `New Newsletter Subscription\n\nEmail: ${email}\nSubscribed at: ${new Date().toLocaleString()}`
  })
});

const responseText = await res.text();
let json;
try {
  json = responseText ? JSON.parse(responseText) : {};
} catch (parseErr) {
  console.error('[Newsletter] ❌ Failed to parse JSON:', parseErr);
  throw new Error(`Server error (${res.status}): ${responseText || res.statusText}`);
}

if (res.ok && json.success) {
  console.log('[Newsletter] ✅ Newsletter subscription sent successfully!');
  console.log('[Newsletter] ✅ Resend ID:', json.id);
  alert('Thank you for subscribing to our newsletter!');
  emailInput.value = '';
} else {
  const errorMsg = json.message || json.error || `HTTP ${res.status}: ${res.statusText}`;
  console.error('[Newsletter] ❌ Error:', errorMsg);
  throw new Error(errorMsg);
}
*/

// ✅ DEPOIS (com módulo - 1 linha!):
// const response = await emailClient.sendNewsletterSubscription(email);

// ============================================
// O QUE O MÓDULO FAZ AUTOMATICAMENTE:
// ============================================
// ✅ Cria HTML formatado
// ✅ Cria texto formatado
// ✅ Adiciona data/hora
// ✅ Define assunto "NEWSLETTER"
// ✅ Define destinatário "contact@fabiobdaniel.com"
// ✅ Define reply-to como email do usuário
// ✅ Faz requisição HTTP
// ✅ Trata erros
// ✅ Retorna resposta formatada

// ============================================
// INFORMAÇÕES NECESSÁRIAS:
// ============================================
// ✅ NADA! O módulo já está configurado
// ✅ Só precisa do email do usuário
// ✅ Tudo mais é automático
