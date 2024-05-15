import React from 'react'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import {Role} from '@prisma/client'
import { getAuthUserDetails, getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries';
import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import BlurPage from '@/components/global/blur-page';
import InfoBar from '@/components/global/info-bar';

interface SubAccountIdLayoutProps {
    children: React.ReactNode;
    params: { subaccountId: string };
}

const SubAccountIdLayout = async ({ children, params }: SubAccountIdLayoutProps) => {
    const agencyId = await verifyAndAcceptInvitation();
    const authUser = await currentUser();
    if (!authUser) return redirect(`/`)
    if (!agencyId) return redirect(`/agency`)

    let notifications: any = []

    if (!authUser.privateMetadata.role) {
        return <Unauthorized />
    } else {
        const allPermissions = await getAuthUserDetails()
        const hasPermission = allPermissions?.Permissions.find((permissions: any) => permissions.access && permissions.subAccountId === params.subaccountId)
        if (!hasPermission) return <Unauthorized />

        const allNotifications = await getNotificationAndUser(agencyId)

        if ( authUser.privateMetadata.role === 'AGENCY_ADMIN' || authUser.privateMetadata.role === 'AGENCY_OWNER' ) {
            notifications = allNotifications
        } else {
            const filteredNoti = allNotifications?.filter(
                (item: any) => item.subAccountId === params.subaccountId
            )
        if (filteredNoti) notifications = filteredNoti
        }
    }
    return (
        <div className='h-screen overflow-hidden'>
            <Sidebar id={params.subaccountId} type="subaccount" />
            <div className='md:pl-[300px]'>
                <InfoBar notifications={notifications} role={authUser?.privateMetadata.role as Role} subaccountId={params.subaccountId as string} />
                <div className='min-h-screen backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black z-[11]'>
                    <div className='h-[93vh] overflow-scroll px-4 pb-8 pt-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubAccountIdLayout;
