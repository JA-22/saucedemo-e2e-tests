import { Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get elements() {
    return {
      yourinformationForm: {
        firstnamebox: this.page.locator('#first-name'),
        lastnamebox: this.page.locator('#last-name'),
        zipcodebox: this.page.locator('#postal-code'),
      },
      continuebtn: this.page.locator('#continue'),
    };
  }

  async fillCheckoutForm(data: { fisrtaname: string; lastname: string; postalcode: string }): Promise<void> {
    await this.elements.yourinformationForm.firstnamebox.fill(data.fisrtaname);
    await this.elements.yourinformationForm.lastnamebox.fill(data.lastname);
    await this.elements.yourinformationForm.zipcodebox.fill(data.postalcode);
    await this.elements.continuebtn.click();
  }
}
