import React from 'react'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'


import Navigation from '@/components/site/navigation';

interface SiteLayoutProps {
    children: React.ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
        <main className='h-full'>
            <Navigation />
            {children}
        </main>
    </ClerkProvider>
  )
}

export default SiteLayout