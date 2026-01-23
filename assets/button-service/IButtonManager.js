/**
 * Interface for managing button placement
 * Follows Interface Segregation Principle (ISP)
 */
export class IButtonManager {
  /**
   * Adds a button next to a target button
   * @param {HTMLElement} targetButton - Button to place next to
   * @param {HTMLElement} newButton - Button to add
   * @returns {boolean} - Success status
   */
  addButtonNextTo(targetButton, newButton) {
    throw new Error('Method addButtonNextTo must be implemented');
  }

  /**
   * Checks if button already exists
   * @param {string} buttonId - Button ID
   * @returns {boolean}
   */
  buttonAlreadyExists(buttonId) {
    throw new Error('Method buttonAlreadyExists must be implemented');
  }
}
