/**
 * Shared layout and control classes.
 *
 * These strings were duplicated across every page, which is how the pages drifted
 * apart in the first place. Import them instead of re-typing the class list.
 */

/** Page gutters. Navbar and Footer use this too — change it here or the rules stop lining up. */
export const CONTAINER = 'max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16';

/**
 * The forward action. One per view, on the thing you most want done — it is
 * the only filled control on the site, which is what makes the hue mean
 * something. A second brand-filled button on the same screen would turn it
 * back into decoration.
 */
export const BTN_PRIMARY =
  'inline-flex items-center gap-2 rounded-[3px] bg-[var(--brand)] text-[var(--on-brand)] px-6 py-3 text-[15px] font-medium transition-colors duration-200 hover:bg-[var(--brand-strong)]';

/** Same shape, inverted, for use on the brand-filled closing field. */
export const BTN_ON_BRAND =
  'inline-flex items-center gap-2 rounded-[3px] bg-[var(--on-brand-field)] text-[var(--brand-field)] px-6 py-3 text-[15px] font-medium transition-opacity duration-200 hover:opacity-90';

/** Outlined button. Everything secondary. */
export const BTN_SECONDARY =
  'inline-flex items-center gap-2 rounded-[3px] border border-[var(--rule)] text-[var(--ink)] px-6 py-3 text-[15px] font-medium transition-colors duration-200 hover:border-[var(--ink)]';

/** Inline text link, ruled underline that darkens on hover. */
export const LINK_UNDERLINE =
  'underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]';
