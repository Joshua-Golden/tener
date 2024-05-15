import React from 'react'
import format from 'date-fns/format'

import { db } from '@/lib/db'
import { Contact, SubAccount, Ticket } from '@prisma/client'
import BlurPage from '@/components/global/blur-page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CreateContactButton from './components/create-contact-button'
import DataTable from '@/components/global/data-table'
import { ContactClient } from './components/client'
import { ContactColumn } from './components/columns'

interface ContactPageProps {
  params: { subaccountId: string }
}

const ContactPage = async ({ params }: ContactPageProps) => {
  type SubAccountWithContacts = SubAccount & {
    Contact: (Contact & { Ticket: Ticket[] })[]
  }

  const contacts = (await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },

    include: {
      Contact: {
        include: {
          Ticket: {
            select: {
              value: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })) as SubAccountWithContacts

  const allContacts = contacts.Contact

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

  const formattedData: ContactColumn[] = allContacts.map((item: Contact) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    active: formatTotal(item.Ticket) === '$0.00' ? false : true,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    total: formatTotal(item.Ticket),
  }))
  return (
    <>    
      <div className='w-full'>
        <ContactClient subaccountId={params.subaccountId} data={formattedData}  />
      </div>
    </>
  )
}

export default ContactPage