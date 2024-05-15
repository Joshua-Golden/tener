"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface HeadingProps {
  title: string,
  description: string
  buttonDatas?: {text: string, className?: string, href: string}[],
  secondaryText?: string | null;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  buttonDatas = [],
  secondaryText,
}) => {
  return (
    <div className="">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        {secondaryText && (
          <p className="text-xs text-muted-foreground">{secondaryText}</p>
        )}
      </div>
      {buttonDatas.length > 0 && buttonDatas?.map(( buttonData, index ) => (
        <div className="" key={index}>          
          <Button asChild className={cn('', buttonData.className)}>
            <Link href={buttonData.href}>
                {buttonData.text}
            </Link>          
            </Button>
        </div>
      ))}
      
    </div>
  )
}