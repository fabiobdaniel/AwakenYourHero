// Contact Form Enhancement
// Add country code to phone; submit via mailto: (no backend, Vercel, or Resend)

(function() {
  'use strict';

  // Wait for DOM to be ready
  function init() {
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
    if (!phoneInput) {
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
    if (contactForm) {
      // Capture phase + stopImmediatePropagation: our mailto handler runs first, blocks React/others
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Get all form fields directly
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
          if (input.name) {
            const name = input.name;
            const value = input.value;
            if (name === 'fullName' || name === 'name' || name === 'fullname') {
              data.name = value || data.name;
            } else if (name === 'email' || name === 'e-mail') {
              data.email = value || data.email;
            } else if (name === 'interest' || name === 'interested' || name === 'service') {
              data.interest = value || data.interest;
            } else if (name === 'message' || name === 'msg' || name === 'comments') {
              data.message = value || data.message;
            } else if (name !== 'phone' && name !== 'tel') {
              data[name] = value || data[name];
            }
          }
        });
        
        // Get phone with country code and flag
        const countrySelect = document.querySelector('.country-code-select');
        const phoneInput = document.querySelector('.phone-input-wrapper input') || 
                          document.querySelector('input[type="tel"]') ||
                          document.querySelector('input[name="phone"]') ||
                          document.querySelector('input[id="phone"]');
        
        if (phoneInput && countrySelect) {
          const phoneValue = phoneInput.value.trim();
          const countryCode = countrySelect.value;
          const selectedOption = countrySelect.options[countrySelect.selectedIndex];
          const flag = selectedOption ? selectedOption.getAttribute('data-flag') : '';
          
          if (phoneValue) {
            const phoneNumber = !phoneValue.startsWith('+') 
              ? countryCode + phoneValue.replace(/^\+/, '') 
              : phoneValue;
            data.phoneDisplay = `${flag} ${phoneNumber}`;
          }
        } else if (phoneInput && phoneInput.value.trim()) {
          data.phoneDisplay = phoneInput.value.trim();
        }
        
        // Format interest for subject
        const interestLabels = {
          'coffee': 'Coffee with Fabio',
          'speaking': 'Speaking Engagement',
          'break-the-cage': 'Break the Cage Experience',
          'mentoring': 'Mentoring / Coaching',
          'advisory': 'Advisory Services',
          'other': 'Virtual Coffee with Fabio'
        };
        
        const interestLabel = interestLabels[data.interest] || data.interest || 'General Inquiry';
        const subject = `${interestLabel} - ${data.name || 'New Contact'}`;
        
        // Build email body (plain text for mailto)
        const bodyLines = [
          'New Contact Form Submission',
          '',
          'Interest: ' + (interestLabel || 'N/A'),
          'Name: ' + (data.name || 'N/A'),
          'Email: ' + (data.email || 'N/A'),
          'Phone: ' + (data.phoneDisplay || 'N/A'),
          '',
          'Message:',
          (data.message || 'N/A').trim()
        ];
        let body = bodyLines.join('\n');
        // Some clients limit mailto URL length; keep body under ~1500 chars
        if (body.length > 1500) {
          body = body.slice(0, 1497) + '...';
        }
        
        // Build mailto URL (no backend, no Vercel, no Resend)
        const to = 'contact@fabiobdaniel.com';
        const mailtoUrl = 'mailto:' + to +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        
        // Open email client: use <a> click (more reliable than location.href)
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback and reset
        alert(
          'Your email app should open with the message pre-filled.\n\n' +
          '→ Click SEND in your email app to complete.\n\n' +
          'If nothing opened, email us at contact@fabiobdaniel.com with your details.'
        );
        contactForm.reset();
        
        const cs = document.querySelector('.country-code-select');
        if (cs) cs.value = '+1';
      }, true); // capture: true so we run before React's handler
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
