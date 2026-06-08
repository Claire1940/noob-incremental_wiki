"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  ExternalLink,
  Gift,
  LineChart,
  Megaphone,
  ScrollText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} animate-pulse rounded-xl border border-border bg-white/5`}
  />
);

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-8 text-center scroll-reveal md:mb-12">
      {eyebrow ? (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://noob-incremental.wiki";
  const youtubeVideoId = "Y3FeBkpbT6g";
  const robloxGameUrl =
    "https://www.roblox.com/games/76911729991355/Noob-Incremental";
  const robloxGroupUrl =
    "https://www.roblox.com/communities/356937272/Ghoulax-Games";
  const discordUrl = "https://discord.com/invite/ghoulaxstudio";
  const twitterUrl = "https://x.com/GhoulaxDev";
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Noob Incremental Wiki",
        description:
          "Noob Incremental Wiki covers Roblox codes, runes, prestige layers, upgrades, Oof farming routes, and beginner progression tips.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Noob Incremental Roblox hero artwork",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Noob Incremental Wiki",
        alternateName: "Noob Incremental",
        url: siteUrl,
        description:
          "Community wiki for Noob Incremental on Roblox, focused on codes, runes, prestige, upgrades, and Oof progression.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Noob Incremental Wiki hero image",
        },
        sameAs: [
          robloxGameUrl,
          robloxGroupUrl,
          discordUrl,
          twitterUrl,
          youtubeUrl,
        ],
      },
      {
        "@type": "VideoGame",
        name: "Noob Incremental",
        gamePlatform: ["Roblox", "PC", "Mobile", "Tablet"],
        applicationCategory: "Game",
        genre: ["Incremental", "Idle", "Roblox"],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: robloxGameUrl,
        },
      },
      {
        "@type": "VideoObject",
        name: "I Went From POOR to TRILLIONAIRE in Roblox Noob Incremental...",
        description:
          "Gameplay showcase video for Noob Incremental on Roblox, used here as an embeddable preview for the game loop and progression style.",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: youtubeEmbedUrl,
        url: youtubeUrl,
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <aside
        className="fixed top-20 z-10 hidden w-40 xl:block"
        style={{ left: "calc((100vw - 1024px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside>

      <aside
        className="fixed top-20 z-10 hidden w-40 xl:block"
        style={{ right: "calc((100vw - 1024px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside>

      <section className="relative overflow-hidden px-4 pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1.5 md:mb-6 md:px-4 md:py-2">
              <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)] md:px-8 md:py-4 md:text-lg"
              >
                <BookOpen className="h-5 w-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={robloxGameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-5xl scroll-reveal">
          <div className="overflow-hidden rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-[radial-gradient(circle_at_top,hsl(var(--nav-theme)/0.16),transparent_60%),linear-gradient(180deg,hsl(var(--nav-theme)/0.08),transparent)] p-2 md:p-3">
            <VideoFeature
              videoId={youtubeVideoId}
              title="I Went From POOR to TRILLIONAIRE in Roblox Noob Incremental..."
            />
          </div>
        </div>
      </section>

      <section className="bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center scroll-reveal md:mb-12">
            <h2 className="text-3xl font-bold md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a
              href="#codes"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("codes");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[0].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[0].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[0].description}
              </p>
            </a>

            <a
              href="#how-to-redeem-codes"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("how-to-redeem-codes");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[1].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[1].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[1].description}
              </p>
            </a>

            <a
              href="#beginner-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("beginner-guide");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[2].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[2].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[2].description}
              </p>
            </a>

            <a
              href="#oof-farming-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("oof-farming-guide");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[3].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[3].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[3].description}
              </p>
            </a>

            <a
              href="#upgrades-and-stats-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("upgrades-and-stats-guide");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[4].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[4].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[4].description}
              </p>
            </a>

            <a
              href="#runes-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("runes-guide");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[5].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[5].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[5].description}
              </p>
            </a>

            <a
              href="#prestige-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("prestige-guide");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[6].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[6].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[6].description}
              </p>
            </a>

            <a
              href="#discord-and-updates"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("discord-and-updates");
              }}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon
                  name={t.tools.cards[7].icon}
                  className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                {t.tools.cards[7].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tools.cards[7].description}
              </p>
            </a>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.codes.eyebrow}
            title={t.modules.codes.title}
            intro={t.modules.codes.intro}
          />

          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {t.modules.codes.activeCodes.map((item: any) => (
                <article
                  key={item.code}
                  className="rounded-2xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                      <Gift className="h-3.5 w-3.5" />
                      <span>{item.status}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-wide">
                    {item.code}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.reward}
                  </p>
                  <div className="mt-4 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {item.rewardType}
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent)] p-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold">{t.modules.codes.panelTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.modules.codes.panelText}
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ScrollText className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                    <h4 className="font-semibold">
                      {t.modules.codes.expiredTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.modules.codes.expiredNote}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Check className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                    <h4 className="font-semibold">{t.modules.codes.tipTitle}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.modules.codes.tipText}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      <section id="how-to-redeem-codes" className="scroll-mt-24 bg-white/[0.02] px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.redeem.eyebrow}
            title={t.modules.redeem.title}
            intro={t.modules.redeem.intro}
          />

          <div className="grid gap-4 md:grid-cols-5">
            {t.modules.redeem.steps.map((step: any) => (
              <article
                key={step.step}
                className="rounded-2xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{step.text}</p>
                <div className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {step.action}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.beginner.eyebrow}
            title={t.modules.beginner.title}
            intro={t.modules.beginner.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.modules.beginner.cards.map((card: any) => (
              <article
                key={card.title}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                  {card.tag}
                </div>
                <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.text}</p>
                <div className="mt-4 rounded-xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.08)] p-3 text-sm">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                    {t.modules.beginner.goalLabel}
                  </span>{" "}
                  <span className="text-muted-foreground">{card.playerGoal}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="oof-farming-guide" className="scroll-mt-24 bg-white/[0.02] px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.oof.eyebrow}
            title={t.modules.oof.title}
            intro={t.modules.oof.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.modules.oof.priorities.map((item: any) => (
              <article
                key={item.priority}
                className="rounded-2xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bold text-white">
                    {item.priority}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {item.timing}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{item.reason}</p>
                <div className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--nav-theme-light))]">
                  {item.resourceFocus}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd ? (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      ) : null}

      <section id="upgrades-and-stats-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.upgrades.eyebrow}
            title={t.modules.upgrades.title}
            intro={t.modules.upgrades.intro}
          />

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="grid bg-[hsl(var(--nav-theme)/0.1)] text-sm font-semibold text-foreground md:grid-cols-4">
              <div className="border-b border-border px-4 py-3 md:border-b-0 md:border-r">
                {t.modules.upgrades.headers.system}
              </div>
              <div className="border-b border-border px-4 py-3 md:border-b-0 md:border-r">
                {t.modules.upgrades.headers.playerAction}
              </div>
              <div className="border-b border-border px-4 py-3 md:border-b-0 md:border-r">
                {t.modules.upgrades.headers.effect}
              </div>
              <div className="px-4 py-3">{t.modules.upgrades.headers.checkpoint}</div>
            </div>

            {t.modules.upgrades.rows.map((row: any) => (
              <div
                key={row.system}
                className="grid border-t border-border bg-white/5 md:grid-cols-4"
              >
                <div className="px-4 py-4 font-semibold">{row.system}</div>
                <div className="px-4 py-4 text-sm text-muted-foreground">
                  {row.playerAction}
                </div>
                <div className="px-4 py-4 text-sm text-muted-foreground">
                  {row.effect}
                </div>
                <div className="px-4 py-4 text-sm text-muted-foreground">
                  {row.checkpoint}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {t.modules.upgrades.stats.map((item: string) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-sm"
              >
                <LineChart className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="runes-guide" className="scroll-mt-24 bg-white/[0.02] px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.runes.eyebrow}
            title={t.modules.runes.title}
            intro={t.modules.runes.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.modules.runes.cards.map((card: any) => (
              <article
                key={card.title}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-4 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                  <div>
                    <h3 className="text-xl font-bold">{card.title}</h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--nav-theme-light))]">
                      {card.tag}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{card.description}</p>
                <div className="mt-4 rounded-xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.08)] p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                      Player Value:
                    </span>{" "}
                    <span className="text-muted-foreground">{card.playerValue}</span>
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                      Best Use:
                    </span>{" "}
                    <span className="text-muted-foreground">{card.bestUse}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {t.modules.runes.bonuses.map((item: string) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prestige-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.prestige.eyebrow}
            title={t.modules.prestige.title}
            intro={t.modules.prestige.intro}
          />

          <div className="space-y-4">
            {t.modules.prestige.steps.map((step: any) => (
              <article
                key={step.step}
                className="flex gap-4 rounded-2xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                  {step.step}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                  <div className="mt-3 rounded-xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-3 text-sm">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                      Action:
                    </span>{" "}
                    <span className="text-muted-foreground">{step.action}</span>
                  </div>
                  <div className="mt-3 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {step.checkpoint}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="discord-and-updates" className="scroll-mt-24 bg-white/[0.02] px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.updates.eyebrow}
            title={t.modules.updates.title}
            intro={t.modules.updates.intro}
          />

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                BookOpen,
                Compass,
                Megaphone,
                ScrollText,
                ExternalLink,
              ].map((Icon, index) => {
                const item = t.modules.updates.links[index];
                return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-white/5 p-5 transition-all hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)]"
                >
                  <Icon className="mb-4 h-6 w-6 text-[hsl(var(--nav-theme-light))]" />
                  <div className="mb-3 inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))]">
                    {item.type}
                  </div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <span>{item.title}</span>
                    <ExternalLink className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-4 rounded-xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.08)] p-4">
                    <p className="text-sm">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Reward Note:
                      </span>{" "}
                      <span className="text-muted-foreground">{item.rewardNote}</span>
                    </p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Best For:
                      </span>{" "}
                      <span className="text-muted-foreground">{item.bestFor}</span>
                    </p>
                  </div>
                </a>
                );
              })}
            </div>

            <div className="rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent)] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Megaphone className="h-6 w-6 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="text-xl font-bold">
                  {t.modules.updates.panelTitle}
                </h3>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                {t.modules.updates.panelText}
              </p>

              <div className="mt-5 rounded-xl border border-border bg-white/5 p-4">
                <h4 className="mb-2 font-semibold">{t.modules.updates.bonusTitle}</h4>
                <ul className="space-y-2">
                  {t.modules.updates.bonuses.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <footer className="border-t border-border bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={robloxGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href={robloxGameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
