/**
 * Interface for creating buttons
 * Follows Interface Segregation Principle (ISP)
 */
export class IButtonCreator {
  /**
   * Creates a button element
   * @param {Object} config - Button configuration
   * @returns {HTMLElement} - Created button element
   */
  createButton(config) {
    throw new Error('Method createButton must be implemented');
  }

  /**
   * Gets button configuration
   * @returns {Object} - Button configuration
   */
  getConfig() {
    throw new Error('Method getConfig must be implemented');
  }
}
