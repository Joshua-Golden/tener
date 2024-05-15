'use client'

import React from 'react'
import { FunnelPageColumn, columns } from './columns'
import { Heading } from '@/components/global/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/global/data-table';
import { useModal } from '@/providers/modal-provider';
import CustomModal from '@/components/global/custom-modal';
import SendInvitation from '@/components/forms/send-invitation';
import FunnelForm from '@/components/forms/funnel-form';

interface FunnelPageClientProps {
  data: FunnelPageColumn[];
  subaccountId: string
}

export const FunnelPageClient = ({ data, subaccountId }: FunnelPageClientProps) => {
  const { setOpen } = useModal()

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`Funnels (${data.length})`}
        description="Manage your team funnels"
      />
        <Button
          className="flex gap-2"
          onClick={() => 
            setOpen(
              <CustomModal
                title="Add a team member"
                subheading="Send an invitation"
              >
                <FunnelForm  subaccountId={subaccountId} />
              </CustomModal>
            )
          }
        >
          <Plus size={15} />
          Create Funnel
        </Button>
    </div>

    <DataTable searchKey="name" columns={columns} data={data} />

    </>
  )
}


