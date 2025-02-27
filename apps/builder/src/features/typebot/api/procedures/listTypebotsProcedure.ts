import prisma from '@/lib/prisma'
import { authenticatedProcedure } from '@/utils/server/trpc'
import { TRPCError } from '@trpc/server'
import { WorkspaceRole } from 'db'
import { Typebot, typebotSchema } from 'models'
import { z } from 'zod'

export const listTypebotsProcedure = authenticatedProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/typebots',
      protect: true,
      summary: 'List typebots',
      tags: ['Typebot'],
    },
  })
  .input(z.object({ workspaceId: z.string(), folderId: z.string().optional() }))
  .output(
    z.object({
      typebots: z.array(
        typebotSchema.pick({
          name: true,
          icon: true,
          id: true,
          publishedTypebotId: true,
        })
      ),
    })
  )
  .query(async ({ input: { workspaceId, folderId }, ctx: { user } }) => {
    const typebots = (await prisma.typebot.findMany({
      where: {
        OR: [
          {
            isArchived: { not: true },
            folderId: folderId === 'root' ? null : folderId,
            workspace: {
              id: workspaceId,
              members: {
                some: {
                  userId: user.id,
                  role: { not: WorkspaceRole.GUEST },
                },
              },
            },
          },
          {
            isArchived: { not: true },
            workspace: {
              id: workspaceId,
              members: {
                some: { userId: user.id, role: WorkspaceRole.GUEST },
              },
            },
            collaborators: { some: { userId: user.id } },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      select: { name: true, publishedTypebotId: true, id: true, icon: true },
    })) as Pick<Typebot, 'name' | 'id' | 'icon' | 'publishedTypebotId'>[]

    if (!typebots)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'No typebots found' })

    return { typebots }
  })
