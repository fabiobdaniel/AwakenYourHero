/**
 * Data Transfer Objects for Email Service
 * Follows Single Responsibility Principle - only handles data structures
 */

/**
 * @typedef {Object} EmailRequest
 * @property {string} to - Recipient email address
 * @property {string} subject - Email subject
 * @property {string} [html] - HTML content
 * @property {string} [text] - Plain text content
 * @property {string} [replyTo] - Reply-to email address
 */

/**
 * @typedef {Object} EmailResponse
 * @property {boolean} success - Whether the email was sent successfully
 * @property {string} [id] - Email service ID (e.g., Resend ID)
 * @property {string} [message] - Response message
 * @property {string} [error] - Error message if failed
 */

/**
 * Email Request DTO
 * @class
 */
class EmailRequestDTO {
  /**
   * @param {EmailRequest} data
   */
  constructor(data) {
    this.to = data.to;
    this.subject = data.subject;
    this.html = data.html || '';
    this.text = data.text || '';
    this.replyTo = data.replyTo;
  }

  /**
   * Validate email request
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.to || typeof this.to !== 'string' || !this.to.includes('@')) {
      errors.push('Invalid recipient email address');
    }

    if (!this.subject || typeof this.subject !== 'string' || this.subject.trim().length === 0) {
      errors.push('Subject is required');
    }

    if (!this.html && !this.text) {
      errors.push('Either HTML or text content is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Convert to plain object
   * @returns {EmailRequest}
   */
  toJSON() {
    return {
      to: this.to,
      subject: this.subject,
      html: this.html,
      text: this.text,
      replyTo: this.replyTo
    };
  }
}

/**
 * Email Response DTO
 * @class
 */
class EmailResponseDTO {
  /**
   * @param {EmailResponse} data
   */
  constructor(data) {
    this.success = data.success || false;
    this.id = data.id;
    this.message = data.message;
    this.error = data.error;
  }

  /**
   * Convert to plain object
   * @returns {EmailResponse}
   */
  toJSON() {
    return {
      success: this.success,
      id: this.id,
      message: this.message,
      error: this.error
    };
  }
}

module.exports = { EmailRequestDTO, EmailResponseDTO };
