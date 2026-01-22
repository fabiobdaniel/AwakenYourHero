// Vercel Serverless Function to send emails
// Uses Resend API (free tier available) or Nodemailer with SMTP

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
    console.log('Email API called:', { method: req.method, body: req.body });
    
    const { to, subject, html, text, replyTo } = req.body;

    if (!to || !subject) {
      console.error('Missing required fields:', { to, subject });
      return res.status(400).json({ error: 'Missing required fields', received: { to, subject } });
    }

    // Option 1: Using Resend (recommended for Vercel)
    // You'll need to set RESEND_API_KEY in Vercel environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    console.log('RESEND_API_KEY configured:', !!RESEND_API_KEY);
    
    if (RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Awaken Your Hero <onboarding@resend.dev>';
      console.log('Sending email via Resend:', { from: fromEmail, to, subject });
      
      const emailPayload = {
        from: fromEmail,
        to: [to],
        subject: subject,
        html: html || text,
        text: text || html,
      };
      
      // Add reply-to if provided
      if (replyTo) {
        emailPayload.reply_to = replyTo;
      }
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      });

      const responseText = await response.text();
      console.log('Resend API response status:', response.status);
      console.log('Resend API response:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText || `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const errorMessage = errorData.message || errorData.error?.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('Resend API error:', errorMessage, errorData);
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log('Email sent successfully:', data.id);
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
    console.error('No email service configured. RESEND_API_KEY:', !!RESEND_API_KEY, 'SMTP:', !!(SMTP_HOST && SMTP_USER && SMTP_PASS));
    return res.status(500).json({ 
      error: 'Email service not configured',
      message: 'Please configure RESEND_API_KEY or SMTP credentials in Vercel environment variables. Go to Vercel Dashboard → Settings → Environment Variables',
      configured: {
        resend: !!RESEND_API_KEY,
        smtp: !!(SMTP_HOST && SMTP_USER && SMTP_PASS)
      }
    });
  } catch (error) {
    console.error('Email error:', error);
    console.error('Error stack:', error.stack);
    
    // Return detailed error for debugging
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message || 'Unknown error occurred',
      type: error.name || 'Error'
    });
  }
}
