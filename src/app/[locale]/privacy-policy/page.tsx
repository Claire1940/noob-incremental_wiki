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
  const path = '/privacy-policy'

  return {
    title: `Privacy Policy - ${SITE_NAME}`,
    description: `Read the privacy policy for ${SITE_NAME}, including analytics, cookies, and contact details.`,
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
      title: `Privacy Policy - ${SITE_NAME}`,
      description: `How ${SITE_NAME} handles analytics, cookies, and visitor privacy.`,
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
      title: `Privacy Policy - ${SITE_NAME}`,
      description: `How ${SITE_NAME} handles analytics, cookies, and visitor privacy.`,
      images: [`${SITE_URL}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, SITE_URL),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Privacy Policy</h1>
          <p className="mb-2 text-lg text-slate-300">
            How {SITE_NAME} collects, uses, and protects visitor information
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Overview</h2>
            <p>
              {SITE_NAME} is an unofficial fan-made resource website for the Roblox game Noob
              Incremental. This privacy policy explains what information we collect, why we
              collect it, and how you can contact us about privacy-related questions.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Basic analytics data such as page views, approximate region, device type, and referral source.</li>
              <li>Technical information such as browser type, operating system, and IP-derived diagnostics.</li>
              <li>Local preference data such as language or theme choices stored in your browser.</li>
            </ul>

            <h2>3. How We Use Information</h2>
            <ul>
              <li>To understand which guides and pages are useful to visitors.</li>
              <li>To improve site speed, navigation, and content quality.</li>
              <li>To detect abuse, broken pages, and technical issues.</li>
            </ul>

            <h2>4. Cookies and Analytics</h2>
            <p>
              We may use cookies or similar technologies to measure traffic, remember interface
              preferences, and understand aggregate site usage. Third-party analytics or ad
              providers may also place cookies subject to their own policies.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Pages on this site may link to Roblox, YouTube, Discord, X, and other third-party
              services related to Noob Incremental. We do not control those services and are not
              responsible for their privacy practices.
            </p>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              This website is intended as a general-audience fan resource. We do not knowingly
              collect personal information from children under 13. If you believe personal data
              has been submitted to us in error, contact us and we will review the request.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We use reasonable administrative and technical measures to protect the information
              available to us, but no online service can guarantee absolute security.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may revise this policy when site features, analytics providers, or legal
              requirements change. Updates will be reflected by the date shown at the top of this
              page.
            </p>

            <h2>9. Contact</h2>
            <p>
              For privacy questions, email{' '}
              <a
                href="mailto:privacy@noob-incremental.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                privacy@noob-incremental.wiki
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
