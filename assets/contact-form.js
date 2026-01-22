// Contact Form Enhancement
// Add country code to phone and enable email functionality

(function() {
  'use strict';

  // Wait for DOM to be ready
  function init() {
    // Try multiple times to catch React rendering
    let attempts = 0;
    const maxAttempts = 20;
    
    const trySetup = () => {
      attempts++;
      const phoneInput = findPhoneInput();
      
      if (phoneInput && !phoneInput.closest('.phone-input-wrapper')) {
        setupPhoneInput(phoneInput);
      }
      
      if (attempts < maxAttempts) {
        setTimeout(trySetup, 500);
      }
    };
    
    // Start trying immediately and then at intervals
    trySetup();
    setupEmailForm();
  }
  
  function findPhoneInput() {
    // Try multiple selectors
    let phoneInput = document.querySelector('input[type="tel"]');
    if (!phoneInput) {
      phoneInput = Array.from(document.querySelectorAll('input')).find(
        input => input.placeholder && input.placeholder.toLowerCase().includes('phone')
      );
    }
    if (!phoneInput) {
      phoneInput = Array.from(document.querySelectorAll('input')).find(
        input => input.name && input.name.toLowerCase().includes('phone')
      );
    }
    if (!phoneInput) {
      // Try by id
      phoneInput = document.getElementById('phone');
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
      parent.insertBefore(phoneWrapper, phoneInput);
      phoneWrapper.appendChild(countrySelect);
      phoneWrapper.appendChild(phoneInput);
      
      // Use MutationObserver to re-apply if React removes it
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
            if (node === phoneWrapper || (node.nodeType === 1 && node.contains(phoneWrapper))) {
              // Wrapper was removed, try to re-add it
              setTimeout(() => {
                const newPhoneInput = findPhoneInput();
                if (newPhoneInput && !newPhoneInput.closest('.phone-input-wrapper')) {
                  setupPhoneInput(newPhoneInput);
                }
              }, 100);
            }
          });
        });
      });
      
      observer.observe(parent, { childList: true, subtree: true });
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
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Get all form fields directly (in case FormData doesn't capture everything)
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
          if (input.name) {
            // Try multiple name variations
            const name = input.name;
            const value = input.value;
            
            // Map common field names
            if (name === 'fullName' || name === 'name' || name === 'fullname') {
              data.name = value || data.name;
            } else if (name === 'email' || name === 'e-mail') {
              data.email = value || data.email;
            } else if (name === 'phone' || name === 'tel' || name === 'telephone') {
              // Don't override phone here, we'll handle it separately
            } else if (name === 'interest' || name === 'interested' || name === 'service') {
              data.interest = value || data.interest;
            } else if (name === 'message' || name === 'msg' || name === 'comments') {
              data.message = value || data.message;
            } else {
              // Store with original name
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
        
        let phoneDisplay = '';
        let phoneNumber = '';
        
        if (phoneInput && countrySelect) {
          const phoneValue = phoneInput.value.trim();
          const countryCode = countrySelect.value;
          const selectedOption = countrySelect.options[countrySelect.selectedIndex];
          const flag = selectedOption ? selectedOption.getAttribute('data-flag') : '';
          
          if (phoneValue && !phoneValue.startsWith('+')) {
            phoneNumber = countryCode + phoneValue.replace(/^\+/, '');
            phoneDisplay = `${flag} ${phoneNumber}`;
          } else if (phoneValue) {
            phoneNumber = phoneValue;
            phoneDisplay = `${flag} ${phoneNumber}`;
          }
          
          data.phone = phoneNumber;
          data.phoneDisplay = phoneDisplay;
        } else if (phoneInput) {
          // If no country selector, use phone value as is
          data.phone = phoneInput.value.trim();
          data.phoneDisplay = data.phone;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }
        
        try {
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
          
          // Send email using EmailJS or Vercel API
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'contact@fabiobdaniel.com',
              replyTo: data.email || undefined,
              subject: subject,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Interest:</strong> ${interestLabel}</p>
                <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email || ''}">${data.email || 'N/A'}</a></p>
                <p><strong>Phone:</strong> ${data.phoneDisplay || data.phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message || 'N/A'}</p>
                <hr>
                <p><small>Reply to: ${data.email || 'N/A'}</small></p>
              `,
              text: `
                New Contact Form Submission
                
                Interest: ${interestLabel}
                Name: ${data.name || 'N/A'}
                Email: ${data.email || 'N/A'}
                Phone: ${data.phoneDisplay || data.phone || 'N/A'}
                
                Message:
                ${data.message || 'N/A'}
                
                ---
                Reply to: ${data.email || 'N/A'}
              `
            })
          });
          
          // Check if response is ok before trying to parse JSON
          let result;
          try {
            result = await response.json();
          } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            throw new Error(`Server error (${response.status}): ${response.statusText}`);
          }
          
          if (response.ok) {
            // Show success message
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
            
            // Reset phone country selector to default
            const countrySelect = document.querySelector('.country-code-select');
            if (countrySelect) {
              countrySelect.value = '+1';
            }
          } else {
            // Get error message from response
            const errorMessage = result?.message || result?.error || `HTTP ${response.status}: ${response.statusText}`;
            console.error('API Error:', errorMessage, result);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Error sending email:', error);
          
          // Show specific error message
          let errorMsg = 'There was an error sending your message.';
          
          if (error.message) {
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
              errorMsg += '\n\nNetwork error. Please check your connection and try again.';
            } else if (error.message.includes('Email service not configured')) {
              errorMsg += '\n\nEmail service is not configured. Please contact the administrator.';
            } else if (error.message.includes('Domain not verified') || error.message.includes('Invalid from address')) {
              errorMsg += '\n\nEmail domain not verified. Please contact the administrator.';
            } else {
              errorMsg += `\n\nError: ${error.message}`;
            }
          }
          
          errorMsg += '\n\nIf the problem persists, please contact us directly at contact@fabiobdaniel.com';
          
          alert(errorMsg);
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        }
      });
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
