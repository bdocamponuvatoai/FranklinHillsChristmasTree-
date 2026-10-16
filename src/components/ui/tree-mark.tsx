import type { SVGProps } from "react";

/** The outlined evergreen used as the brand mark. */
export function TreeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 3 8 19h7L4 33h12v11h8V33h12L25 19h7Z" />
    </svg>
  );
}
