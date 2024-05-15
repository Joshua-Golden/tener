import { getFunnels } from '@/lib/queries'
import React from 'react'
import { Plus } from 'lucide-react'
import FunnelForm from '@/components/forms/funnel-form'
import { FunnelPageClient } from './[funnelId]/components/client'
import { FunnelPageColumn } from './[funnelId]/components/columns'
import { Funnel } from '@prisma/client'

interface FunnelsProps {
    params: { subaccountId: string }
}

const Funnels = async ({ params }: FunnelsProps) => {
  const funnels = await getFunnels(params.subaccountId)
  if (!funnels) return null

  const formattedData: FunnelPageColumn[] = funnels.map((item: Funnel) => ({
    id: item.id,
    name: item.name,
    updatedAt: item.updatedAt,
    published: item.pubslished,
    subDomainName: item.subDomainName,
    subaccountId: params?.subaccountId

  }))

  return (
    <>
      <div className='w-full'>
        <FunnelPageClient subaccountId={params.subaccountId} data={formattedData}  />
      </div>
    </>
  )
}

export default Funnels