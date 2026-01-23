/**
 * Interface for detecting buttons in the DOM
 * Follows Interface Segregation Principle (ISP)
 */
export class IButtonDetector {
  /**
   * Finds a button matching the criteria
   * @param {Object} criteria - Search criteria
   * @returns {HTMLElement|null} - Found button or null
   */
  findButton(criteria) {
    throw new Error('Method findButton must be implemented');
  }

  /**
   * Checks if a button exists
   * @param {HTMLElement} button - Button to check
   * @returns {boolean}
   */
  buttonExists(button) {
    throw new Error('Method buttonExists must be implemented');
  }
}
