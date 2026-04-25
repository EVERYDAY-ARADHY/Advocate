import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function getLenis(): Lenis | undefined {
  return typeof window !== "undefined" ? window.__lenis : undefined;
}

export function smoothScrollTo(
  target: string | HTMLElement,
  offset = -80,
) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  // Fallback to native
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  const top =
    (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}
