'use client'

import React from 'react'
import { useModal } from '@/providers/modal-provider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from '../ui/separator'

interface CustomModalProps {
    title: string,
    subheading: string,
    children: React.ReactNode,
    defaultOpen?: boolean,
}

const CustomModal = ({title, subheading, children, defaultOpen}: CustomModalProps) => {
    const {isOpen, setClose} = useModal()

    return (
        <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
            <DialogContent className='bg-card z-50 h-screen md:h-fit w-screen md:w-fit p-0'>
                <ScrollArea className='md:max-h-[700px] h-full w-full p-2'>
                    <DialogHeader className='p-4 text-left'>
                        <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
                        <DialogDescription className=''>{subheading}</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    {children}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal