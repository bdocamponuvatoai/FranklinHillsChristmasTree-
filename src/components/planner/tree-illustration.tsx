import type { CSSProperties } from "react";

import type { Silhouette } from "@/lib/planner";

const FLOOR_Y = 285;
const TREE_BASE_Y = 277;
const TREE_TIP_Y = 62;
const ORIGIN = `150px ${TREE_BASE_Y}px`;

const LIGHTS = [
  [147, 105],
  [126, 150],
  [166, 164],
  [104, 213],
  [143, 197],
  [182, 223],
  [153, 240],
  [121, 236],
  [170, 128],
] as const;

const glide: CSSProperties = {
  transformBox: "view-box",
  transition: "transform 0.8s var(--ease-spring)",
};

const springTransform: CSSProperties = { ...glide, transformOrigin: ORIGIN };

type TreeIllustrationProps = {
  scale: number;
  shape: Silhouette;
  lights: boolean;
  ceilingLabel: string;
  heightLabel: string;
};

/** Illustrated room with a tree that scales, slims and lights up live. */
export function TreeIllustration({
  scale,
  shape,
  lights,
  ceilingLabel,
  heightLabel,
}: TreeIllustrationProps) {
  const tipY = TREE_BASE_Y - (TREE_BASE_Y - TREE_TIP_Y) * scale;
  const rulerScale = (FLOOR_Y - tipY) / (FLOOR_Y - TREE_TIP_Y);

  return (
    <svg
      viewBox="0 0 300 320"
      role="img"
      aria-label={`Illustration: a ${shape} tree up to ${heightLabel} under a ${ceilingLabel} ceiling`}
      className="mx-auto h-auto w-full max-w-[22rem]"
    >
      {/* Room */}
      <path
        d="M25 285V28h250v257M10 285h280"
        fill="none"
        stroke="var(--color-moss)"
        strokeOpacity={0.45}
      />
      <text x={34} y={44} fontSize={8.5} letterSpacing={1.2} fill="var(--color-moss)">
        {ceilingLabel.toUpperCase()} CEILING
      </text>

      {/* Height ruler — animated with transforms so it glides with the tree. */}
      <g stroke="var(--color-berry)" strokeWidth={1} vectorEffect="non-scaling-stroke">
        <line
          x1={258}
          x2={258}
          y1={TREE_TIP_Y}
          y2={FLOOR_Y}
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          style={{
            ...glide,
            transformOrigin: `258px ${FLOOR_Y}px`,
            transform: `scaleY(${rulerScale})`,
          }}
        />
        <line
          x1={252}
          x2={264}
          y1={TREE_TIP_Y}
          y2={TREE_TIP_Y}
          style={{ ...glide, transform: `translateY(${tipY - TREE_TIP_Y}px)` }}
        />
        <line x1={252} x2={264} y1={FLOOR_Y} y2={FLOOR_Y} />
      </g>
      <text
        x={250}
        y={0}
        fontSize={10}
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--color-berry)"
        fontWeight={500}
        style={{ ...glide, transform: `translateY(${(tipY + FLOOR_Y) / 2}px)` }}
      >
        {heightLabel}
      </text>

      {/* Tree */}
      <g style={{ ...springTransform, transform: `scale(${scale})` }}>
        <g style={{ ...springTransform, transform: shape === "slim" ? "scaleX(0.68)" : "none" }}>
          <path
            d="m150 62-37 53h23l-54 65h29l-51 65h75v32h30v-32h75l-51-65h29l-54-65h23Z"
            fill="var(--color-pine)"
          />
          <g
            fill="var(--color-glow)"
            style={{ opacity: lights ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            {LIGHTS.map(([cx, cy], index) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={3}
                className="animate-twinkle"
                style={{ animationDelay: `${(index * 0.37) % 2.6}s` }}
              />
            ))}
          </g>
          <path
            d="m150 38 3 9 10 1-8 6 3 10-8-6-8 6 3-10-8-6 10-1Z"
            transform="translate(0 -4)"
            fill="var(--color-berry)"
          />
        </g>
      </g>
    </svg>
  );
}
