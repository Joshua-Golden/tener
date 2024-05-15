'use client'

import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import {Agency, Contact, Permissions, Role, SubAccount, Ticket} from '@prisma/client'
import Image from 'next/image'
import format from 'date-fns/format'

import { Badge } from '@/components/ui/badge'
import { UsersWithAgencySubAccountPermissionsSidebarOptions } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export type ContactColumn = {
  id: string;
  name: string;
  email: string;
  createdAt: string
  active: Boolean;
  total: string;
}

const formatTotal = (tickets: Ticket[]) => {
  if (!tickets || !tickets.length) return '$0.00'
  const amt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  })

  const laneAmt = tickets.reduce(
    (sum, ticket) => sum + (Number(ticket?.value) || 0),
    0
  )

  return amt.format(laneAmt)
}

export const columns: ColumnDef<ContactColumn>[] =
  [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Avatar>
            <AvatarImage alt="avatar image" />
            <AvatarFallback className="bg-primary text-white">
              {row.original.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )
      },
    },
    { accessorKey: 'email', header: 'Email' },
    { 
      accessorKey: 'active', 
      header: 'Active',
      cell: ({ row }) => {
        return (
          <>
          {row.original.active ? (
              <Badge className="bg-emerald-700">Active</Badge>
            ) : (
              <Badge variant={'destructive'}>Inactive</Badge>
            )
          }
        </>
        )
      }
    },
    { accessorKey: "createdAt", header: 'Created Date' },
    { accessorKey: 'total', header: 'Total Value', },
]

