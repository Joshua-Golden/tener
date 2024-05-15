import { getAuthUserDetails } from '@/lib/queries';
import { Permissions, SubAccount } from '@prisma/client';
import React from 'react'
import MenuOptions from './menu-options';

interface SidebarProps {
    id: string;
    type: 'agency' | 'subaccount'
}
const Sidebar = async ({id, type}: SidebarProps) => {
    const user = await getAuthUserDetails();
    if (!user) return null
    if (!user.Agency) return

    const details = type === 'agency'
        ? user?.Agency
        : user?.Agency.SubAccount.find((subaccount: SubAccount) => subaccount.id === id)

    const isWhiteLabeledAgency = user.Agency.whiteLabel;
    if (!details) return

    let sidebarLogo = user.Agency.agencyLogo || '/assets/tener-logo.svg'

    if (!isWhiteLabeledAgency) {
        if (type === 'subaccount') {
            sidebarLogo = user?.Agency?.SubAccount.find((subaccount: SubAccount) => subaccount.id === id)?.subAccountLogo || user.Agency.agencyLogo
        }
    }

    const sidebarOpt = type === 'agency'
        ? user.Agency.SidebarOption || []
        : user.Agency.SubAccount.find((subaccount: SubAccount) => subaccount.id === id)?.SidebarOption || []

    const subaccounts = user.Agency.SubAccount.filter((subaccount: SubAccount) => user.Permissions.find((permission: Permissions) => permission.subAccountId === subaccount.id && permission.access))

    return (
        <>
            <MenuOptions defaultOpen details={details} id={id} sidebarLogo={sidebarLogo} sidebarOpt={sidebarOpt} subAccounts={subaccounts} user={user} />
            <MenuOptions details={details} id={id} sidebarLogo={sidebarLogo} sidebarOpt={sidebarOpt} subAccounts={subaccounts} user={user} />
        </>
    )
}

export default Sidebar