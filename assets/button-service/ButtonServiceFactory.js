import { ButtonDetector } from './ButtonDetector.js';
import { BuyBookButtonCreator } from './BuyBookButtonCreator.js';
import { ButtonManager } from './ButtonManager.js';

/**
 * Factory for creating button service components
 * Follows Open/Closed Principle (OCP) - open for extension, closed for modification
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions
 */
export class ButtonServiceFactory {
  /**
   * Creates a button detector instance
   * @returns {ButtonDetector}
   */
  static createDetector() {
    return new ButtonDetector();
  }

  /**
   * Creates a button creator instance
   * @param {string} type - Button type ('buy-book')
   * @returns {IButtonCreator}
   */
  static createButtonCreator(type = 'buy-book') {
    switch (type) {
      case 'buy-book':
        return new BuyBookButtonCreator();
      default:
        throw new Error(`Unknown button creator type: ${type}`);
    }
  }

  /**
   * Creates a button manager instance
   * @returns {ButtonManager}
   */
  static createManager() {
    return new ButtonManager();
  }
}
