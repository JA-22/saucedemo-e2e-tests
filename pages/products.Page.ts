import { Page } from "@playwright/test";

export class ProductsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get elements() {
    return {
      addToBtn: this.page.locator('#add-to-cart-sauce-labs-backpack'),
      removeBtn: this.page.locator('#remove-sauce-labs-backpack'),
      backpackTitle: this.page.locator('#item_4_title_link > div'),
      containerCart: this.page.locator('#shopping_cart_container > a > span')
    };
  }

  async selectItem4(): Promise<void> {
    try {
      await this.elements.backpackTitle.waitFor({ state: 'visible' });
        await this.elements.addToBtn.click();
    } catch (error) {
      console.error('Error al seleccionar el item 4:', error);
    }
  }

  async removeItem4(): Promise<void> {
    try {
      await this.elements.backpackTitle.waitFor({ state: 'visible' });
        await this.elements.removeBtn.click();
    } catch (error) {
      console.error('Error al seleccionar el item 4:', error);
    }
  }

}