'use client'

import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import { CellActions } from './cell-action'

export type BillingColumn = {
  description: string;
  invoiceId: string;
  date: string;
  status: string;
  amount: String;
}

export const columns: ColumnDef<BillingColumn>[] =
  [
    { accessorKey: 'invoiceId', header: 'Invoice ID' },
    { accessorKey: "date", header: 'Date' },

    {
      accessorKey: 'avatarUrl',
      header: '',
      cell: () => {
        return null
      },
    },
    { 
      accessorKey: 'paid', 
      header: 'Paid',
      cell: ({ row }) => {
        return (
          <p
            className={clsx('', {
              'text-emerald-500': row.original.status.toLowerCase() === 'paid',
              'text-orange-600':
              row.original.status.toLowerCase() === 'pending',
              'text-red-600': row.original.status.toLowerCase() === 'failed',
            })}
          >
            {row.original.status.toUpperCase()}
          </p>
        )
      }
    },
    { accessorKey: 'amount', header: 'Amount' },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original

        return <CellActions data={rowData} />
      },
    },
]

