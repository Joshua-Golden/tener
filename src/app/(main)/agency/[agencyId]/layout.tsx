import React from 'react'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries';
import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import BlurPage from '@/components/global/blur-page';
import InfoBar from '@/components/global/info-bar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AgencyPageLayoutProps {
    children: React.ReactNode;
    params: { agencyId: string };
}

const AgencyPageLayout = async ({ children, params }: AgencyPageLayoutProps) => {
    const agencyId = await verifyAndAcceptInvitation();
    const user = await currentUser();
    if (!user) {
        return redirect(`/`)
    }
    if (!agencyId) {
        return redirect(`/agency`)
    }
    if (user.privateMetadata.role !== 'AGENCY_OWNER' && user.privateMetadata.role !== 'AGENCY_ADMIN') {
        return <Unauthorized />
    }

    let allNoti: any = []

    const notifications = await getNotificationAndUser(agencyId)

    if (notifications) allNoti = notifications;

    return (
        <div className='h-screen overflow-hidden'>
            <Sidebar id={params.agencyId} type="agency" />
            <div className='md:pl-[300px]'>
                <InfoBar notifications={allNoti} role={allNoti?.User?.role} />
                <div className='min-h-screen backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black z-[11]'>
                    <div className='h-[93vh] overflow-scroll px-4 pb-8 pt-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyPageLayout