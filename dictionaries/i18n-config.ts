export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh-CN'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export interface Dictionary {
  site: {
    title: string
    description: string
  }
  nav: {
    home: string
    blog: string
    tags: string
    projects: string
    about: string
  }
  blog: {
    all_posts: string
    search: string
    no_posts: string
    read_more: string
    tags: string
    published_on: string
    authors: string
    discuss_twitter: string
    prev_post: string
    next_post: string
  }
  common: {
    prev: string
    next: string
    page_x_of_y: string
  }
  projects: {
    title: string
    description: string
  }
  about: {
    title: string
  }
  '404': {
    title: string
    description: string
    suggestion: string
    back_home: string
  }
}
