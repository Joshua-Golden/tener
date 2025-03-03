import SubAccountDetails from '@/components/forms/subaccount-details'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

interface SubaccountSettingsPageProps {
  params: { subaccountId: string }
}

const SubaccountSettingsPage = async ({ params }: SubaccountSettingsPageProps) => {
  const authUser = await currentUser()
  if (!authUser) return

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser?.emailAddresses[0]?.emailAddress
    },
  })
  if (!userDetails) return

  const subAccount = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId
    },
  })
  if (!subAccount) return

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: subAccount?.agencyId,
    },
    include: {
      SubAccount: true,
    },
  })
  if (!agencyDetails) return

  const subAccounts = agencyDetails.SubAccount

  return (
    <div className='flex lg:flex-row flex-col gap-4'>
      <div className='w-full lg:w-1/2'>
        <SubAccountDetails
          agencyDetails={agencyDetails}
          details={subAccount}
          userId={userDetails.id}
          userName={userDetails.name}
        />
      </div>
      <div className='w-full lg:w-1/2'>
        <UserDetails
          type="subaccount"
          id={params.subaccountId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </div>
  )
}

export default SubaccountSettingsPage