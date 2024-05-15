'use client'

import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import {Agency, Permissions, Role, SubAccount} from '@prisma/client'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { UsersWithAgencySubAccountPermissionsSidebarOptions } from '@/lib/types'
import { CellActions } from './cell-action'

export type TeamColumn = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  SubAccount: SubAccount;
  Agency: Agency;
  Permissions: Permissions;
  role: Role;
}

export const columns: ColumnDef<TeamColumn>[] =
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
        const avatarUrl = row.original.avatarUrl as string
        return (
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 relative flex-none">
              <Image
                src={avatarUrl}
                fill
                className="rounded-full object-cover"
                alt="avatar image"
              />
            </div>
            <span className='whitespace-nowrap'>{row.original.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'avatarUrl',
      header: '',
      cell: () => {
        return null
      },
    },
    { accessorKey: 'email', header: 'Email' },

    {
      accessorKey: 'SubAccount',
      header: 'Owned Accounts',
      cell: ({ row }) => {
        const isAgencyOwner = row.original.role === 'AGENCY_OWNER'
        const ownedAccounts = row.original?.Permissions.filter(
          (per: any) => per.access
        )

        if (isAgencyOwner)
          return (
            <div className="flex flex-col items-start">
              <div className="flex flex-col gap-2">
                <Badge className="bg-slate-600 whitespace-nowrap">
                  Agency - {row?.original?.Agency?.name}
                </Badge>
              </div>
            </div>
          )
        return (
          <div className="flex flex-col items-start">
            <div className="flex flex-col gap-2">
              {ownedAccounts?.length ? (
                ownedAccounts.map((account: any) => (
                  <Badge
                    key={account.id}
                    className="bg-slate-600 w-fit whitespace-nowrap"
                  >
                    Sub Account - {account.SubAccount.name}
                  </Badge>
                ))
              ) : (
                <div className="text-muted-foreground">No Access Yet</div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role: Role = row.original.role
        return (
          <Badge
            className={clsx({
              'bg-emerald-500': role === 'AGENCY_OWNER',
              'bg-orange-400': role === 'AGENCY_ADMIN',
              'bg-primary': role === 'SUBACCOUNT_USER',
              'bg-muted': role === 'SUBACCOUNT_GUEST',
            })}
          >
            {role}
          </Badge>
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

