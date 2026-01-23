/**
 * Example: Using Email Service in Another API Route
 * This shows how to use the email service module in other serverless functions
 */

const { EmailServiceFactory, EmailRequestDTO } = require('../services/email/index.js');

/**
 * Example API handler that sends a notification email
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
  // Enable CORS if needed
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
    const { userEmail, notificationType, data } = req.body;

    // Get email service from factory
    const emailService = EmailServiceFactory.create(process.env);

    if (!emailService) {
      return res.status(500).json({ 
        error: 'Email service not configured' 
      });
    }

    // Create email request based on notification type
    let emailRequest;
    
    switch (notificationType) {
      case 'welcome':
        emailRequest = new EmailRequestDTO({
          to: userEmail,
          subject: 'Welcome to Awaken Your Hero!',
          html: `
            <h1>Welcome!</h1>
            <p>Thank you for joining us, ${data.name || 'friend'}!</p>
            <p>We're excited to have you on board.</p>
          `,
          text: `Welcome! Thank you for joining us, ${data.name || 'friend'}!`
        });
        break;

      case 'reminder':
        emailRequest = new EmailRequestDTO({
          to: userEmail,
          subject: 'Reminder: Upcoming Event',
          html: `
            <h2>Reminder</h2>
            <p>Don't forget about: ${data.eventName}</p>
            <p>Date: ${data.date}</p>
          `,
          text: `Reminder: Don't forget about ${data.eventName} on ${data.date}`
        });
        break;

      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    // Send email
    const response = await emailService.sendEmail(emailRequest);

    return res.status(200).json({
      success: true,
      message: 'Notification sent successfully',
      emailId: response.id
    });

  } catch (error) {
    console.error('[NotificationAPI] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to send notification',
      message: error.message 
    });
  }
}
