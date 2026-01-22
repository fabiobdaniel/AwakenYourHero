// Vercel Serverless Function to send emails
// Uses Resend API (free tier available)

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

    const { to, subject, html, text, replyTo } = req.body || {};
    const finalTo = process.env.CONTACT_TO || to || 'contact@fabiobdaniel.com';

    console.log('Email destination:', { 
      CONTACT_TO: process.env.CONTACT_TO, 
      toFromBody: to, 
      finalTo 
    });

    if (!finalTo || !subject) {
      console.error('Missing required fields:', { to: finalTo, subject });
      return res.status(400).json({ error: 'Missing required fields', received: { to: finalTo, subject } });
    }

    // Using Resend API
    // You'll need to set RESEND_API_KEY in Vercel environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    console.log('RESEND_API_KEY configured:', !!RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', RESEND_API_KEY ? RESEND_API_KEY.length : 0);
    console.log('RESEND_API_KEY starts with re_:', RESEND_API_KEY ? RESEND_API_KEY.startsWith('re_') : false);

    if (RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Awaken Your Hero <onboarding@resend.dev>';
      console.log('Sending email via Resend:', { 
        from: fromEmail, 
        to: finalTo, 
        subject,
        hasHtml: !!html,
        hasText: !!text,
        replyTo: replyTo || 'none'
      });

      const emailPayload = {
        from: fromEmail,
        to: [finalTo],
        subject: subject,
        html: html || text,
        text: text || html,
      };

      if (replyTo) {
        emailPayload.reply_to = replyTo;
      }

      console.log('Resend payload (without API key):', {
        from: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        hasHtml: !!emailPayload.html,
        hasText: !!emailPayload.text,
        replyTo: emailPayload.reply_to || 'none'
      });

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
      console.log('Resend API response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Resend API response body:', responseText);

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

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse Resend response as JSON:', responseText);
        throw new Error(`Invalid response from Resend: ${responseText}`);
      }

      if (!data.id) {
        console.error('Resend response missing email ID:', data);
        throw new Error('Resend API did not return email ID');
      }

      console.log('Email sent successfully via Resend:', { 
        emailId: data.id, 
        to: finalTo,
        from: fromEmail 
      });
      return res.status(200).json({ success: true, id: data.id, provider: 'resend', to: finalTo });
    }

    // If Resend is not configured, return error
    console.error('No email service configured. RESEND_API_KEY:', !!RESEND_API_KEY);
    return res.status(500).json({
      error: 'Email service not configured',
      message: 'Please configure RESEND_API_KEY in Vercel environment variables. Go to Vercel Dashboard → Settings → Environment Variables',
      configured: {
        resend: !!RESEND_API_KEY
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
