"use client";

import { useRef, type CSSProperties } from "react";

import { business, navigation } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { Close, Phone } from "../ui/icons";
import { TreeMark } from "../ui/tree-mark";

/**
 * Full-screen menu built on the native <dialog>: focus trapping, Escape to
 * close, inert page content and focus restoration all come from the platform.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="flex min-h-11 items-center gap-3 rounded-full border border-line bg-paper/70 py-2 pr-2 pl-4 text-[0.8125rem] font-medium"
      >
        Menu
        <span aria-hidden="true" className="flex size-7 flex-col items-center justify-center gap-1">
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="menu-sheet fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-pine p-0 text-paper"
      >
        <div className="flex min-h-full flex-col pt-[env(safe-area-inset-top)] pb-[max(env(safe-area-inset-bottom),1.5rem)]">
          <div className="shell flex h-18 items-center justify-between border-b border-paper/15">
            <span className="flex items-center gap-3">
              <TreeMark className="h-9 w-7" />
              <span className="font-display text-xl tracking-[-0.03em]">{business.shortName}</span>
            </span>
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full border border-paper/25 text-xl"
            >
              <Close />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex-1 py-8">
            <ul>
              {navigation.map((item, index) => (
                <li
                  key={item.href}
                  className="menu-item border-b border-paper/12"
                  style={{ "--i": index } as CSSProperties}
                >
                  <a
                    href={`/${item.href}`}
                    onClick={close}
                    className="flex min-h-18 items-baseline gap-5 py-4 font-display text-[clamp(2.25rem,10vw,3.25rem)] leading-none tracking-[-0.04em] transition-colors active:text-frost"
                  >
                    <span className="font-sans text-[0.6875rem] tracking-[0.15em] text-frost tabular-nums">
                      {item.index}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="menu-item shell space-y-4"
            style={{ "--i": navigation.length } as CSSProperties}
          >
            <ButtonLink
              href={business.phone.href}
              variant="ivory"
              icon={<Phone />}
              className="w-full"
            >
              Call {business.owner} · {business.phone.display}
            </ButtonLink>
            <p className="text-center text-xs text-paper/60">
              Please confirm dates, hours and location by phone before visiting.
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
