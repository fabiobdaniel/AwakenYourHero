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
        const buttons = Array.from(document.querySelectorAll('button, a[role="button"], a.button'));
        const searchText = criteria.text.toLowerCase();
        
        for (const btn of buttons) {
          const btnText = (btn.textContent || '').trim().toLowerCase();
          if (btnText.includes(searchText)) {
            return btn;
          }
        }
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
}
