'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from 'lucide-react';
import clsx from 'clsx';

import { Agency, AgencySidebarOption, SubAccount, SubAccountSidebarOption } from '@prisma/client';
import { icons } from '@/lib/constants';
import { useModal } from '@/providers/modal-provider';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { AspectRatio } from '../ui/aspect-ratio';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import CustomModal from '../global/custom-modal';
import SubAccountDetails from '../forms/subaccount-details';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';

interface MenuOptionsProps {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
}

const MenuOptions = ({defaultOpen, details, subAccounts, sidebarLogo, sidebarOpt, user, id}: MenuOptionsProps) => {
  const {setOpen} = useModal()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const openState = useMemo(
    () =>( defaultOpen? { open: true }: {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true)
  },[])

  if (!isMounted) return


  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger asChild className='absolute left-4 top-4 z-[40] md:!hidden flex'>
        <Button variant="outline" size="icon" onClick={() => console.log('open')}>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent showX={!defaultOpen} side="left" className={clsx('bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6', { 'hidden md:inline-block z-0 w-[300px]': defaultOpen, 'inline-block md:hidden z-[100] w-full': !defaultOpen})}>
        <div>
          <ScrollArea className='h-screen'>
          <AspectRatio ratio={16/9}>
            <Image
              src={sidebarLogo}
              alt='Sidebar Logo'
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className='w-full my-4 flex items-center justify-between py-8'>
                <div className="flex items-center text-left gap-3">
                  <Compass />
                  <div className='flex flex-col'>
                    {details.name}
                    <span className='text-muted-foreground'>{details.address}</span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className='text-muted-foreground' />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80 max-h-80 mt-4 z-[200]'>
              <ScrollArea className='h-full'>
              <Command className='rounded-lg'>
                <CommandInput placeholder='Search Acounts' />
                <CommandList className=''>
                  <CommandEmpty>No results found</CommandEmpty>
                  {(user.role === 'AGENCY_OWNER' || user.role === 'AGENCY_ADMIN')
                    && user?.Agency &&
                    <CommandGroup heading="Agency">
                      <CommandItem className={clsx('!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:bg-muted hover:font-bold cursor-pointer transition-all', )}>
                        {defaultOpen ? (
                          <Link href={`/agency/${user?.Agency?.id}`} className='flex gap-4 w-full h-full'>
                            <div className='relative w-16'>
                              <Image
                                src={user?.Agency?.agencyLogo}
                                alt='Agency Logo'
                                fill
                                className='rounded-md object-contain'
                              />
                            </div>
                            <div className='flex flex-col flex-1'>
                              {user?.Agency?.name}
                              <span className='text-muted-foreground'>{user?.Agency?.address}</span>
                            </div>
                          </Link>
                        ) : (
                          <SheetClose asChild>
                            <Link href={`/agency/${user?.Agency?.id}`} className='flex gap-4 w-full h-full'>
                              <div className='relative w-16'>
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt='Agency Logo'
                                  fill
                                  className='rounded-md object-contain'
                                />
                              </div>
                              <div className='flex flex-col flex-1'>
                                {user?.Agency?.name}
                                <span className='text-muted-foreground'>{user?.Agency?.address}</span>
                              </div>
                            </Link>
                          </SheetClose>
                        )}
                      </CommandItem>
                    </CommandGroup>}
                    <CommandGroup heading="Accounts">
                    {!!subAccounts
                      ? subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id} className={clsx('hover:bg-muted hover:font-bold transition-all')}>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      : 'No Accounts'}
                  </CommandGroup>
                </CommandList>
                
              </Command>
              </ScrollArea>
              {(user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') && (
                <SheetClose className='w-full'>
                  <Button
                    className="w-full flex gap-2 my-2"
                    onClick={() => {
                      setOpen(
                        <CustomModal
                          title="Create A Subaccount"
                          subheading="You can switch between your agency account and the subaccount from the sidebar"
                        >
                          <SubAccountDetails
                            agencyDetails={user?.Agency as Agency}
                            userId={user?.id as string}
                            userName={user?.name}
                          />
                        </CustomModal>
                      )
                    }}
                  >
                    <PlusCircleIcon size={15} />
                    Create Sub Account
                  </Button>
                </SheetClose>
              )}
            </PopoverContent>
          </Popover>
          {/* <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p> */}
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <ScrollArea className='h-[60vh]'>
                  <CommandEmpty>No Results Found</CommandEmpty>
                  <CommandGroup className="overflow-visible">
                    {sidebarOpt.map((sidebarOption) => {
                      let val
                      const result = icons.find(
                        (icon) => icon.value === sidebarOption.icon
                      )
                      if (result) {
                        val = <result.path />
                      }
                      return (
                        <CommandItem
                          key={sidebarOption.id}
                          className={clsx('w-full hover:bg-muted hover:font-bold', {'font-bold bg-primary': pathname === sidebarOption?.link})}
                        >
                          <Link
                            href={sidebarOption.link}
                            className={clsx('w-full flex items-center gap-2 hover:bg-transparent rounded-md transition-all')}
                          >
                            {val}
                            <span>{sidebarOption.name}</span>
                          </Link>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                  </ScrollArea>
              </CommandList>
            </Command>
          </nav>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions