/**
 * Email Client Module (ES6 Module)
 * Can be imported in modern JavaScript environments
 */

/**
 * Email Client
 * @class
 */
export class EmailClient {
  /**
   * @param {string} [apiUrl='/api/send-email'] - API endpoint URL
   */
  constructor(apiUrl = '/api/send-email') {
    this.apiUrl = apiUrl;
  }

  /**
   * Send email via API
   * @param {Object} emailData
   * @param {string} emailData.to - Recipient email
   * @param {string} emailData.subject - Email subject
   * @param {string} [emailData.html] - HTML content
   * @param {string} [emailData.text] - Plain text content
   * @param {string} [emailData.replyTo] - Reply-to email
   * @returns {Promise<Object>} Response with success, id, message
   * @throws {Error} If request fails
   */
  async sendEmail(emailData) {
    const { to, subject, html, text, replyTo } = emailData;

    // Validate required fields
    if (!to || !subject) {
      throw new Error('Missing required fields: to and subject are required');
    }

    if (!html && !text) {
      throw new Error('Either html or text content is required');
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to,
          subject,
          html,
          text,
          replyTo
        })
      });

      const responseText = await response.text();
      let json;

      try {
        json = responseText ? JSON.parse(responseText) : {};
      } catch (parseErr) {
        throw new Error(`Server error (${response.status}): ${responseText || response.statusText}`);
      }

      if (!response.ok) {
        const errorMsg = json.message || json.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMsg);
      }

      return json;

    } catch (error) {
      console.error('[EmailClient] Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send contact form email
   * @param {Object} formData
   * @param {string} formData.name - Sender name
   * @param {string} formData.email - Sender email
   * @param {string} formData.message - Message content
   * @param {string} [formData.phone] - Phone number
   * @param {string} [formData.interest] - Interest/service
   * @param {string} [recipient='contact@fabiobdaniel.com'] - Recipient email
   * @returns {Promise<Object>} Response
   */
  async sendContactForm(formData, recipient = 'contact@fabiobdaniel.com') {
    const { name, email, message, phone, interest } = formData;

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${interest ? `<p><strong>Interest:</strong> ${interest}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br>')}</p>
    `;

    const text = [
      'New Contact Form Submission',
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      phone ? `Phone: ${phone}` : '',
      interest ? `Interest: ${interest}` : '',
      `Message: ${message || 'N/A'}`
    ].filter(Boolean).join('\n');

    return this.sendEmail({
      to: recipient,
      subject: `Contact Form: ${name || 'New Submission'}`,
      html,
      text,
      replyTo: email
    });
  }

  /**
   * Send newsletter subscription email
   * @param {string} subscriberEmail - Subscriber email
   * @param {string} [recipient='contact@fabiobdaniel.com'] - Recipient email
   * @returns {Promise<Object>} Response
   */
  async sendNewsletterSubscription(subscriberEmail, recipient = 'contact@fabiobdaniel.com') {
    const html = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${subscriberEmail}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
    `;

    const text = `New Newsletter Subscription\n\nEmail: ${subscriberEmail}\nSubscribed at: ${new Date().toLocaleString()}`;

    return this.sendEmail({
      to: recipient,
      subject: 'NEWSLETTER',
      html,
      text,
      replyTo: subscriberEmail
    });
  }

  /**
   * Send custom email
   * @param {Object} options
   * @param {string} options.to - Recipient
   * @param {string} options.subject - Subject
   * @param {string} [options.html] - HTML content
   * @param {string} [options.text] - Text content
   * @param {string} [options.replyTo] - Reply-to
   * @returns {Promise<Object>} Response
   */
  async sendCustomEmail(options) {
    return this.sendEmail(options);
  }
}
