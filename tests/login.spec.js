import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const user1 = {
    username: 'BSmith',
    password: 'Parabolic78'
}

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.

  const { username, password } = user1;
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('input', { name: 'username' }).fill(username);
  await page.getByRole('input', { name: 'password' }).fill(password);
  await page.getByLabel('Login').click();

  await page.waitForURL('https://parabank.parasoft.com/parabank/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});




