/**
 * Resend Email Service Implementation
 * Follows Single Responsibility Principle - only handles Resend API
 * Follows Liskov Substitution Principle - can replace IEmailService
 */

const { IEmailService } = require('./IEmailService.js');
const { EmailRequestDTO, EmailResponseDTO } = require('./EmailDTO.js');

/**
 * Resend Email Service
 * @class
 * @implements {IEmailService}
 */
class ResendEmailService extends IEmailService {
  /**
   * @param {Object} config
   * @param {string} config.apiKey - Resend API key
   * @param {string} [config.fromEmail] - Default sender email
   */
  constructor(config) {
    super();
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail || 'Awaken Your Hero <onboarding@resend.dev>';
    this.apiUrl = 'https://api.resend.com/emails';
  }

  /**
   * @returns {string}
   */
  getName() {
    return 'Resend';
  }

  /**
   * @returns {boolean}
   */
  isAvailable() {
    return !!this.apiKey && typeof this.apiKey === 'string' && this.apiKey.length > 0;
  }

  /**
   * Send email via Resend API
   * @param {EmailRequestDTO} emailRequest
   * @returns {Promise<EmailResponseDTO>}
   * @throws {Error}
   */
  async sendEmail(emailRequest) {
    if (!this.isAvailable()) {
      throw new Error('Resend service is not configured');
    }

    // Validate request
    const validation = emailRequest.validate();
    if (!validation.valid) {
      throw new Error(`Invalid email request: ${validation.errors.join(', ')}`);
    }

    try {
      // Prepare payload
      const payload = {
        from: this.fromEmail,
        to: [emailRequest.to],
        subject: emailRequest.subject,
        html: emailRequest.html || emailRequest.text,
        text: emailRequest.text || emailRequest.html
      };

      if (emailRequest.replyTo) {
        payload.reply_to = emailRequest.replyTo;
      }

      // Send request
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText || `HTTP ${response.status}: ${response.statusText}` };
        }

        const errorMessage = errorData.message || 
                           errorData.error?.message || 
                           errorData.error || 
                           `HTTP ${response.status}: ${response.statusText}`;
        
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);

      // Validate response
      if (!data || !data.id) {
        throw new Error('Resend API returned invalid response. Check Resend dashboard for details.');
      }

      return new EmailResponseDTO({
        success: true,
        id: data.id,
        message: 'Email queued successfully. Check Resend dashboard to verify delivery.'
      });

    } catch (error) {
      console.error('[ResendEmailService] Error sending email:', error);
      throw error;
    }
  }
}

module.exports = { ResendEmailService };
