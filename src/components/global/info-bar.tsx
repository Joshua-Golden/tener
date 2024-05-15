'use client'

import React, { useState } from 'react'
import { NotificationWithUser } from '@/lib/types'
import { twMerge } from 'tailwind-merge';
import { UserButton } from '@clerk/nextjs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Bell } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Role } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from './mode-toggle';
import { ScrollArea } from '../ui/scroll-area';
import { formatDistance } from 'date-fns';

interface InfoBarProps {
    notifications: NotificationWithUser | [];
    role?: Role;
    className?: string;
    subaccountId?: string;
}

const InfoBar = ({notifications, role, className, subaccountId}: InfoBarProps) => {
    const [allNotifications, setAllNotifications] = useState(notifications)
    const [showAll, setShowAll] = useState(true)
        
    const handleClick = () => {
        if (!showAll) {
            setAllNotifications(notifications)
        } else {
            if (notifications?.length !== 0) {
                setAllNotifications(notifications?.filter((item) => item.subAccountId === subaccountId) ?? [])
            }
        }

        setShowAll((prev) => !prev)
    }

    return (
        <>
            <div
                className={twMerge(
                'md:left-[300px] h-[7vh] px-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px] ',
                className
                )}
            >
                <div className='flex items-center gap-2 ml-auto'>
                    <UserButton afterSignOutUrl='/' />

                    <Sheet>
                        <SheetTrigger>
                            <div className='rounded-full w-8 h-8 flex items-center justify-center bg-primary text-white'>
                                <Bell size={17} />
                            </div>
                        </SheetTrigger>
                        <SheetContent className='mt-4 flex flex-col'>
                            <SheetHeader className='text-left pr-4'>
                                <SheetTitle>Notifications</SheetTitle>
                                <SheetDescription>
                                    {(role === 'AGENCY_ADMIN' || role === 'AGENCY_OWNER') && (
                                        <Card className='flex items-center justify-between p-4'>
                                            Current SubAccount
                                            <Switch onCheckedChange={handleClick} />
                                        </Card>
                                    )
                                    }
                                </SheetDescription>
                            </SheetHeader>
                            <div className='overflow-y-scroll flex flex-col gap-4 pr-4'>
                                {allNotifications?.map((notification) => (
                                    <div key={notification.id} className='flex flex-col gap-y-2 text-ellipsis'>
                                        <div className='flex gap-3 items-center'>
                                            <Avatar>
                                                <AvatarImage src={notification?.User.avatarUrl} alt="Profile Picture" />
                                                <AvatarFallback className='bg-primary'>{notification?.User?.name.slice(0,2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col w-full">
                                                <div className='flex items-center justify-between w-full'>
                                                    <span className=''>{notification.notification.split(` |`)[0]}:</span>
                                                    <span className='text-xs text-muted-foreground'>
                                                        {formatDistance(new Date(notification.createdAt), new Date(), { addSuffix: true })}
                                                    </span>

                                                </div>
                                                <p className='text-muted-foreground'>
                                                    <span>{notification.notification.split(` |`)[1]}</span>
                                                    <span>{notification.notification.split(` |`)[2]}</span>
                                                    <span>:{notification.notification.split(` |`)[3]}</span>
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                                {allNotifications?.length === 0 && (
                                    <div className='flex items-center justify-center text-muted-foreground'>
                                        You have no notifications
                                    </div>
                                )}
                            </div>
                            
                        </SheetContent>
                    </Sheet>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}

export default InfoBar