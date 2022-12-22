import { getTestAsset } from '@/test/utils/playwright'
import test, { expect } from '@playwright/test'
import cuid from 'cuid'
import { importTypebotInDatabase } from 'utils/playwright/databaseActions'

test('Big groups should work as expected', async ({ page }) => {
  const typebotId = cuid()
  await importTypebotInDatabase(getTestAsset('typebots/hugeGroup.json'), {
    id: typebotId,
    publicId: `${typebotId}-public`,
  })
  await page.goto(`/next/${typebotId}-public`)
  await page.locator('input').fill('Baptiste')
  await page.locator('input').press('Enter')
  await page.locator('input').fill('26')
  await page.locator('input').press('Enter')
  await page.locator('button >> text=Yes').click()
  await page.goto(`${process.env.NEXTAUTH_URL}/typebots/${typebotId}/results`)
  await expect(page.locator('text="Baptiste"')).toBeVisible()
  await expect(page.locator('text="26"')).toBeVisible()
  await expect(page.locator('text="Yes"')).toBeVisible()
  await page.hover('tbody > tr')
  await page.click('button >> text="Open"')
  await expect(page.locator('text="Baptiste" >> nth=1')).toBeVisible()
  await expect(page.locator('text="26" >> nth=1')).toBeVisible()
  await expect(page.locator('text="Yes" >> nth=1')).toBeVisible()
})
