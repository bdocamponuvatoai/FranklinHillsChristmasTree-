import { useId, type ComponentProps, type CSSProperties, type ReactNode } from "react";

type RangeFieldProps = {
  label: string;
  hint: string;
  value: number;
  display: string;
  valueText: string;
  limits: { min: number; max: number; step: number };
  onChange: (value: number) => void;
};

/** Labelled range slider with a large readout and its min/max printed underneath. */
export function RangeField({
  label,
  hint,
  value,
  display,
  valueText,
  limits,
  onChange,
}: RangeFieldProps) {
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

/** Pill-shaped radio or checkbox option; the input itself stays visually hidden. */
export function Choice({ children, ...props }: { children: ReactNode } & ComponentProps<"input">) {
  return (
    <label className="relative flex-1 cursor-pointer">
      <input className="peer sr-only" {...props} />
      <span className="flex min-h-12 items-center justify-center rounded-full border border-line px-4 text-sm transition-colors duration-300 peer-checked:border-pine peer-checked:bg-pine peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ember hover:border-pine">
        {children}
      </span>
    </label>
  );
}
