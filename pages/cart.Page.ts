import { Page, Locator } from 'playwright';

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get elements() {
    return {
      shoppincartlink: this.page.locator('#shopping_cart_container > a'),
      checkoutbtn: this.page.locator('#checkout'),
      quantityofitems: this.page.locator('#item_4_title_link > div'),
    };
  }

  async submitCheckoutButton(): Promise<void> {
    try {
      // Verificar que el botón de checkout sea visible y que el texto "Sauce Labs Backpack" esté presente
      while (await this.elements.checkoutbtn.isVisible()) {
        await this.elements.checkoutbtn.click();
        break;
      }
    } catch (error) {
      console.error('Error during the checkout process:', error);
    }
  }

  async isTextPresent(text: string): Promise<boolean> {
    const textContent = await this.page.textContent('Sauce Labs Backpack');
    return textContent ? textContent.includes(text) : false;
  }

  async selectCartIcon(): Promise<void> {
    await this.elements.shoppincartlink.click();
  }
}