import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface BlurPageProps {
  children: React.ReactNode
}

const BlurPage = ({children}: BlurPageProps) => {
  return (
    <div
      className="h-screen backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black absolute pt-24 z-[11]"
      id="blur-page"
    >
      <ScrollArea className='h-screen'>
        <div className="">
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}

export default BlurPage