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
    // Test if API key is valid by making a simple request
    try {
      const testResponse = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
      });

      if (testResponse.status === 401 || testResponse.status === 403) {
        status.recommendations.push({
          priority: 'high',
          message: 'RESEND_API_KEY appears to be invalid or expired',
          action: 'Generate a new API key at https://resend.com/api-keys'
        });
        status.configured.resend.apiKeyValid = false;
      } else if (testResponse.ok) {
        status.configured.resend.apiKeyValid = true;
      }
    } catch (error) {
      status.configured.resend.apiKeyValid = 'unknown';
      status.recommendations.push({
        priority: 'low',
        message: 'Could not verify API key validity',
        action: 'Check network connection'
      });
    }
  }

  return res.status(200).json(status);
}
