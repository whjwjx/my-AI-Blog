'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { SearchProvider } from '@/components/SearchProvider'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  )
}
