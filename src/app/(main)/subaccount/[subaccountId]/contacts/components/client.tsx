'use client'

import React from 'react'
import { ContactColumn, columns } from './columns'
import { Heading } from '@/components/global/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/global/data-table';
import { useModal } from '@/providers/modal-provider';
import CustomModal from '@/components/global/custom-modal';
import SendInvitation from '@/components/forms/send-invitation';
import CreateContactButton from './create-contact-button';

interface ContactClientProps {
  data: ContactColumn[];
  subaccountId: string
}


export const ContactClient = ({ data, subaccountId }: ContactClientProps) => {
  const { setOpen } = useModal()

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`Contacts (${data.length})`}
        description="Manage your SubAccounts Contacts"
      />
      <CreateContactButton subaccountId={subaccountId} />
    </div>

    <DataTable searchKey="name" columns={columns} data={data} />

    </>
  )
}


