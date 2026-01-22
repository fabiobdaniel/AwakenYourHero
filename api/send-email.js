// Vercel Serverless Function to send emails
// Uses Resend API (free tier available) or Nodemailer with SMTP

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Option 1: Using Resend (recommended for Vercel)
    // You'll need to set RESEND_API_KEY in Vercel environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Awaken Your Hero <onboarding@resend.dev>',
          to: [to],
          subject: subject,
          html: html || text,
          text: text || html,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('Resend API error:', errorMessage, errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return res.status(200).json({ success: true, id: data.id });
    }

    // Option 2: Using Nodemailer with SMTP (if you have SMTP credentials)
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // This requires nodemailer package - install with: npm install nodemailer
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@awakenyourhero.com',
        to: to,
        subject: subject,
        html: html,
        text: text,
      });

      return res.status(200).json({ success: true });
    }

    // If neither Resend nor SMTP is configured, return error
    return res.status(500).json({ 
      error: 'Email service not configured',
      message: 'Please configure RESEND_API_KEY or SMTP credentials in Vercel environment variables'
    });
  } catch (error) {
    console.error('Email error:', error);
    
    // Return detailed error for debugging (you can remove details in production)
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message || 'Unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
