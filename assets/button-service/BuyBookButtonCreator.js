import { IButtonCreator } from './IButtonCreator.js';

/**
 * Creates "Buy Book" button
 * Follows Single Responsibility Principle (SRP) - only creates Buy Book button
 * Follows Liskov Substitution Principle (LSP) - can replace IButtonCreator
 */
export class BuyBookButtonCreator extends IButtonCreator {
  constructor() {
    super();
    this.buttonId = 'buy-book-btn';
    this.amazonLink = 'https://a.co/d/5m8frEq';
  }

  /**
   * Gets button configuration
   * @returns {Object}
   */
  getConfig() {
    return {
      id: this.buttonId,
      text: 'Buy Book',
      href: this.amazonLink,
      target: '_blank',
      rel: 'noopener noreferrer',
      styles: {
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        marginLeft: '0.75rem',
        backgroundColor: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: 'none',
        borderRadius: 'var(--radius)',
        fontWeight: '600',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: 'var(--shadow-button)'
      },
      mobileStyles: {
        marginLeft: '0.5rem',
        marginTop: '0.5rem',
        padding: '0.625rem 1.25rem',
        fontSize: '0.9rem'
      }
    };
  }

  /**
   * Creates the button element
   * @param {Object} config - Button configuration (optional, uses getConfig if not provided)
   * @returns {HTMLElement}
   */
  createButton(config = null) {
    const buttonConfig = config || this.getConfig();
    const button = document.createElement('a');
    
    // Set attributes
    button.id = buttonConfig.id;
    button.href = buttonConfig.href;
    button.target = buttonConfig.target;
    button.rel = buttonConfig.rel;
    button.textContent = buttonConfig.text;
    
    // Apply styles
    Object.assign(button.style, buttonConfig.styles);
    
    // Add mobile responsive styles
    if (window.innerWidth <= 768) {
      Object.assign(button.style, buttonConfig.mobileStyles);
    }
    
    // Add hover effects
    this._addHoverEffects(button);
    
    return button;
  }

  /**
   * Adds hover effects to button
   * @private
   * @param {HTMLElement} button
   */
  _addHoverEffects(button) {
    button.addEventListener('mouseenter', () => {
      button.style.opacity = '0.9';
      button.style.transform = 'scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.opacity = '1';
      button.style.transform = 'scale(1)';
    });
  }
}
