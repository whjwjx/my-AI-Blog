import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Dictionary } from '@/dictionaries/i18n-config'

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer>
      <div className="mt-24 mb-16 flex flex-col items-center">
        <div className="mb-6 flex space-x-6">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="wechat" href={siteMetadata.wechat} size={6} />
          <SocialIcon kind="xiaohongshu" href={siteMetadata.xiaohongshu} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
