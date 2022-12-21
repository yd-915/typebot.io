import { getTestAsset } from '@/test/utils/playwright'
import test, { expect } from '@playwright/test'
import cuid from 'cuid'
import { defaultTextInputOptions } from 'models'
import { importTypebotInDatabase } from 'utils/playwright/databaseActions'
import { freeWorkspaceId } from 'utils/playwright/databaseSetup'
import { typebotViewer } from 'utils/playwright/testHelpers'

test.describe.parallel('Settings page', () => {
  test.describe('General', () => {
    test('should reflect change in real-time', async ({ page }) => {
      const typebotId = cuid()
      await importTypebotInDatabase(getTestAsset('typebots/settings.json'), {
        id: typebotId,
      })
      await page.goto(`/typebots/${typebotId}/settings`)
      await expect(
        typebotViewer(page).locator('a:has-text("Made with Liiska")')
      ).toHaveAttribute('href', 'https://www.typebot.io/?utm_source=litebadge')
      await page.click('text="Liiska branding"')
      await expect(
        typebotViewer(page).locator('a:has-text("Made with Liiska")')
      ).toBeHidden()

      await page.click('text="Remember session"')
      await expect(
        page.locator('input[type="checkbox"] >> nth=-3')
      ).toHaveAttribute('checked', '')

      await page.click('text="Disable responses saving"')
      await expect(
        page.locator('input[type="checkbox"] >> nth=-1')
      ).toHaveAttribute('checked', '')

      await expect(
        typebotViewer(page).locator('input[value="Baptiste"]')
      ).toBeVisible()
      await page.click('text=Prefill input')
      await page.click('text=Theme')
      await expect(
        typebotViewer(page).locator(
          `input[placeholder="${defaultTextInputOptions.labels.placeholder}"]`
        )
      ).toHaveValue('')
    })
  })
