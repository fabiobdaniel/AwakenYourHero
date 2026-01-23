/**
 * Email Service Interface
 * Follows Interface Segregation Principle - defines only what's needed
 * Follows Dependency Inversion Principle - depends on abstraction
 */

/**
 * Email Service Interface
 * @interface
 */
class IEmailService {
  /**
   * Send an email
   * @abstract
   * @param {EmailRequestDTO} emailRequest - Email request data
   * @returns {Promise<EmailResponseDTO>} Email response
   * @throws {Error} If email sending fails
   */
  async sendEmail(emailRequest) {
    throw new Error('sendEmail() must be implemented by subclass');
  }

  /**
   * Check if the service is configured and available
   * @abstract
   * @returns {boolean} True if service is available
   */
  isAvailable() {
    throw new Error('isAvailable() must be implemented by subclass');
  }

  /**
   * Get service name
   * @abstract
   * @returns {string} Service name
   */
  getName() {
    throw new Error('getName() must be implemented by subclass');
  }
}

module.exports = { IEmailService };
