import { test, expect } from '@playwright/test';
import { login, getAccessData } from './helpers/sessionHelper';
import { LoginPage } from '../pages/login.Page';

test('Successful registration with valid data', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Iniciar sesión
  await login(page);

  // Obtener datos de inicio de sesión válidos
  const accessData = getAccessData('validLogin');

  // Iniciar sesión
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Validar que el menú hamburguesa esté visible
  const burgerMenuButton = page.locator('#react-burger-menu-btn');
  await expect(burgerMenuButton).toBeVisible();
});

test('Failed registration with empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Iniciar sesión
  await login(page);

  // Obtener datos de inicio de sesión inválidos
  const accessData = getAccessData('emptyPassword');

  // Iniciar sesión
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Añadir espera antes de verificar el mensaje de error
  await page.waitForSelector('text=Epic sadface: Password is required', { timeout: 2000 });
  const errorMessage = page.locator('text=Epic sadface: Password is required');
  await expect(errorMessage).toBeVisible();
});

test('Failed registration with empty username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Iniciar sesión
  await login(page);

  // Obtener datos de inicio de sesión inválidos
  const accessData = getAccessData('emptyUsername');

  // Iniciar sesión
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Añadir espera antes de verificar el mensaje de error
  await page.waitForSelector('text=/Epic sadface: Username is required|Username and password do not match any user in this service/', { timeout: 2000 });
  const errorMessage = page.locator('text=/Epic sadface: Username is required|Username and password do not match any user in this service/');
  await expect(errorMessage).toBeVisible();
});

test('Failed registration with empty form', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Iniciar sesión
  await login(page);

  // Obtener datos de inicio de sesión inválidos
  const accessData = getAccessData('emptyForm');

  // Iniciar sesión
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Añadir espera antes de verificar el mensaje de error
  await page.waitForSelector('text=Epic sadface: Username is required', { timeout: 2000 });
  const errorMessage = page.locator('text=/Epic sadface: Username is required|Password is required/');
  await expect(errorMessage).toBeVisible();
});
