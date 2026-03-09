import React from 'react'
import { cn } from '@/lib/utils'
import svgToDataUri from 'mini-svg-data-uri'

export const GridBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center bg-white dark:bg-gray-950',
        className
      )}
    >
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
