  import { Page } from "@playwright/test";

  export class LoginPage {
    page: Page;

    constructor(page: Page) {
      this.page = page;
    }

    get elements() {
      return {
        username: this.page.locator('#user-name'),
        password: this.page.locator('#password'),
        loginBtn: this.page.locator('#login-button'),
      };
    }

    async fillLoginForm({ username, password }: { username: string; password: string }): Promise<void> {
      await this.elements.username.fill(username);
      await this.elements.password.fill(password);
    }

    async submitLoginButton(): Promise<void> {
      await this.elements.loginBtn.click();
    }

  }