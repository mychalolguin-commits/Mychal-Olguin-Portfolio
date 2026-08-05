/**
 * Branding for the certification shelf.
 *
 * `coverImprint`, `coverTagline`, and `spineMark` are drawn directly onto the
 * generated book covers by cover-art.ts — keep them short or they will crowd
 * the artwork at shelf size.
 *
 * `enableOptionalStripeArchive` must stay false. It gates the upstream demo's
 * loader for a separately licensed Stripe Press asset archive that we neither
 * ship nor have rights to; with it off, every cover is generated procedurally.
 */
export const shelfConfig = {
  wordmark: "CREDENTIALS",
  collectionName: "CERTIFICATION SHELF",
  editionEyebrow: "CREDENTIAL",
  coverImprint: "MYCHAL OLGUIN",
  coverTagline: "GROWTH MARKETING",
  spineMark: "MO",
  bookLinkLabel: "Verify credential",
  enableOptionalStripeArchive: false,
} as const;

/** Name kept for compatibility with the upstream engine and cover-art files. */
export const siteConfig = shelfConfig;
