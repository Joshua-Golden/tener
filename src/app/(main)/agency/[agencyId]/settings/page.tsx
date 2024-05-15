import AgencyDetails from '@/components/forms/agency-details'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

interface AgencySettingsProps {
    params: { agencyId: string }
}

const AgencySettings = async ({ params }: AgencySettingsProps) => {

    const authUser = await currentUser()
    if (!authUser) return null

    const userDetails = await db.user.findUnique({
        where: {
            email: authUser?.emailAddresses[0]?.emailAddress
        }
    })
    if (!userDetails) return null

    const agencyDetails = await db.agency.findUnique({
        where: {
            id: params.agencyId,
        },
        include: {
            SubAccount: true
        },
    });
    if (!agencyDetails) return null

    const subAccounts = agencyDetails.SubAccount

    return (
        <div className='flex lg:!flex-row flex-col gap-4'>
            <section className='w-full lg:w-1/2'>
                <AgencyDetails data={agencyDetails} />
            </section>
            <section className='w-full lg:w-1/2'>
                <UserDetails type='agency' id={params.agencyId} subAccounts={subAccounts} userData={userDetails} />
            </section>
        </div>
    )
}

export default AgencySettings