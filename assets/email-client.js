/**
 * Email Client for Frontend
 * Import this in your frontend JavaScript files to send emails
 * 
 * Usage:
 *   import { emailClient } from '/assets/email-client.js';
 *   await emailClient.sendContactForm({ name, email, message });
 */

import { EmailClient } from './email-client-module.js';

// Export singleton instance
export const emailClient = new EmailClient('/api/send-email');

// Also export the class for custom instances
export { EmailClient };
