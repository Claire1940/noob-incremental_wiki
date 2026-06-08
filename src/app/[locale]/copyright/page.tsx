import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://noob-incremental.wiki'
const SITE_NAME = 'Noob Incremental Wiki'
const LAST_UPDATED = 'June 8, 2026'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const path = '/copyright'

  return {
    title: `Copyright Notice - ${SITE_NAME}`,
    description: `Copyright, fair use, and takedown information for ${SITE_NAME}.`,
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
      title: `Copyright Notice - ${SITE_NAME}`,
      description: `Copyright, fair use, and takedown information for ${SITE_NAME}.`,
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
      title: `Copyright Notice - ${SITE_NAME}`,
      description: `Copyright, fair use, and takedown information for ${SITE_NAME}.`,
      images: [`${SITE_URL}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, SITE_URL),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Copyright Notice</h1>
          <p className="mb-2 text-lg text-slate-300">
            Intellectual property and permitted use for {SITE_NAME}
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Site Content</h2>
            <p>
              Original text, page structure, and editorial work published on {SITE_NAME} are
              owned by the site unless otherwise noted.
            </p>

            <h2>2. Game Assets and Trademarks</h2>
            <p>
              Noob Incremental, Roblox, and related names, images, and game assets are the
              property of their respective owners. This website is unofficial and not endorsed by
              those rights holders.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We may reference game names, screenshots, interface elements, and artwork for
              commentary, identification, community documentation, and educational guide content.
            </p>

            <h2>4. Reuse of Our Content</h2>
            <ul>
              <li>You may link to our pages freely.</li>
              <li>Short quotations with attribution are allowed.</li>
              <li>Do not republish substantial original content without permission.</li>
            </ul>

            <h2>5. Takedown Requests</h2>
            <p>
              If you believe content on this site infringes your rights, send a notice with the
              relevant page URL, identification of the work at issue, and your contact details.
            </p>
            <p>
              Email takedown and copyright questions to{' '}
              <a
                href="mailto:dmca@noob-incremental.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                dmca@noob-incremental.wiki
              </a>
              .
            </p>

            <h2>6. Counter Notices</h2>
            <p>
              If you believe content was removed in error, reply with a counter notice that
              identifies the material, explains the mistake, and provides a method to contact you.
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
