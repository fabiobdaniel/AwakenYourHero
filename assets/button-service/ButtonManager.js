import { IButtonManager } from './IButtonManager.js';

/**
 * Manages button placement in DOM
 * Follows Single Responsibility Principle (SRP) - only manages button placement
 * Follows Liskov Substitution Principle (LSP) - can replace IButtonManager
 */
export class ButtonManager extends IButtonManager {
  /**
   * Adds a button next to a target button
   * @param {HTMLElement} targetButton - Button to place next to
   * @param {HTMLElement} newButton - Button to add
   * @returns {boolean} - Success status
   */
  addButtonNextTo(targetButton, newButton) {
    try {
      if (!targetButton || !newButton) {
        console.error('[ButtonManager] Target button or new button is null');
        return false;
      }

      const parent = targetButton.parentElement;
      if (!parent) {
        console.error('[ButtonManager] Target button has no parent');
        return false;
      }

      // Check parent display type
      const parentDisplay = window.getComputedStyle(parent).display;
      
      if (parentDisplay === 'flex' || parentDisplay === 'grid') {
        // Parent is already a flex/grid container, just append
        parent.appendChild(newButton);
        console.log('[ButtonManager] ✅ Button added to flex/grid container');
        return true;
      } else {
        // Wrap both buttons in a flex container
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;';
        
        // Insert wrapper before target button
        parent.insertBefore(wrapper, targetButton);
        
        // Move target button into wrapper
        wrapper.appendChild(targetButton);
        
        // Add new button to wrapper
        wrapper.appendChild(newButton);
        
        console.log('[ButtonManager] ✅ Button added with wrapper');
        return true;
      }
    } catch (error) {
      console.error('[ButtonManager] ❌ Error adding button:', error);
      return false;
    }
  }

  /**
   * Checks if button already exists in DOM
   * @param {string} buttonId - Button ID
   * @returns {boolean}
   */
  buttonAlreadyExists(buttonId) {
    const existing = document.getElementById(buttonId);
    return existing !== null && document.body.contains(existing);
  }

  /**
   * Removes a button if it exists
   * @param {string} buttonId - Button ID
   * @returns {boolean} - Success status
   */
  removeButton(buttonId) {
    try {
      const button = document.getElementById(buttonId);
      if (button) {
        button.remove();
        return true;
      }
      return false;
    } catch (error) {
      console.error('[ButtonManager] Error removing button:', error);
      return false;
    }
  }

  /**
   * Adds a button above a target element
   * @param {HTMLElement} targetElement - Element to place button above
   * @param {HTMLElement} newButton - Button to add
   * @returns {boolean} - Success status
   */
  addButtonAbove(targetElement, newButton) {
    try {
      if (!targetElement || !newButton) {
        console.error('[ButtonManager] Target element or new button is null');
        return false;
      }

      const parent = targetElement.parentElement;
      if (!parent) {
        console.error('[ButtonManager] Target element has no parent');
        return false;
      }

      // Insert button before target element
      parent.insertBefore(newButton, targetElement);
      console.log('[ButtonManager] ✅ Button added above target element');
      return true;
    } catch (error) {
      console.error('[ButtonManager] ❌ Error adding button above:', error);
      return false;
    }
  }
}
