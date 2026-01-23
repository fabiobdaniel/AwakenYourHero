/**
 * SMTP Email Service Implementation
 * Follows Single Responsibility Principle - only handles SMTP
 * Follows Liskov Substitution Principle - can replace IEmailService
 */

const { IEmailService } = require('./IEmailService.js');
const { EmailRequestDTO, EmailResponseDTO } = require('./EmailDTO.js');

/**
 * SMTP Email Service (using Nodemailer)
 * @class
 * @implements {IEmailService}
 */
class SMTPEmailService extends IEmailService {
  /**
   * @param {Object} config
   * @param {string} config.host - SMTP host
   * @param {string} config.user - SMTP username
   * @param {string} config.pass - SMTP password
   * @param {number} [config.port=587] - SMTP port
   * @param {boolean} [config.secure=false] - Use TLS
   * @param {string} [config.from] - Default sender email
   */
  constructor(config) {
    super();
    this.host = config.host;
    this.user = config.user;
    this.pass = config.pass;
    this.port = config.port || 587;
    this.secure = config.secure || false;
    this.from = config.from || 'noreply@awakenyourhero.com';
  }

  /**
   * @returns {string}
   */
  getName() {
    return 'SMTP';
  }

  /**
   * @returns {boolean}
   */
  isAvailable() {
    return !!(this.host && this.user && this.pass);
  }

  /**
   * Send email via SMTP
   * @param {EmailRequestDTO} emailRequest
   * @returns {Promise<EmailResponseDTO>}
   * @throws {Error}
   */
  async sendEmail(emailRequest) {
    if (!this.isAvailable()) {
      throw new Error('SMTP service is not configured');
    }

    // Validate request
    const validation = emailRequest.validate();
    if (!validation.valid) {
      throw new Error(`Invalid email request: ${validation.errors.join(', ')}`);
    }

    try {
      // Dynamic import to avoid requiring nodemailer if not used
      const nodemailer = await import('nodemailer');

      const transporter = nodemailer.default.createTransport({
        host: this.host,
        port: this.port,
        secure: this.secure,
        auth: {
          user: this.user,
          pass: this.pass
        }
      });

      const mailOptions = {
        from: this.from,
        to: emailRequest.to,
        subject: emailRequest.subject,
        html: emailRequest.html,
        text: emailRequest.text
      };

      if (emailRequest.replyTo) {
        mailOptions.replyTo = emailRequest.replyTo;
      }

      const info = await transporter.sendMail(mailOptions);

      return new EmailResponseDTO({
        success: true,
        id: info.messageId,
        message: 'Email sent successfully via SMTP'
      });

    } catch (error) {
      console.error('[SMTPEmailService] Error sending email:', error);
      throw error;
    }
  }
}

module.exports = { SMTPEmailService };
