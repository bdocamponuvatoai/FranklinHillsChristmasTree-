"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";

import { business } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  feetToMetres,
  formatFeet,
  maxTreeHeight,
  plannerLimits,
  treeScale,
  type Silhouette,
} from "@/lib/planner";

import { Eyebrow } from "../ui/eyebrow";
import { TreeIllustration } from "./tree-illustration";

const silhouettes: ReadonlyArray<{ value: Silhouette; label: string }> = [
  { value: "full", label: "Full & classic" },
  { value: "slim", label: "Slim & simple" },
];

type RangeFieldProps = {
  label: string;
  hint: string;
  value: number;
  display: string;
  valueText: string;
  limits: { min: number; max: number; step: number };
  onChange: (value: number) => void;
};

function RangeField({ label, hint, value, display, valueText, limits, onChange }: RangeFieldProps) {
  const id = useId();
  const fill = ((value - limits.min) / (limits.max - limits.min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label} <span className="block text-xs font-normal text-moss">{hint}</span>
        </label>
        {/* Visual readout only: the slider exposes its value via aria-valuetext, and an
            <output> would be an implicit live region announcing every drag step. */}
        <span
          aria-hidden="true"
          className="font-display text-3xl tracking-[-0.03em] text-pine tabular-nums"
        >
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={value}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range mt-1"
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div aria-hidden="true" className="flex justify-between text-[0.625rem] text-moss">
        <span>{limits.min}</span>
        <span>{limits.max}</span>
      </div>
    </div>
  );
}

function Choice({ children, ...props }: { children: ReactNode } & ComponentProps<"input">) {
  return (
    <label className="relative flex-1 cursor-pointer">
      <input className="peer sr-only" {...props} />
      <span className="flex min-h-12 items-center justify-center rounded-full border border-line px-4 text-sm transition-colors duration-300 peer-checked:border-pine peer-checked:bg-pine peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ember hover:border-pine">
        {children}
      </span>
    </label>
  );
}

/**
 * Live tree height planner. Everything recalculates as the visitor drags;
 * screen readers get one debounced summary once they settle on a value.
 */
export function TreePlanner() {
  const [ceiling, setCeiling] = useState<number>(plannerLimits.ceiling.initial);
  const [allowance, setAllowance] = useState<number>(plannerLimits.allowance.initial);
  const [shape, setShape] = useState<Silhouette>("full");
  const [lights, setLights] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const hasInteracted = useRef(false);

  const maxHeight = maxTreeHeight(ceiling, allowance);
  const fits = maxHeight > 0;
  const shapeLabel = silhouettes.find((option) => option.value === shape)?.label ?? "";
  const summary = fits
    ? `Your plan: a ${shape} silhouette up to ${formatFeet(maxHeight)} tall.`
    : "Your stand and topper allowance fills this height. Try a smaller allowance or a taller space.";

  useEffect(() => {
    if (!hasInteracted.current) return;
    const timeout = setTimeout(() => setAnnouncement(summary), 700);
    return () => clearTimeout(timeout);
  }, [summary]);

  const interact =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      hasInteracted.current = true;
      setter(value);
    };

  return (
    <div className="grid overflow-hidden rounded-[1.25rem] border border-line bg-paper sm:rounded-[2rem] lg:grid-cols-2">
      {/* Live preview */}
      <div className="flex flex-col justify-between gap-6 bg-sage p-6 sm:p-10">
        <div className="flex justify-between gap-4 eyebrow text-moss">
          <span>
            Your <span className="hidden sm:inline">Christmas </span>corner
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true" className="size-1.5 animate-beacon rounded-full bg-berry" />
            Live preview
          </span>
        </div>

        <TreeIllustration
          scale={treeScale(maxHeight, ceiling)}
          shape={shape}
          lights={lights}
          ceilingLabel={formatFeet(ceiling)}
          heightLabel={fits ? formatFeet(maxHeight) : "—"}
        />

        <div className="flex items-end justify-between gap-6 border-t border-sage-deep pt-5">
          <div>
            <p className="eyebrow text-moss">Aim for a tree up to</p>
            <p className="mt-2 font-display text-[clamp(3rem,8vw,4.75rem)] leading-none tracking-[-0.04em] text-pine tabular-nums">
              {fits ? formatFeet(maxHeight) : "—"}
            </p>
          </div>
          <p className="pb-1 text-right text-xs leading-relaxed text-moss">
            {fits && <>≈ {feetToMetres(maxHeight)} m</>}
            <br />
            {shapeLabel}
          </p>
        </div>
        <p className="text-center text-[0.6875rem] text-moss">
          Illustrative proportions, not available inventory.
        </p>
      </div>

      {/* Controls */}
      <form
        className="flex flex-col gap-7 p-6 sm:p-10 lg:p-12"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <Eyebrow className="mb-4 text-moss">Your tree height planner</Eyebrow>
          <h3 className="font-display text-title">Picture your kind of Christmas.</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-moss">
            Allow space for your stand and topper. Use this simple estimate before you visit.
          </p>
        </div>

        <RangeField
          label="Ceiling height"
          hint="Floor to ceiling, in feet"
          value={ceiling}
          display={formatFeet(ceiling)}
          valueText={`${ceiling} feet`}
          limits={plannerLimits.ceiling}
          onChange={interact(setCeiling)}
        />
        <RangeField
          label="Stand + topper space"
          hint="Combined allowance, in inches"
          value={allowance}
          display={`${allowance} in`}
          valueText={`${allowance} inches`}
          limits={plannerLimits.allowance}
          onChange={interact(setAllowance)}
        />

        <fieldset>
          <legend className="mb-3 flex w-full justify-between text-sm font-medium">
            Choose a silhouette
            <span className="text-xs font-normal text-moss">For visual planning</span>
          </legend>
          <div className="flex gap-2">
            {silhouettes.map((option) => (
              <Choice
                key={option.value}
                type="radio"
                name="silhouette"
                value={option.value}
                checked={shape === option.value}
                onChange={() => interact(setShape)(option.value)}
              >
                {option.label}
              </Choice>
            ))}
          </div>
        </fieldset>

        <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm font-medium">
          Bring on the lights
          <input
            type="checkbox"
            role="switch"
            checked={lights}
            onChange={(event) => interact(setLights)(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ember",
              lights ? "bg-pine" : "bg-sage-deep",
            )}
          >
            <span
              className={cn(
                "absolute top-1 left-1 size-5 rounded-full bg-paper shadow transition-transform duration-500 ease-spring",
                lights && "translate-x-5",
              )}
            />
          </span>
        </label>

        <div className="mt-auto border-t border-line pt-6">
          <p className="text-[0.9375rem] leading-relaxed">
            {summary}{" "}
            {fits && (
              <>
                <a
                  href={business.phone.href}
                  className="font-medium text-berry underline underline-offset-4"
                >
                  Call {business.owner}
                </a>{" "}
                to ask about matching trees and current availability.
              </>
            )}
          </p>
          <p role="status" className="sr-only">
            {announcement}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-moss">
            Planning estimate only. Measure your actual stand and topper; tree sizes and stock must
            be confirmed by phone.
          </p>
          <noscript>
            <p className="mt-4 text-sm">
              To estimate your tree height, subtract your stand and topper allowance from your
              ceiling height, using the same units.
            </p>
          </noscript>
        </div>
      </form>
    </div>
  );
}
