import { HStack, Stack} from '@chakra-ui/react'
import { useWorkspace } from '@/features/workspace'
import { Plan } from 'db'
import React from 'react'
import { CurrentSubscriptionContent } from './CurrentSubscriptionContent'
import { InvoicesList } from './InvoicesList'
import { UsageContent } from './UsageContent/UsageContent'

import { ChangePlanForm } from '../ChangePlanForm'

export const BillingContent = () => {
  const { workspace, refreshWorkspace } = useWorkspace()

  if (!workspace) return null
  return (
    <Stack spacing="10" w="full">
      <UsageContent workspace={workspace} />
      <Stack spacing="2">
        <CurrentSubscriptionContent
          plan={workspace.plan}
          stripeId={workspace.stripeId}
          onCancelSuccess={refreshWorkspace}
        />
        <HStack maxW="500px">
        
        </HStack>
        {workspace.plan !== Plan.CUSTOM &&
          workspace.plan !== Plan.LIFETIME &&
          workspace.plan !== Plan.OFFERED && <ChangePlanForm />}
      </Stack>

      {workspace.stripeId && <InvoicesList workspace={workspace} />}
    </Stack>
  )
}
