'use client'

import React from 'react'

import { BillingColumn, columns } from './columns'
import { Heading } from '@/components/global/heading';
import DataTable from '@/components/global/data-table';

interface BillingClientProps {
  data: BillingColumn[];
}


export const BillingClient = ({ data }: BillingClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Heading
          title={`Payment History`}
          description="Billing and transaction records"
        />
      </div>

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}


