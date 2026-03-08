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
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="#9ca3af" cx="10" cy="10" r="1.6"></circle></svg>`
          )}")`,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
