'use client'

import React from 'react'
import { TeamColumn, columns } from './columns'
import { Heading } from '@/components/global/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/global/data-table';
import { useModal } from '@/providers/modal-provider';
import CustomModal from '@/components/global/custom-modal';
import SendInvitation from '@/components/forms/send-invitation';

interface TeamClientProps {
  data: TeamColumn[];
  agencyId: string
}


export const TeamClient = ({ data, agencyId }: TeamClientProps) => {
  const { setOpen } = useModal()

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`Team Members (${data.length})`}
        description="Manage your team members"
      />
        <Button
          className="flex gap-2"
          onClick={() => 
            setOpen(
              <CustomModal
                title="Add a team member"
                subheading="Send an invitation"
              >
                <SendInvitation agencyId={agencyId} />
              </CustomModal>
            )
          }
        >
          <Plus size={15} />
          Add
        </Button>
    </div>

    <DataTable searchKey="name" columns={columns} data={data} />

    </>
  )
}


