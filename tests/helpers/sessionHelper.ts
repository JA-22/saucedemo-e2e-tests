import testData from '../../data/testData.json';

export async function login(page: any): Promise<void> {
  // Navegar a la página principal
  await page.goto('https://www.saucedemo.com/');
}   


// Función auxiliar para obtener datos de acceso
export function  getAccessData(scenario: string) {
  const accessData = testData.loginData.find(data => data.scenario === scenario);
  if (!accessData) {
    throw new Error(`No se encontraron datos para el escenario: ${scenario}`);
  }
  return accessData;
}
