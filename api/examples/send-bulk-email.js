/**
 * Example: Sending Bulk Emails
 * Shows how to send multiple emails using the email service
 */

const { EmailServiceFactory, EmailRequestDTO } = require('../services/email/index.js');

/**
 * Example API handler for bulk email sending
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
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
    const { recipients, subject, html, text } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: 'Recipients array is required' });
    }

    // Get email service
    const emailService = EmailServiceFactory.create(process.env);

    if (!emailService) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send emails to all recipients
    const results = [];
    const errors = [];

    for (const recipient of recipients) {
      try {
        const emailRequest = new EmailRequestDTO({
          to: recipient,
          subject,
          html,
          text
        });

        const response = await emailService.sendEmail(emailRequest);
        results.push({
          recipient,
          success: true,
          id: response.id
        });

        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        errors.push({
          recipient,
          error: error.message
        });
      }
    }

    return res.status(200).json({
      success: true,
      sent: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('[BulkEmailAPI] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to send bulk emails',
      message: error.message 
    });
  }
}
