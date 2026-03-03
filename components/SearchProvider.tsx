'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter, useParams } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { Locale } from '@/dictionaries/i18n-config'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as Locale

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h'],
            section: 'Home',
            perform: () => router.push(`/${locale}/`),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push(`/${locale}/projects`),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: CoreContent<Blog>) => {
            const isChinese = post.language === 'zh-CN'
            const langPrefix = isChinese ? '[中文] ' : '[EN] '
            return {
              id: post.path,
              name: langPrefix + post.title,
              keywords: post?.summary || '',
              section: 'Blog',
              subtitle: post.tags.join(', '),
              perform: () => router.push(`/${post.language}/blog/${post.slug}`),
            }
          })
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
