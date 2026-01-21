// Contact Form Enhancement
// Add country code to phone and enable email functionality

(function() {
  'use strict';

  // Wait for DOM to be ready
  function init() {
    // Wait a bit for React to render
    setTimeout(() => {
      setupPhoneInput();
      setupEmailForm();
    }, 1000);
  }
  
  function setupPhoneInput() {
    // Find phone input field - try multiple selectors
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
    
    if (phoneInput) {
      // Create country code selector
      const phoneWrapper = document.createElement('div');
      phoneWrapper.className = 'phone-input-wrapper';
      phoneWrapper.style.display = 'flex';
      phoneWrapper.style.gap = '8px';
      
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
      
      // Make phone input longer
      phoneInput.style.flex = '1';
      
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
        option.textContent = country.flag; // Show only flag
        countrySelect.appendChild(option);
      });
      
      // Set default to US (+1)
      countrySelect.value = '+1';
      
      // Wrap phone input
      phoneInput.parentNode.insertBefore(phoneWrapper, phoneInput);
      phoneWrapper.appendChild(countrySelect);
      phoneWrapper.appendChild(phoneInput);
      
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
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Get phone with country code and flag
        const countrySelect = document.querySelector('.country-code-select');
        const phoneInput = document.querySelector('.phone-input-wrapper input') || 
                          document.querySelector('input[type="tel"]');
        
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
        }
        
        // Get all form fields
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
          if (input.name && !data[input.name]) {
            data[input.name] = input.value;
          }
        });
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }
        
        try {
          // Send email using EmailJS or Vercel API
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'contact@fabiobdaniel.com',
              subject: `New Contact Form Submission from ${data.name || 'Website'}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                <p><strong>Phone:</strong> ${data.phoneDisplay || data.phone || 'N/A'}</p>
                <p><strong>Interest:</strong> ${data.interest || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message || 'N/A'}</p>
              `,
              text: `
                New Contact Form Submission
                
                Name: ${data.name || 'N/A'}
                Email: ${data.email || 'N/A'}
                Phone: ${data.phoneDisplay || data.phone || 'N/A'}
                Interest: ${data.interest || 'N/A'}
                
                Message:
                ${data.message || 'N/A'}
              `
            })
          });
          
          if (response.ok) {
            // Show success message
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
          } else {
            throw new Error('Failed to send message');
          }
        } catch (error) {
          console.error('Error sending email:', error);
          alert('There was an error sending your message. Please try again or contact us directly at contact@fabiobdaniel.com');
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
