import { IButtonDetector } from './IButtonDetector.js';

/**
 * Concrete implementation of button detector
 * Follows Single Responsibility Principle (SRP) - only detects buttons
 * Follows Liskov Substitution Principle (LSP) - can replace IButtonDetector
 */
export class ButtonDetector extends IButtonDetector {
  /**
   * Finds a button matching the criteria
   * @param {Object} criteria - { text: string, selector: string, id: string }
   * @returns {HTMLElement|null}
   */
  findButton(criteria) {
    try {
      // Try by ID first
      if (criteria.id) {
        const byId = document.getElementById(criteria.id);
        if (byId) return byId;
      }

      // Try by selector
      if (criteria.selector) {
        const bySelector = document.querySelector(criteria.selector);
        if (bySelector) return bySelector;
      }

      // Try by text content
      if (criteria.text) {
        const buttons = Array.from(document.querySelectorAll('button, a[role="button"], a.button, a[class*="button"]'));
        const searchText = criteria.text.toLowerCase();
        
        console.log('[ButtonDetector] 🔍 Searching', buttons.length, 'buttons for text:', searchText);
        
        for (const btn of buttons) {
          const btnText = (btn.textContent || '').trim().toLowerCase();
          console.log('[ButtonDetector] 🔍 Checking button text:', btnText.substring(0, 50));
          
          if (btnText.includes(searchText)) {
            console.log('[ButtonDetector] ✅ Found matching button!');
            return btn;
          }
        }
        
        console.log('[ButtonDetector] ❌ No matching button found');
      }

      return null;
    } catch (error) {
      console.error('[ButtonDetector] Error finding button:', error);
      return null;
    }
  }

  /**
   * Checks if button exists in DOM
   * @param {HTMLElement} button - Button to check
   * @returns {boolean}
   */
  buttonExists(button) {
    if (!button) return false;
    return document.body.contains(button);
  }

  /**
   * Finds an image element in the DOM
   * @param {Object} criteria - { selector: string, alt: string, src: string, class: string }
   * @returns {HTMLElement|null}
   */
  findImage(criteria) {
    try {
      console.log('[ButtonDetector] 🖼️ Searching for image with criteria:', criteria);
      
      // Try by selector first
      if (criteria.selector) {
        const bySelector = document.querySelector(criteria.selector);
        if (bySelector && bySelector.tagName === 'IMG') {
          console.log('[ButtonDetector] ✅ Found image by selector');
          return bySelector;
        }
      }

      // Try by class
      if (criteria.class) {
        const byClass = document.querySelector(`img.${criteria.class}`);
        if (byClass) {
          console.log('[ButtonDetector] ✅ Found image by class');
          return byClass;
        }
      }

      // Try by alt text
      if (criteria.alt) {
        const images = Array.from(document.querySelectorAll('img'));
        const searchAlt = criteria.alt.toLowerCase();
        for (const img of images) {
          const imgAlt = (img.alt || '').toLowerCase();
          if (imgAlt.includes(searchAlt)) {
            console.log('[ButtonDetector] ✅ Found image by alt text');
            return img;
          }
        }
      }

      // Try to find main hero image (largest visible image)
      const images = Array.from(document.querySelectorAll('img'));
      console.log('[ButtonDetector] 🔍 Found', images.length, 'images on page');
      
      // Filter visible images
      const visibleImages = images.filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.width > 100 && rect.height > 100 && 
               window.getComputedStyle(img).display !== 'none';
      });

      console.log('[ButtonDetector] 🔍 Found', visibleImages.length, 'visible images');

      if (visibleImages.length > 0) {
        // Find the largest image (likely the hero image)
        const largestImage = visibleImages.reduce((largest, current) => {
          const largestArea = largest.getBoundingClientRect().width * largest.getBoundingClientRect().height;
          const currentArea = current.getBoundingClientRect().width * current.getBoundingClientRect().height;
          return currentArea > largestArea ? current : largest;
        });

        console.log('[ButtonDetector] ✅ Found largest image (likely hero image)');
        return largestImage;
      }

      console.log('[ButtonDetector] ❌ No suitable image found');
      return null;
    } catch (error) {
      console.error('[ButtonDetector] Error finding image:', error);
      return null;
    }
  }
}
