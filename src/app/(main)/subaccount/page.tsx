import React from 'react'
import { redirect } from 'next/navigation';

import { Permissions } from '@prisma/client';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import Unauthorized from '@/components/unauthorized';

interface SubAccountMainPageProps {
  searchParams: { state: string; code: string;};
}

const SubAccountMainPage = async ({searchParams, }: SubAccountMainPageProps) => {
  const agencyId = await verifyAndAcceptInvitation()
  if (!agencyId) return <Unauthorized />

  const authUser = await getAuthUserDetails();
  if (!authUser) return

  const getFirstSubaccountWithAccess = authUser.Permissions.find((permission: Permissions) => permission.access === true)
  
  if (searchParams.state) {
    const statePath = searchParams.state.split('___')[0];
    const stateSubaccountId = searchParams.state.split('___')[1];
    if (!stateSubaccountId) return <Unauthorized />

    return redirect(`/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`)
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`)
  }

  return <Unauthorized />
}

export default SubAccountMainPage