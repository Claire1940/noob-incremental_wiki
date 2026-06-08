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
  const path = '/terms-of-service'

  return {
    title: `Terms of Service - ${SITE_NAME}`,
    description: `Read the terms of service for ${SITE_NAME}, including acceptable use, disclaimers, and contact details.`,
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
      title: `Terms of Service - ${SITE_NAME}`,
      description: `Terms and conditions for using ${SITE_NAME}.`,
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
      title: `Terms of Service - ${SITE_NAME}`,
      description: `Terms and conditions for using ${SITE_NAME}.`,
      images: [`${SITE_URL}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, SITE_URL),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Terms of Service</h1>
          <p className="mb-2 text-lg text-slate-300">Terms and conditions for using {SITE_NAME}</p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using {SITE_NAME}, you agree to these Terms of Service. If you do
              not agree, do not use the site.
            </p>

            <h2>2. Nature of the Site</h2>
            <p>
              {SITE_NAME} is an unofficial fan-made website that publishes guides, reference
              content, and community links for Noob Incremental on Roblox. We are not affiliated
              with Roblox Corporation or the developers of Noob Incremental.
            </p>

            <h2>3. Acceptable Use</h2>
            <ul>
              <li>Use the site only for lawful purposes.</li>
              <li>Do not interfere with the site, attempt unauthorized access, or abuse automated systems.</li>
              <li>Do not scrape, republish, or commercially reuse original site content without permission.</li>
            </ul>

            <h2>4. Content Accuracy</h2>
            <p>
              We aim to keep guides accurate, but Noob Incremental may change at any time through
              updates, balance changes, or code expirations. We do not guarantee that every page is
              complete, current, or error-free.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              This site may link to Roblox, Discord, YouTube, X, or other third-party services.
              Your use of those services is governed by their own terms and policies.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              Original site content belongs to {SITE_NAME}. Game names, logos, screenshots, and
              related assets belong to their respective owners and are used only for commentary,
              reference, and community documentation.
            </p>

            <h2>7. Disclaimer</h2>
            <p>
              The site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any
              kind. We are not liable for losses arising from your use of the site or reliance on
              its content.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after changes
              are posted constitutes acceptance of the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              For legal questions, email{' '}
              <a
                href="mailto:legal@noob-incremental.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                legal@noob-incremental.wiki
              </a>
              .
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
