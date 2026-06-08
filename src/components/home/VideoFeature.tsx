"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const t = useTranslations("common");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const shouldAutoplay = isVisible || manualPlay;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${shouldAutoplay ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {!shouldAutoplay ? (
          <button
            type="button"
            onClick={() => setManualPlay(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/35 transition hover:bg-black/25"
            aria-label={`${t("playVideo")} ${title}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.9)] px-5 py-3 text-sm font-semibold text-white shadow-lg">
              <PlayCircle className="h-5 w-5" />
              <span>{t("playVideo")}</span>
            </span>
          </button>
        ) : null}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          {t("watchOnYouTube")}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
