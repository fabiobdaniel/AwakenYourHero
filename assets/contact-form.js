// Contact Form Enhancement
// Add country code to phone; submit via Vercel API + Resend

(function() {
  'use strict';

  // ========================================
  // LOG FILE SYSTEM
  // ========================================
  const logEntries = [];
  const MAX_LOG_ENTRIES = 1000; // Keep last 1000 entries

  // Intercept console.log for ContactForm
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  function addToLog(level, ...args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');

    // Capture stack trace to get code execution info
    let stackTrace = '';
    let functionName = '';
    let fileName = '';
    let lineNumber = '';
    
    try {
      const stack = new Error().stack;
      if (stack) {
        const stackLines = stack.split('\n');
        // Skip first 3 lines (Error, addToLog, console override)
        // Look for the actual calling function
        for (let i = 3; i < Math.min(stackLines.length, 8); i++) {
          const line = stackLines[i];
          if (line && !line.includes('contact-form.js') || i === 3) {
            // Extract function name
            const funcMatch = line.match(/at\s+(\w+)/);
            if (funcMatch) {
              functionName = funcMatch[1];
            }
            
            // Extract file and line
            const fileMatch = line.match(/\((.+):(\d+):(\d+)\)/) || line.match(/(.+):(\d+):(\d+)/);
            if (fileMatch) {
              fileName = fileMatch[1].split('/').pop(); // Just filename
              lineNumber = fileMatch[2];
            }
            
            stackTrace = line.trim();
            break;
          }
        }
      }
    } catch (e) {
      // Ignore stack trace errors
    }

    const logEntry = {
      timestamp,
      level,
      message,
      fullArgs: args,
      functionName: functionName || 'unknown',
      fileName: fileName || 'contact-form.js',
      lineNumber: lineNumber || '?',
      stackTrace: stackTrace || ''
    };

    logEntries.push(logEntry);
    
    // Keep only last MAX_LOG_ENTRIES
    if (logEntries.length > MAX_LOG_ENTRIES) {
      logEntries.shift();
    }

    // Also save to localStorage (last 100 entries)
    try {
      const recentLogs = logEntries.slice(-100);
      localStorage.setItem('contactFormLogs', JSON.stringify(recentLogs));
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  // Override console methods for ContactForm logs
  console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    if (args[0] && typeof args[0] === 'string' && args[0].includes('[ContactForm]')) {
      addToLog('LOG', ...args);
    }
  };

  console.error = function(...args) {
    originalConsoleError.apply(console, args);
    if (args[0] && typeof args[0] === 'string' && args[0].includes('[ContactForm]')) {
      addToLog('ERROR', ...args);
    }
  };

  console.warn = function(...args) {
    originalConsoleWarn.apply(console, args);
    if (args[0] && typeof args[0] === 'string' && args[0].includes('[ContactForm]')) {
      addToLog('WARN', ...args);
    }
  };

  // Function to download logs as file
  window.downloadContactFormLogs = function() {
    if (logEntries.length === 0) {
      alert('No logs available. Submit the form first to generate logs.');
      return;
    }

    const logText = logEntries.map(entry => {
      let logLine = `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
      
      // Add code execution info
      if (entry.functionName && entry.functionName !== 'unknown') {
        logLine += `\n  └─ Function: ${entry.functionName}`;
      }
      if (entry.fileName && entry.lineNumber) {
        logLine += `\n  └─ Code: ${entry.fileName}:${entry.lineNumber}`;
      }
      if (entry.stackTrace) {
        logLine += `\n  └─ Stack: ${entry.stackTrace}`;
      }
      
      return logLine;
    }).join('\n\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-form-logs-${new Date().toISOString().replace(/[:.]/g, '-')}.log`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to get logs as text
  window.getContactFormLogs = function() {
    return logEntries.map(entry => {
      let logLine = `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
      
      // Add code execution info
      if (entry.functionName && entry.functionName !== 'unknown') {
        logLine += `\n  └─ Function: ${entry.functionName}`;
      }
      if (entry.fileName && entry.lineNumber) {
        logLine += `\n  └─ Code: ${entry.fileName}:${entry.lineNumber}`;
      }
      if (entry.stackTrace) {
        logLine += `\n  └─ Stack: ${entry.stackTrace}`;
      }
      
      return logLine;
    }).join('\n\n');
  };

  // Load previous logs from localStorage
  try {
    const savedLogs = localStorage.getItem('contactFormLogs');
    if (savedLogs) {
      const parsed = JSON.parse(savedLogs);
      logEntries.push(...parsed);
      console.log('[ContactForm] 📋 Loaded', parsed.length, 'previous log entries from localStorage');
    }
  } catch (e) {
    // Ignore
  }

  console.log('[ContactForm] 📋 Log file system initialized. Use downloadContactFormLogs() to download logs.');
  // ========================================

  // Add download logs button
  function addDownloadLogsButton() {
    // Check if button already exists
    if (document.getElementById('download-logs-btn')) {
      console.log('[ContactForm] 📋 Download logs button already exists');
      return;
    }

    // Check if body exists
    if (!document.body) {
      console.log('[ContactForm] 📋 Body not ready, will retry...');
      return;
    }

    try {
      const btn = document.createElement('button');
      btn.id = 'download-logs-btn';
      btn.innerHTML = '📥 Download Logs';
      btn.title = 'Download contact form logs as .log file';
      btn.style.cssText = `
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 999999 !important;
        padding: 10px 15px !important;
        background: #007bff !important;
        color: white !important;
        border: none !important;
        border-radius: 5px !important;
        cursor: pointer !important;
        font-size: 14px !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
        font-family: system-ui, -apple-system, sans-serif !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
      
      btn.addEventListener('click', () => {
        window.downloadContactFormLogs();
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.background = '#0056b3';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.background = '#007bff';
      });

      document.body.appendChild(btn);
      console.log('[ContactForm] 📋 Download logs button added to page successfully');
      console.log('[ContactForm] 📋 Button position:', btn.getBoundingClientRect());
    } catch (error) {
      console.error('[ContactForm] 📋 Error adding download logs button:', error);
    }
  }

  // Wait for DOM to be ready
  function init() {
    console.log('[ContactForm] 🔧 EXECUTING: init()');
    console.log('[ContactForm] 🔧 Parameters: none');
    console.log('[ContactForm] 🔧 Document ready state:', document.readyState);
    
    // Add download logs button - try multiple times
    const tryAddButton = () => {
      if (document.body) {
        addDownloadLogsButton();
      }
    };

    // Try immediately
    tryAddButton();

    // Try after delays
    setTimeout(tryAddButton, 500);
    setTimeout(tryAddButton, 1000);
    setTimeout(tryAddButton, 2000);
    setTimeout(tryAddButton, 3000);

    // Also try when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryAddButton);
    }

    // Continuous monitoring to ensure country selector stays
    const monitorPhoneInput = () => {
      const phoneInput = findPhoneInput();
      
      if (phoneInput && !phoneInput.closest('.phone-input-wrapper')) {
        setupPhoneInput(phoneInput);
      }
    };
    
    // Try immediately
    monitorPhoneInput();
    
    // Keep checking periodically (React may re-render)
    const checkInterval = setInterval(() => {
      monitorPhoneInput();
    }, 1000);
    
    // Also use MutationObserver for immediate detection
    const observer = new MutationObserver(() => {
      monitorPhoneInput();
    });
    
    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Stop monitoring after 2 minutes (form should be loaded by then)
    setTimeout(() => {
      clearInterval(checkInterval);
      observer.disconnect();
    }, 120000);
    
    setupEmailForm();
  }
  
  function findPhoneInput() {
    // First, try to find input that's already wrapped but might have lost its wrapper
    let phoneInput = document.querySelector('.phone-input-wrapper input[type="tel"]');
    if (phoneInput) {
      // Check if wrapper still exists
      if (!phoneInput.closest('.phone-input-wrapper')) {
        // Wrapper was removed, return the input to be re-wrapped
        return phoneInput;
      }
      // Already wrapped correctly
      return null;
    }
    
    // Try multiple selectors for unwrapped inputs
    phoneInput = document.querySelector('input[type="tel"]:not(.phone-input-wrapper input)');
    if (!phoneInput) {
      phoneInput = Array.from(document.querySelectorAll('input')).find(
        input => !input.closest('.phone-input-wrapper') && 
                 input.placeholder && 
                 input.placeholder.toLowerCase().includes('phone')
      );
    }
    if (!phoneInput) {
      phoneInput = Array.from(document.querySelectorAll('input')).find(
        input => !input.closest('.phone-input-wrapper') &&
                 input.name && 
                 input.name.toLowerCase().includes('phone')
      );
    }
    if (!phoneInput) {
      // Try by id
      phoneInput = document.getElementById('phone');
      if (phoneInput && phoneInput.closest('.phone-input-wrapper')) {
        return null; // Already wrapped
      }
    }
    return phoneInput;
  }
  
  function setupPhoneInput(phoneInput) {
    console.log('[ContactForm] 🔧 EXECUTING: setupPhoneInput()');
    console.log('[ContactForm] 🔧 Parameters:', { 
      phoneInput: phoneInput ? 'found' : 'not found',
      phoneInputId: phoneInput?.id,
      phoneInputName: phoneInput?.name,
      phoneInputType: phoneInput?.type
    });
    
    if (!phoneInput) {
      console.log('[ContactForm] 🔧 setupPhoneInput() - EXIT: no phoneInput');
      return;
    }
    
    // Check if already wrapped
    if (phoneInput.closest('.phone-input-wrapper')) {
      return;
    }
    
    // Create country code selector
    const phoneWrapper = document.createElement('div');
      phoneWrapper.className = 'phone-input-wrapper';
      phoneWrapper.style.display = 'flex';
      phoneWrapper.style.gap = '8px';
      phoneWrapper.style.alignItems = 'center';
      
      const countrySelect = document.createElement('select');
      countrySelect.className = 'country-code-select';
      countrySelect.style.padding = '8px 8px';
      countrySelect.style.border = '1px solid hsl(var(--border))';
      countrySelect.style.borderRadius = 'calc(var(--radius) - 2px)';
      countrySelect.style.backgroundColor = 'hsl(var(--background))';
      countrySelect.style.color = 'hsl(var(--foreground))';
      countrySelect.style.fontSize = '18px';
      countrySelect.style.width = '60px';
      countrySelect.style.minWidth = '60px';
      countrySelect.style.textAlign = 'center';
      countrySelect.style.cursor = 'pointer';
      countrySelect.style.flexShrink = '0';
      
      // Make phone input longer
      phoneInput.style.flex = '1';
      phoneInput.style.minWidth = '0';
      
      // Add country codes: US (default), BR, MX, then others alphabetically
      const countries = [
        { code: '+1', country: 'US/CA', flag: '🇺🇸' },
        { code: '+55', country: 'BR', flag: '🇧🇷' },
        { code: '+52', country: 'MX', flag: '🇲🇽' },
        { code: '+54', country: 'AR', flag: '🇦🇷' },
        { code: '+56', country: 'CL', flag: '🇨🇱' },
        { code: '+57', country: 'CO', flag: '🇨🇴' },
        { code: '+506', country: 'CR', flag: '🇨🇷' },
        { code: '+502', country: 'GT', flag: '🇬🇹' },
        { code: '+51', country: 'PE', flag: '🇵🇪' },
        { code: '+1', country: 'PR', flag: '🇵🇷' },
        { code: '+351', country: 'PT', flag: '🇵🇹' },
      ];
      
      // Store countries data on select element for later use
      countrySelect.countriesData = countries;
      
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.setAttribute('data-flag', country.flag);
        option.setAttribute('data-country-name', country.country);
        option.textContent = country.flag; // Show only flag
        countrySelect.appendChild(option);
      });
      
      // Set default to US (+1)
      countrySelect.value = '+1';
      
      // Wrap phone input
      const parent = phoneInput.parentNode;
      if (!parent) return;
      
      // Store original parent reference
      phoneWrapper.dataset.originalParent = parent.tagName;
      
      parent.insertBefore(phoneWrapper, phoneInput);
      phoneWrapper.appendChild(countrySelect);
      phoneWrapper.appendChild(phoneInput);
      
      // Mark the input so we can find it even if React replaces it
      phoneInput.dataset.hasCountrySelector = 'true';
      countrySelect.dataset.phoneWrapper = 'true';
      
      // Use MutationObserver to re-apply if React removes it
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Check if wrapper was removed
          mutation.removedNodes.forEach((node) => {
            if (node === phoneWrapper || (node.nodeType === 1 && node.contains && node.contains(phoneWrapper))) {
              // Wrapper was removed, try to re-add it
              setTimeout(() => {
                const newPhoneInput = findPhoneInput();
                if (newPhoneInput && !newPhoneInput.closest('.phone-input-wrapper')) {
                  setupPhoneInput(newPhoneInput);
                }
              }, 50);
            }
          });
          
          // Check if input was replaced (React re-render)
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const newInput = node.querySelector && node.querySelector('input[type="tel"]');
              if (newInput && !newInput.closest('.phone-input-wrapper') && !newInput.dataset.hasCountrySelector) {
                setTimeout(() => {
                  setupPhoneInput(newInput);
                }, 50);
              }
            }
          });
        });
      });
      
      observer.observe(parent, { 
        childList: true, 
        subtree: true,
        attributes: false
      });
      
      // Also observe the form container for React re-renders
      const form = phoneInput.closest('form');
      if (form) {
        const formObserver = new MutationObserver(() => {
          setTimeout(() => {
            const currentInput = findPhoneInput();
            if (currentInput && !currentInput.closest('.phone-input-wrapper')) {
              setupPhoneInput(currentInput);
            }
          }, 100);
        });
        
        formObserver.observe(form, {
          childList: true,
          subtree: true
        });
      }
  }
  
  function setupEmailForm() {
    console.log('[ContactForm] 🔧 EXECUTING: setupEmailForm()');
    console.log('[ContactForm] 🔧 Parameters: none');
    
    // Find contact form - wait for React to render
    let contactForm = null;
    const maxAttempts = 10;
    let attempts = 0;
    
    const findForm = setInterval(() => {
      attempts++;
      contactForm = document.querySelector('form');
      
      if (contactForm || attempts >= maxAttempts) {
        clearInterval(findForm);
        if (contactForm) {
          enhanceFormSubmission(contactForm);
        }
      }
    }, 500);
  }
  
  function enhanceFormSubmission(contactForm) {
    console.log('[ContactForm] 🔧 EXECUTING: enhanceFormSubmission()');
    console.log('[ContactForm] 🔧 Parameters:', { 
      contactForm: contactForm ? 'found' : 'not found',
      formId: contactForm?.id,
      formAction: contactForm?.action,
      formMethod: contactForm?.method
    });
    
    if (contactForm) {
      console.log('[ContactForm] 🔧 Adding submit event listener to form');
      contactForm.addEventListener('submit', async function(e) {
        console.log('[ContactForm] ========================================');
        console.log('[ContactForm] 🖱️  SUBMIT BUTTON CLICKED');
        console.log('[ContactForm] ========================================');
        
        e.preventDefault();
        e.stopImmediatePropagation();

        console.log('[ContactForm] 📝 Step 1: Collecting form data...');
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        console.log('[ContactForm] 📝 FormData collected:', Object.fromEntries(formData));
        
        console.log('[ContactForm] 📝 Step 2: Processing form inputs...');
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
          if (!input.name) return;
          const n = input.name, v = input.value;
          if (n === 'fullName' || n === 'name' || n === 'fullname') data.name = v || data.name;
          else if (n === 'email' || n === 'e-mail') data.email = v || data.email;
          else if (n === 'interest' || n === 'interested' || n === 'service') data.interest = v || data.interest;
          else if (n === 'message' || n === 'msg' || n === 'comments') data.message = v || data.message;
          else if (n !== 'phone' && n !== 'tel') data[n] = v || data[n];
        });
        console.log('[ContactForm] 📝 Processed data:', data);
        
        console.log('[ContactForm] 📱 Step 3: Processing phone number...');
        const countrySelect = document.querySelector('.country-code-select');
        const phoneInput = document.querySelector('.phone-input-wrapper input') || document.querySelector('input[type="tel"]') || document.querySelector('input[name="phone"]') || document.querySelector('input[id="phone"]');
        if (phoneInput && countrySelect) {
          const pv = phoneInput.value.trim();
          const cc = countrySelect.value;
          const opt = countrySelect.options[countrySelect.selectedIndex];
          const flag = opt ? opt.getAttribute('data-flag') : '';
          console.log('[ContactForm] 📱 Phone input found:', { value: pv, countryCode: cc, flag });
          if (pv) {
            const num = pv.startsWith('+') ? pv : cc + pv.replace(/^\+/, '');
            data.phoneDisplay = flag ? `${flag} ${num}` : num;
            console.log('[ContactForm] 📱 Phone formatted:', data.phoneDisplay);
          }
        } else if (phoneInput && phoneInput.value.trim()) {
          data.phoneDisplay = phoneInput.value.trim();
          console.log('[ContactForm] 📱 Phone (no country selector):', data.phoneDisplay);
        } else {
          console.log('[ContactForm] 📱 No phone input found');
        }
        
        console.log('[ContactForm] 📧 Step 4: Building email content...');
        const interestLabels = { coffee: 'Coffee with Fabio', speaking: 'Speaking Engagement', 'break-the-cage': 'Break the Cage Experience', mentoring: 'Mentoring / Coaching', advisory: 'Advisory Services', other: 'Virtual Coffee with Fabio' };
        const interestLabel = interestLabels[data.interest] || data.interest || 'General Inquiry';
        const subject = `${interestLabel} - ${data.name || 'New Contact'}`;
        console.log('[ContactForm] 📧 Email subject:', subject);
        
        const html = [
          '<h2>New Contact Form Submission</h2>',
          '<p><strong>Interest:</strong> ' + (interestLabel || 'N/A') + '</p>',
          '<p><strong>Name:</strong> ' + (data.name || 'N/A') + '</p>',
          '<p><strong>Email:</strong> ' + (data.email || 'N/A') + '</p>',
          '<p><strong>Phone:</strong> ' + (data.phoneDisplay || 'N/A') + '</p>',
          '<p><strong>Message:</strong></p><p>' + (data.message || 'N/A').trim() + '</p>'
        ].join('');
        const text = [
          'New Contact Form Submission',
          'Interest: ' + (interestLabel || 'N/A'),
          'Name: ' + (data.name || 'N/A'),
          'Email: ' + (data.email || 'N/A'),
          'Phone: ' + (data.phoneDisplay || 'N/A'),
          'Message: ' + (data.message || 'N/A').trim()
        ].join('\n');

        console.log('[ContactForm] 🔘 Step 5: Disabling submit button...');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
        console.log('[ContactForm] 🔘 Submit button disabled, text changed to "Sending..."');

        try {
          console.log('[ContactForm] ========================================');
          console.log('[ContactForm] 📤 Step 6: Sending email to API...');
          console.log('[ContactForm] 📤 Request payload:', { 
            to: 'contact@fabiobdaniel.com', 
            replyTo: data.email || undefined,
            subject: subject,
            hasHtml: !!html,
            hasText: !!text
          });
          
          const requestStartTime = Date.now();
          console.log('[ContactForm] 📤 Fetch request started at:', new Date().toISOString());
          
          const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'contact@fabiobdaniel.com',
              replyTo: data.email || undefined,
              subject: subject,
              html: html,
              text: text
            })
          });
          
          const requestDuration = Date.now() - requestStartTime;
          console.log('[ContactForm] 📥 Step 7: API response received');
          console.log('[ContactForm] 📥 Response status:', res.status, res.statusText);
          console.log('[ContactForm] 📥 Request duration:', requestDuration + 'ms');
          
          console.log('[ContactForm] 📥 Step 8: Parsing response...');
          let json;
          try {
            json = await res.json();
            console.log('[ContactForm] 📥 Response parsed successfully:', json);
          } catch (parseErr) {
            console.error('[ContactForm] ❌ Failed to parse JSON response:', parseErr);
            const text = await res.text();
            console.error('[ContactForm] ❌ Response text:', text);
            throw new Error(`Server error (${res.status}): ${text || res.statusText}`);
          }
          
          console.log('[ContactForm] ✅ Step 9: Validating response...');
          if (res.ok && json.success) {
            console.log('[ContactForm] ✅ Response is OK and success=true');
            console.log('[ContactForm] ✅ Full response:', json);
            
            // Validate that we got a Resend ID
            if (json.id) {
              console.log('[ContactForm] ========================================');
              console.log('[ContactForm] ✅✅✅ EMAIL SENT SUCCESSFULLY! ✅✅✅');
              console.log('[ContactForm] ✅ Resend email ID:', json.id);
              console.log('[ContactForm] ✅ Message:', json.message || 'No message');
              console.log('[ContactForm] ========================================');
              alert('Message sent successfully! We will get back to you soon.');
            } else {
              console.warn('[ContactForm] ⚠️  Response OK but no email ID:', json);
              console.warn('[ContactForm] ⚠️  This might indicate the email was not actually sent');
              alert('Message submitted, but please verify in Resend dashboard. Check console for details.');
            }
            
            console.log('[ContactForm] 🧹 Step 10: Resetting form...');
            contactForm.reset();
            const cs = document.querySelector('.country-code-select');
            if (cs) cs.value = '+1';
            console.log('[ContactForm] 🧹 Form reset complete');
          } else {
            const errorMsg = json.message || json.error || `HTTP ${res.status}: ${res.statusText}`;
            console.error('[ContactForm] ❌ Response validation failed');
            console.error('[ContactForm] ❌ Error message:', errorMsg);
            console.error('[ContactForm] ❌ Full error response:', json);
            throw new Error(errorMsg);
          }
        } catch (err) {
          console.error('[ContactForm] ========================================');
          console.error('[ContactForm] ❌❌❌ ERROR OCCURRED ❌❌❌');
          console.error('[ContactForm] ❌ Error type:', err.name);
          console.error('[ContactForm] ❌ Error message:', err.message);
          console.error('[ContactForm] ❌ Error stack:', err.stack);
          console.error('[ContactForm] ========================================');
          
          let errorMsg = 'Error sending message.';
          
          if (err.message) {
            if (err.message.includes('Email service not configured')) {
              errorMsg = 'Email service not configured. Please check Vercel environment variables (RESEND_API_KEY).';
            } else if (err.message.includes('Domain not verified') || err.message.includes('Invalid from address')) {
              errorMsg = 'Email domain not verified. Using onboarding@resend.dev for now.';
            } else if (err.message.includes('Unauthorized') || err.message.includes('Invalid API key')) {
              errorMsg = 'Invalid API key. Please check RESEND_API_KEY in Vercel.';
            } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
              errorMsg = 'Network error. Please check your connection.';
            } else {
              errorMsg = `Error: ${err.message}`;
            }
          }
          
          errorMsg += '\n\nCheck the browser console (F12) for details.';
          errorMsg += '\n\nIf the problem persists, email contact@fabiobdaniel.com directly.';
          
          alert(errorMsg);
        } finally {
          console.log('[ContactForm] 🔄 Step 11: Re-enabling submit button...');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = origText; }
          console.log('[ContactForm] 🔄 Submit button re-enabled');
          console.log('[ContactForm] ========================================');
          console.log('[ContactForm] 🏁 PROCESS COMPLETE');
          console.log('[ContactForm] ========================================');
        }
      }, true);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
