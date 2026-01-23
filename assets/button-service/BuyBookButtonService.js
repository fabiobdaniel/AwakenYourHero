import { ButtonServiceFactory } from './ButtonServiceFactory.js';

/**
 * Service for adding "Buy Book" button next to "Take Your Next Step"
 * Follows Single Responsibility Principle (SRP) - only handles Buy Book button logic
 * Follows Dependency Inversion Principle (DIP) - depends on factory abstractions
 */
export class BuyBookButtonService {
  constructor() {
    this.detector = ButtonServiceFactory.createDetector();
    this.buttonCreator = ButtonServiceFactory.createButtonCreator('buy-book');
    this.manager = ButtonServiceFactory.createManager();
    this.targetImageCriteria = {
      // Try to find hero/main image
      selector: 'img'
    };
    this.checkInterval = null;
    this.observer = null;
    this.isRunning = false;
  }

  /**
   * Initializes the service
   */
  init() {
    if (this.isRunning) {
      console.warn('[BuyBookButtonService] Service already running');
      return;
    }

    this.isRunning = true;
    console.log('[BuyBookButtonService] 🚀 Initializing...');

    // Try immediately
    this.tryAddButton();

    // Try multiple times with delays
    setTimeout(() => this.tryAddButton(), 500);
    setTimeout(() => this.tryAddButton(), 1000);
    setTimeout(() => this.tryAddButton(), 2000);
    setTimeout(() => this.tryAddButton(), 3000);
    setTimeout(() => this.tryAddButton(), 5000);

    // Start continuous monitoring
    this.startMonitoring();
  }

  /**
   * Attempts to add the button
   */
  tryAddButton() {
    try {
      console.log('[BuyBookButtonService] 🔍 Attempting to add button above image...');
      
      // Check if button already exists
      const buttonId = this.buttonCreator.getConfig().id;
      console.log('[BuyBookButtonService] 🔍 Checking if button already exists (ID:', buttonId, ')');
      
      if (this.manager.buttonAlreadyExists(buttonId)) {
        console.log('[BuyBookButtonService] ℹ️ Button already exists, skipping');
        return; // Already exists
      }

      // Find target image
      console.log('[BuyBookButtonService] 🔍 Searching for target image with criteria:', this.targetImageCriteria);
      const targetImage = this.detector.findImage(this.targetImageCriteria);
      
      if (!targetImage) {
        console.log('[BuyBookButtonService] ⏳ Target image not found yet');
        return; // Target image not found yet
      }

      console.log('[BuyBookButtonService] ✅ Target image found!', targetImage);
      console.log('[BuyBookButtonService] 📝 Image src:', targetImage.src);
      console.log('[BuyBookButtonService] 📝 Image alt:', targetImage.alt);

      // Create new button
      console.log('[BuyBookButtonService] 🔧 Creating Buy Book button...');
      const buyBookButton = this.buttonCreator.createButton();
      
      // Center the button
      buyBookButton.style.margin = '0 auto';
      buyBookButton.style.display = 'block';
      buyBookButton.style.textAlign = 'center';
      buyBookButton.style.marginBottom = '1rem';
      
      console.log('[BuyBookButtonService] ✅ Buy Book button created');

      // Add button above target image
      console.log('[BuyBookButtonService] 📍 Adding button above target image...');
      const success = this.manager.addButtonAbove(targetImage, buyBookButton);
      
      if (success) {
        console.log('[BuyBookButtonService] ✅ Buy Book button added successfully above image');
      } else {
        console.error('[BuyBookButtonService] ❌ Failed to add button');
      }
    } catch (error) {
      console.error('[BuyBookButtonService] ❌ Error in tryAddButton:', error);
      console.error('[BuyBookButtonService] ❌ Error stack:', error.stack);
    }
  }

  /**
   * Starts continuous monitoring
   */
  startMonitoring() {
    // Periodic check
    this.checkInterval = setInterval(() => {
      this.monitorButton();
    }, 2000);

    // MutationObserver for DOM changes
    this.observer = new MutationObserver(() => {
      this.monitorButton();
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      this.destroy();
    });
  }

  /**
   * Monitors if button still exists
   */
  monitorButton() {
    const buttonId = this.buttonCreator.getConfig().id;
    const exists = this.manager.buttonAlreadyExists(buttonId);
    if (!exists) {
      console.log('[BuyBookButtonService] 🔄 Button missing, attempting to re-add...');
      this.tryAddButton();
    }
  }

  /**
   * Destroys the service and cleans up
   */
  destroy() {
    this.isRunning = false;
    
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    console.log('[BuyBookButtonService] 🛑 Service destroyed');
  }
}
