'use client'

import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import {Agency, Permissions, Role, SubAccount} from '@prisma/client'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { UsersWithAgencySubAccountPermissionsSidebarOptions } from '@/lib/types'
import { CellActions } from './cell-action'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export type FunnelPageColumn = {
  id: string;
  name: string;
  updatedAt: string;
  published: Boolean;
  subDomainName: string;
  subaccountId: string;
}

export const columns: ColumnDef<FunnelPageColumn>[] =
  [
    {
      accessorKey: 'id',
      header: '',
      cell: () => {
        return null
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Link
            className="flex gap-2 items-center"
            href={`/subaccount/${row.original.subaccountId}/funnels/${row.original.id}`}
          >
            {row.getValue('name')}
            <ExternalLink size={15} />
          </Link>
        )
      },
    },
    { accessorKey: 'updatedAt', header: 'Last Updated' },
    { accessorKey: 'published', header: 'Status' },

    {
      accessorKey: 'published',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.published
        return status ? (
          <Badge variant={'default'}>Live - {row.original.subDomainName}</Badge>
        ) : (
          <Badge variant={'secondary'}>Draft</Badge>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original

        return <CellActions data={rowData} />
      },
    },
]

