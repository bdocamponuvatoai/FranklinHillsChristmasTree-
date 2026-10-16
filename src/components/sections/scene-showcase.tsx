"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { scenes } from "@/content/site";
import { cn } from "@/lib/cn";

import { Pause, Play } from "../ui/icons";

const SCENE_DURATION = "7s";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Three-chapter photographic story, built as an ARIA tablist. Autoplay timing
 * lives in CSS (`.scene-progress`); this component only advances on
 * `animationend`, pauses off-screen, and hands control to the visitor as soon
 * as they pick a chapter.
 */
export function SceneShowcase() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const select = (index: number, { focus = false } = {}) => {
    const next = (index + scenes.length) % scenes.length;
    setActive(next);
    setIsPlaying(false);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: scenes.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], { focus: true });
  };

  const scene = scenes[active];

  return (
    <div
      ref={rootRef}
      data-autoplay={isPlaying && isInView}
      className="grid overflow-hidden rounded-[1.25rem] bg-pine text-paper sm:rounded-[2rem] lg:grid-cols-12"
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[40rem]">
        {scenes.map((item, index) => (
          <Image
            key={item.id}
            src={item.image.src}
            alt={index === active ? item.image.alt : ""}
            aria-hidden={index !== active || undefined}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            placeholder="blur"
            className={cn(
              "object-cover transition-[opacity,scale] duration-[1.4s] ease-out-expo",
              index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
            )}
          />
        ))}
        <span className="absolute top-4 left-4 rounded-full bg-pine-deep/60 px-3 py-1.5 text-[0.6875rem] tracking-[0.12em] tabular-nums backdrop-blur-md sm:top-6 sm:left-6">
          {pad(active + 1)} / {pad(scenes.length)}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-5 lg:p-12">
        <div
          key={scene.id}
          id="scene-panel"
          role="tabpanel"
          aria-labelledby={`scene-tab-${scene.id}`}
          aria-live={isPlaying ? "off" : "polite"}
          className="animate-fade-up"
        >
          <p className="eyebrow text-frost">
            {pad(active + 1)} · {scene.chapter}
          </p>
          <h3 className="mt-5 font-display text-title sm:mt-7">{scene.title}</h3>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-paper/75">
            {scene.description}
          </p>
        </div>

        <div>
          <div
            role="tablist"
            aria-label="Seasonal moments"
            aria-orientation="horizontal"
            className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-0"
          >
            {scenes.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`scene-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="scene-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "group relative flex min-h-16 flex-col items-start justify-center gap-1 rounded-xl px-3 py-3 text-left text-xs transition-colors duration-300 lg:min-h-15 lg:flex-row lg:items-center lg:justify-start lg:gap-5 lg:rounded-none lg:border-t lg:border-paper/15 lg:px-1 lg:text-sm",
                    selected
                      ? "bg-paper/12 text-paper lg:bg-transparent"
                      : "bg-paper/5 text-paper/60 hover:text-paper lg:bg-transparent",
                  )}
                >
                  <span className="text-[0.625rem] tracking-[0.12em] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-2 h-px overflow-hidden bg-paper/15 lg:inset-x-0 lg:top-[-1px] lg:bottom-auto lg:bg-transparent"
                  >
                    {selected && (
                      <span
                        className="scene-progress block h-full bg-glow"
                        style={{ "--duration": SCENE_DURATION } as CSSProperties}
                        onAnimationEnd={() => setActive((current) => (current + 1) % scenes.length)}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs text-paper/70 transition-colors hover:text-paper motion-reduce:hidden"
          >
            {isPlaying ? <Pause /> : <Play />}
            {isPlaying ? "Pause the story" : "Play the story"}
          </button>
        </div>
      </div>
    </div>
  );
}
