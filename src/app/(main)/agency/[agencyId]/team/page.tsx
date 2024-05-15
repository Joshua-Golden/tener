import React from 'react'
import { Plus } from 'lucide-react';
import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db'
import SendInvitation from '@/components/forms/send-invitation';
import DataTable from '@/components/global/data-table';
import { TeamColumn, columns } from './components/columns'
import { TeamClient } from './components/client';
import { User } from '@prisma/client';

interface AgencyTeamProps {
  params: { agencyId: string }
}

const AgencyTeam = async ({params}: AgencyTeamProps) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId
      },
    },
    include: {
      Agency: {
        include: {
          SubAccount: true,
        },
      },
      Permissions: {
        include: {
          SubAccount: true,
        },
      }
    },
  });
  if (!teamMembers) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return;
  const formattedData: TeamColumn[] = teamMembers.map((item: User) => ({
    id: item.id,
    name: item.name,
    avatarUrl: item.avatarUrl,
    email: item.email,
    role: item.role,
    SubAccount: agencyDetails?.SubAccount,
    Agency: agencyDetails,
    Permissions: item?.Permissions,
  }))

  return (
    <div className='w-full'>
      <TeamClient agencyId={agencyDetails.id} data={formattedData}  />
    </div>
  )
}

export default AgencyTeam