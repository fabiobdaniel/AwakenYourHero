// Diagnostic endpoint to check email configuration status
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

  const status = {
    timestamp: new Date().toISOString(),
    configured: {
      resend: {
        apiKey: !!RESEND_API_KEY,
        fromEmail: !!RESEND_FROM_EMAIL,
        fromEmailValue: RESEND_FROM_EMAIL || 'Awaken Your Hero <onboarding@resend.dev> (default)',
        fullyConfigured: !!RESEND_API_KEY
      }
    },
    activeService: RESEND_API_KEY ? 'resend' : 'none',
    recommendations: []
  };

  // Add recommendations
  if (!RESEND_API_KEY) {
    status.recommendations.push({
      priority: 'high',
      message: 'No email service configured. Add RESEND_API_KEY in Vercel Environment Variables.',
      action: 'Go to Vercel Dashboard → Settings → Environment Variables → Add RESEND_API_KEY'
    });
  }

  if (RESEND_API_KEY && !RESEND_FROM_EMAIL) {
    status.recommendations.push({
      priority: 'medium',
      message: 'RESEND_FROM_EMAIL not set. Using default: onboarding@resend.dev',
      action: 'For production, verify domain in Resend and set RESEND_FROM_EMAIL'
    });
  }

  if (RESEND_API_KEY) {
    // Add debug info about the API key
    status.configured.resend.apiKeyLength = RESEND_API_KEY.length;
    status.configured.resend.apiKeyPrefix = RESEND_API_KEY.substring(0, 3);
    status.configured.resend.apiKeyStartsWithRe = RESEND_API_KEY.startsWith('re_');
    
    // Test if API key is valid by making a simple request
    try {
      const testResponse = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
      });

      status.configured.resend.testResponseStatus = testResponse.status;
      const responseText = await testResponse.text();
      
      // Parse response to check for restricted key message
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }
      
      // Check if it's a restricted key (which is OK - it can still send emails)
      const isRestrictedKey = responseData.name === 'restricted_api_key' || 
                              (responseData.message && responseData.message.includes('restricted to only send emails'));
      
      if (testResponse.status === 401 && !isRestrictedKey) {
        // Real authentication error
        status.recommendations.push({
          priority: 'high',
          message: 'RESEND_API_KEY appears to be invalid or expired',
          action: 'Generate a new API key at https://resend.com/api-keys',
          details: `Response status: ${testResponse.status}, Response: ${responseText.substring(0, 200)}`
        });
        status.configured.resend.apiKeyValid = false;
      } else if (testResponse.status === 401 && isRestrictedKey) {
        // Restricted key is valid for sending emails (which is what we need!)
        status.configured.resend.apiKeyValid = true;
        status.configured.resend.isRestrictedKey = true;
        status.recommendations.push({
          priority: 'info',
          message: 'API key is restricted to sending emails only (this is fine!)',
          action: 'The key can send emails, which is all that is needed.',
          details: 'Restricted keys are perfect for sending emails and provide better security.'
        });
      } else if (testResponse.ok) {
        // Full access key
        status.configured.resend.apiKeyValid = true;
        status.configured.resend.isRestrictedKey = false;
      } else {
        status.configured.resend.apiKeyValid = 'unknown';
        status.recommendations.push({
          priority: 'medium',
          message: `Unexpected response from Resend API: ${testResponse.status}`,
          action: 'Check API key and Resend account status',
          details: responseText.substring(0, 200)
        });
      }
    } catch (error) {
      status.configured.resend.apiKeyValid = 'unknown';
      status.configured.resend.testError = error.message;
      status.recommendations.push({
        priority: 'low',
        message: 'Could not verify API key validity',
        action: 'Check network connection',
        details: error.message
      });
    }
  }

  return res.status(200).json(status);
}
