import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.Page';
import { ProductsPage } from '../pages/products.Page';
import { CheckoutPage } from '../pages/checkout.Page';
import { getAccessData, login } from './helpers/sessionHelper';
import testData from '../data/testData.json';
import { LoginPage } from '../pages/login.Page';

test('Verify Checkout Process', async ({ page }) => {
  const cartPage = new CartPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);

  // Iniciar sesión y navegar a la página principal
  await login(page);

  // Obtener datos de inicio de sesión válidos
  const accessData = getAccessData('validLogin');

  // Completar el formulario de inicio de sesión y enviar
  await loginPage.fillLoginForm(accessData);
  await loginPage.submitLoginButton();

  // Seleccionar el ítem 4 y agregarlo al carrito
  await productsPage.selectItem4();

  // Navegar al carrito y proceder al checkout
  await cartPage.selectCartIcon();
  await cartPage.submitCheckoutButton();

  // Obtener los datos de checkout desde el archivo de datos
  const checkoutData = testData.checkoutInformation.find(data => data.scenario === 'successfulcheckout');

  if (!checkoutData) {
    throw new Error('No se encontraron datos válidos para el checkout');
  }

  // Llenar el formulario de checkout con los datos
  await checkoutPage.fillCheckoutForm(checkoutData);

  // Validar que el resumen del checkout contiene "Sauce Labs Backpack"
  const sauceLabsbackpackItem = page.locator('#item_4_title_link > div');
  await expect(sauceLabsbackpackItem).toHaveText('Sauce Labs Backpack');
});
