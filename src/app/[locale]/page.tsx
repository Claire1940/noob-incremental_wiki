import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noob-incremental.wiki'
  const t = await getTranslations({ locale, namespace: 'seo.home' })
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: pageUrl,
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Noob Incremental Roblox hero artwork',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [`${siteUrl}/images/hero.webp`],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  const latestArticles = await getLatestArticles(locale as Language, 30)

  return <HomePageClient latestArticles={latestArticles} locale={locale} />
}
