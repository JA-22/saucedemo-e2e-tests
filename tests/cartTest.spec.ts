import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/Products.Page';
import { getAccessData, login } from './helpers/sessionHelper';
import { LoginPage } from '../pages/Login.Page';

test('Add an item to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Iniciar sesión y navegar a la página principal
  await login(page);

  // Obtener datos de inicio de sesión válidos
  const accessData = getAccessData('validLogin');

  // Completar el formulario de inicio de sesión y enviar
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Seleccionar el item 4 y agregarlo al carrito
  await productsPage.selectItem4();

  // Verificar que el ítem fue agregado al carrito
  const cartItem = page.locator('#shopping_cart_container > a > span'); // Cambia el selector por el adecuado
  await expect(cartItem).toBeVisible();

});

test('Remove an item to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Iniciar sesión y navegar a la página principal
  await login(page);

  // Obtener datos de inicio de sesión válidos
  const accessData = getAccessData('validLogin');

  // Completar el formulario de inicio de sesión y enviar
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Verificar que el ítem fue agregado al carrito
  let cartItem = page.locator('#shopping_cart_container > a > span'); 
  await expect(cartItem).toBeVisible();

  // Seleccionar el item 4 y eliminarlo del carrito
  await productsPage.removeItem4();

  // Verificar que el ítem fue removido del carrito
  cartItem = page.locator('#shopping_cart_container > a > span'); // Cambia el selector por el adecuado
  await expect(cartItem).not.toBeVisible();

  // Verificar que el carrito esté vacío
  const cartItems = page.locator('#shopping_cart_container > a > span'); // Cambia el selector por el adecuado
  await expect(cartItems).toHaveCount(0);

});
