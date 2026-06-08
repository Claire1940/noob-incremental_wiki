import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://noob-incremental.wiki'
const SITE_NAME = 'Noob Incremental Wiki'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const path = '/about'

  return {
    title: `About ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME}, an unofficial fan resource for Noob Incremental on Roblox.`,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      title: `About ${SITE_NAME}`,
      description: `Learn about ${SITE_NAME}, an unofficial fan resource for Noob Incremental on Roblox.`,
      images: [
        {
          url: `${SITE_URL}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About ${SITE_NAME}`,
      description: `Learn about ${SITE_NAME}, an unofficial fan resource for Noob Incremental on Roblox.`,
      images: [`${SITE_URL}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, SITE_URL),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">About {SITE_NAME}</h1>
          <p className="text-lg text-slate-300">
            An unofficial fan resource for Noob Incremental players on Roblox
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Covers</h2>
            <p>
              {SITE_NAME} collects guides and reference content for players who want help with
              codes, runes, prestige timing, upgrade priorities, and general progression in Noob
              Incremental.
            </p>

            <h2>Why It Exists</h2>
            <p>
              Noob Incremental mixes several progression systems, and useful details often get
              scattered across videos, community chat, and update posts. This site is intended to
              turn that information into faster-to-scan wiki pages.
            </p>

            <h2>What It Is Not</h2>
            <p>
              This is not an official Roblox, Ghoulax Games, or Noob Incremental property. It is
              an independent fan-made project built for informational use.
            </p>

            <h2>Contact</h2>
            <p>
              General questions: {' '}
              <a
                href="mailto:contact@noob-incremental.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                contact@noob-incremental.wiki
              </a>
            </p>
            <p>
              Support or corrections: {' '}
              <a
                href="mailto:support@noob-incremental.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                support@noob-incremental.wiki
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
