import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import { Locale, Dictionary } from '@/dictionaries/i18n-config'

interface Props {
  children: ReactNode
  dict: Dictionary
  locale: Locale
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children, dict, locale }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header dict={dict} locale={locale} />
        <main className="mb-auto">{children}</main>
        <Footer dict={dict} />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
