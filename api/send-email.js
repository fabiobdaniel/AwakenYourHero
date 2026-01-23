/**
 * Vercel Serverless Function to send emails
 * Refactored to use SOLID principles
 * Uses EmailServiceFactory to get appropriate email service
 */

const { EmailServiceFactory, EmailRequestDTO } = require('./services/email/index.js');

/**
 * HTTP Handler for email sending
 * Follows Single Responsibility Principle - only handles HTTP requests/responses
 */
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[EmailAPI] Request received:', { method: req.method });
    
    // Create email request DTO
    const emailRequest = new EmailRequestDTO(req.body);
    
    // Validate request
    const validation = emailRequest.validate();
    if (!validation.valid) {
      console.error('[EmailAPI] Validation failed:', validation.errors);
      return res.status(400).json({ 
        error: 'Invalid request', 
        errors: validation.errors,
        received: emailRequest.toJSON()
      });
    }

    // Get email service from factory (follows Dependency Inversion Principle)
    const emailService = EmailServiceFactory.create(process.env);

    if (!emailService) {
      const availableServices = EmailServiceFactory.getAvailableServices(process.env);
      console.error('[EmailAPI] No email service available:', availableServices);
      
      return res.status(500).json({ 
        error: 'Email service not configured',
        message: 'Please configure RESEND_API_KEY or SMTP credentials in Vercel environment variables. Go to Vercel Dashboard → Settings → Environment Variables',
        configured: availableServices
      });
    }

    console.log('[EmailAPI] Using email service:', emailService.getName());
    console.log('[EmailAPI] Sending email:', { 
      to: emailRequest.to, 
      subject: emailRequest.subject,
      hasHtml: !!emailRequest.html,
      hasText: !!emailRequest.text,
      replyTo: emailRequest.replyTo 
    });

    // Send email using service (follows Liskov Substitution Principle)
    const emailResponse = await emailService.sendEmail(emailRequest);

    console.log('[EmailAPI] Email sent successfully:', emailResponse.id);
    
    return res.status(200).json(emailResponse.toJSON());

  } catch (error) {
    console.error('[EmailAPI] Error:', error);
    console.error('[EmailAPI] Error stack:', error.stack);
    
    // Return detailed error for debugging
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message || 'Unknown error occurred',
      type: error.name || 'Error'
    });
  }
}
