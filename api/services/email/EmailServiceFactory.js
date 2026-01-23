/**
 * Email Service Factory
 * Follows Open/Closed Principle - open for extension, closed for modification
 * Follows Dependency Inversion Principle - depends on abstractions (IEmailService)
 */

const { ResendEmailService } = require('./ResendEmailService.js');
const { SMTPEmailService } = require('./SMTPEmailService.js');

/**
 * Email Service Factory
 * Creates appropriate email service based on environment configuration
 * @class
 */
export class EmailServiceFactory {
  /**
   * Create email service instance
   * Priority: Resend > SMTP
   * @param {Object} env - Environment variables
   * @returns {IEmailService|null} Email service instance or null if none available
   */
  static create(env = process.env) {
    // Try Resend first (preferred for Vercel)
    if (env.RESEND_API_KEY) {
      const resendService = new ResendEmailService({
        apiKey: env.RESEND_API_KEY,
        fromEmail: env.RESEND_FROM_EMAIL
      });

      if (resendService.isAvailable()) {
        console.log('[EmailServiceFactory] Using Resend email service');
        return resendService;
      }
    }

    // Try SMTP as fallback
    if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
      const smtpService = new SMTPEmailService({
        host: env.SMTP_HOST,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        port: parseInt(env.SMTP_PORT || '587'),
        secure: env.SMTP_SECURE === 'true',
        from: env.SMTP_FROM
      });

      if (smtpService.isAvailable()) {
        console.log('[EmailServiceFactory] Using SMTP email service');
        return smtpService;
      }
    }

    console.warn('[EmailServiceFactory] No email service available');
    return null;
  }

  /**
   * Get available services status
   * @param {Object} env - Environment variables
   * @returns {Object} Status of available services
   */
  static getAvailableServices(env = process.env) {
    return {
      resend: !!(env.RESEND_API_KEY),
      smtp: !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS)
    };
  }
}

module.exports = { EmailServiceFactory };
