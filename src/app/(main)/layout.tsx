import React from 'react'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      {children}
    </ClerkProvider>

  )
}

export default MainLayout